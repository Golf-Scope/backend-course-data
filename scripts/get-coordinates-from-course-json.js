// `cd scripts && node get-coordinates-from-course-json.js`

const { readdir, readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const { COURSES, COURSE_HOLE_PARS } = require('../src/course-constants');
const { getTotalDistanceForRound } = require('../src');

const COURSE_JSON_DIR = './data/course-json';

const getCoordinatesFromCourseJson = async () => {
  const courseJsonFiles = await readdir(COURSE_JSON_DIR);

  const courseHoleCoordinates = {};

  for (const courseJsonFile of courseJsonFiles) {
    const filePath = resolve(`${COURSE_JSON_DIR}/${courseJsonFile}`);
    const contents = await readFile(filePath, { encoding: 'utf8' });
    const { id: courseId, holes } = JSON.parse(contents);

    courseHoleCoordinates[courseId] = [];

    holes.forEach((h) => {
      courseHoleCoordinates[courseId].push(h);
    });
  }

  const courseDistanceChecksums = [];
  for (const course of Object.values(COURSES)) {
    if (!courseHoleCoordinates[course]) {
      if (course !== COURSES.TOPGOLF) {
        // Valhalla hole coordinates will work fine as a placeholder even for a nine-hole course.
        // We want to be sure that the function to get course distances will not bomb for any unreleased courses that
        // do not yet have json files.
        console.log(
          '\nMissing json for course:',
          course,
          '- using valhalla hole coordinates as a placeholder'
        );
        courseHoleCoordinates[course] = courseHoleCoordinates[COURSES.VALHALLA];
      }
      continue;
    }

    courseDistanceChecksums.push({
      course,
      lengthInYards:
        Math.round(
          100 *
            getTotalDistanceForRound({
              course,
              roundType:
                course === COURSES.BUTLER_PITCH_PUTT ? 'front 9' : '18 holes',
              tee: 'back',
              pin: 'hard',
            }) *
            1.09361
        ) / 100,
    });

    const actualHolePars = COURSE_HOLE_PARS[course];
    const courseJsonHolePars = courseHoleCoordinates[course].map((h) => h.par);
    if (actualHolePars.join('') !== courseJsonHolePars.join('')) {
      console.log(`Hole pars for ${course} do NOT match!!!`);
    }
  }

  await writeFile(
    '../src/course-hole-coordinates.js',
    `module.exports = ${JSON.stringify(courseHoleCoordinates, null, 2)}`
  );

  console.log('\nCourse distances (in yards):\n');
  courseDistanceChecksums.forEach((c) => {
    console.log(`${c.course}: ${c.lengthInYards}`);
  });
};

getCoordinatesFromCourseJson()
  .then(() => {
    console.log('\nDONE!');
  })
  .catch((e) => console.error(e));
