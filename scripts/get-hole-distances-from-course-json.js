// `cd scripts && node get-hole-distances-from-course-json.js`

const { readdir, readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const courseHoleDistances = require('../src/course-hole-distances');

const COURSE_JSON_DIR = './data/course-json';

const getHoleDistancesFromCourseJson = async () => {
  const courseJsonFiles = await readdir(COURSE_JSON_DIR);

  const courseHoleDistances = {};

  for (const courseJsonFile of courseJsonFiles) {
    const filePath = resolve(`${COURSE_JSON_DIR}/${courseJsonFile}`);
    const contents = await readFile(filePath, { encoding: 'utf8' });
    const { id: courseId, holes } = JSON.parse(contents);

    courseHoleDistances[courseId] = [];

    holes.forEach((h) => {
      delete h.hole;
      delete h.par;
      delete h.description;
      courseHoleDistances[courseId].push(h);
    });
  }

  await writeFile(
    '../src/course-hole-distances.js',
    `module.exports = ${JSON.stringify(courseHoleDistances)}`
  );
};

getHoleDistancesFromCourseJson()
  .then(() => {
    console.log('DONE!');
  })
  .catch((e) => console.error(e));
