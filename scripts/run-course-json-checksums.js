const { readdir, readFile } = require('node:fs/promises');
const { resolve } = require('node:path');
const { COURSE_HOLE_PARS } = require('../src/course-constants');
const { getTotalDistanceForRound } = require('../src');

const COURSE_JSON_DIR = './data/course-json';
const VERSIONS = [1, 2];

const runCourseJsonChecksums = async () => {
  console.log('\nCourse distances (in yards):\n');

  for (const version of VERSIONS) {
    const courseJsonFiles = await readdir(`${COURSE_JSON_DIR}/v${version}`);

    for (const courseJsonFile of courseJsonFiles) {
      const filePath = resolve(
        `${COURSE_JSON_DIR}/v${version}/${courseJsonFile}`
      );
      const contents = await readFile(filePath, { encoding: 'utf8' });
      const { id: course, holes } = JSON.parse(contents);

      const lengthInYards =
        Math.round(
          100 *
            getTotalDistanceForRound({
              course,
              courseVersion: version,
              roundType:
                COURSE_HOLE_PARS[course].length === 9 ? 'front 9' : '18 holes',
              tee: 'back',
              pin: 'hard',
            }) *
            1.09361
        ) / 100;

      console.log(`${course} v${version}: ${lengthInYards}`);

      const actualHolePars = COURSE_HOLE_PARS[course];
      const courseJsonHolePars = holes.map((h) => h.par);
      if (actualHolePars.join('') !== courseJsonHolePars.join('')) {
        console.log(`Hole pars for ${course} v${version} do NOT match!!!`);
      }
    }
  }
};

runCourseJsonChecksums()
  .then(() => {
    console.log('\nDONE!');
  })
  .catch((e) => console.error(e));
