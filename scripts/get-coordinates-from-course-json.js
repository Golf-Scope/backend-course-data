// `cd scripts && node get-coordinates-from-course-json.js`

const { readdir, readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');

const COURSE_JSON_DIR = './data/course-json-2';

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

  await writeFile(
    '../src/course-hole-coordinates.js',
    `module.exports = ${JSON.stringify(courseHoleCoordinates, null, 2)}`
  );
};

getCoordinatesFromCourseJson()
  .then(() => {
    console.log('DONE!');
  })
  .catch((e) => console.error(e));
