// `cd scripts && node get-hole-distances-from-course-json.js`

const { readdir, readFile, writeFile } = require('node:fs/promises');
const { resolve } = require('node:path');

const COURSE_JSON_DIR = './data/course-json';

const getHoleDistancesFromCourseJson = async () => {
  const courseJsonFiles = await readdir(COURSE_JSON_DIR);

  const courseHoleDistances = {};

  for (const courseJsonFile of courseJsonFiles) {
    const filePath = resolve(`${COURSE_JSON_DIR}/${courseJsonFile}`);
    const contents = await readFile(filePath, { encoding: 'utf8' });
    const { id: courseId, holes } = JSON.parse(contents);

    courseHoleDistances[courseId] = {};

    holes.forEach((hole) => {
      const { hole: holeNumber } = hole;
      courseHoleDistances[courseId][holeNumber] = {};

      // Filter out unrelated keys like "hole" "par" and "description"
      const teePinCombinations = Object.keys(hole).filter((key) => {
        return (
          key.startsWith('front') ||
          key.startsWith('middle') ||
          key.startsWith('back')
        );
      });

      teePinCombinations.forEach((teePin) => {
        const tee = teePin.split('_')[0];
        courseHoleDistances[courseId][holeNumber][tee] =
          courseHoleDistances[courseId][holeNumber][tee] || {};

        const pin = teePin.split('_')[1];
        courseHoleDistances[courseId][holeNumber][tee][pin] = hole[teePin];
      });
    });
  }

  const data = new Uint8Array(
    Buffer.from(`module.exports = ${JSON.stringify(courseHoleDistances)}`)
  );
  await writeFile('../src/course-hole-distances.js', data);
};

getHoleDistancesFromCourseJson()
  .then(() => {
    console.log('DONE!');
  })
  .catch((e) => console.error(e));
