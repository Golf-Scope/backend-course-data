// `pushd scripts && node get-coordinates-from-course-json.js && node run-course-json-checksums.js && popd`

const { readdir, readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const { COURSES, COURSE_HOLE_PARS } = require('../src/course-constants');

const COURSE_JSON_DIR = './data/course-json';
const VERSIONS = [1, 2];

const getCoordinatesFromCourseJson = async () => {
  const courseHoleCoordinates = {};
  const courseElevations = {};

  for (const version of VERSIONS) {
    courseHoleCoordinates[`v${version}`] = {};
    courseElevations[`v${version}`] = {};

    const courseJsonFiles = await readdir(`${COURSE_JSON_DIR}/v${version}`);

    for (const courseJsonFile of courseJsonFiles) {
      const filePath = resolve(
        `${COURSE_JSON_DIR}/v${version}/${courseJsonFile}`
      );
      const contents = await readFile(filePath, { encoding: 'utf8' });
      const { id: courseId, holes, elevation } = JSON.parse(contents);

      courseHoleCoordinates[`v${version}`][courseId] = [];
      courseElevations[`v${version}`][courseId] = elevation;

      for (const h of holes) {
        courseHoleCoordinates[`v${version}`][courseId].push(h);
      }
    }
  }

  for (const course of Object.values(COURSES)) {
    if (courseHoleCoordinates.v1[course] || course === COURSES.TOPGOLF) {
      continue;
    }

    // Valhalla hole coordinates will work fine as a placeholder even for a nine-hole course.
    // We want to be sure that the function to get course distances will not bomb for any unreleased courses that
    // do not yet have json files.
    console.log(
      '\nMissing json for course:',
      course,
      '- using valhalla hole coordinates as a placeholder'
    );
    courseHoleCoordinates.v1[course] = courseHoleCoordinates.v2[
      COURSES.VALHALLA
    ].slice(0, COURSE_HOLE_PARS[course].length);
    courseElevations.v1[course] = 0;
  }

  await writeFile(
    '../src/course-hole-coordinates.js',
    `module.exports = ${JSON.stringify(courseHoleCoordinates, null, 2)}`
  );

  await writeFile(
    '../src/course-elevations.js',
    `module.exports = ${JSON.stringify(courseElevations, null, 2)}`
  );
};

getCoordinatesFromCourseJson()
  .then(() => {
    console.log('\nDONE!');
  })
  .catch((e) => console.error(e));
