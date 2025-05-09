const {
  calculateStrokesGainedForRound,
  calculateStrokesGainedForShot,
  convertLieType,
  STROKES_GAINED_CATEGORIES,
} = require('./calculate-strokes-gained');
const {
  COURSES,
  COURSE_HOLE_PARS,
  COURSE_MODE_PARS,
} = require('./course-constants');
const COURSE_ELEVATIONS = require('./course-elevations');
const courseHoleCoordinates = require('./course-hole-coordinates');

const getHorizontalDistanceFromCoordinates = (x1, x2, z1, z2) => {
  return Math.round(1000 * Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2)) / 1000;
};

const getTotalDistanceFromCoordinates = (x1, x2, y1, y2, z1, z2) => {
  return (
    Math.round(
      1000 * Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)
    ) / 1000
  );
};

const getTeeCoordinates = ({ course, courseVersion, hole, tee }) => {
  if (!['front', 'middle', 'back'].includes(tee)) {
    throw new Error('Tee must be one of front, middle, back');
  }

  if (
    ![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].includes(
      hole
    )
  ) {
    throw new Error('Hole must be integer between 1 and 18');
  }

  const teeCoordinates =
    courseHoleCoordinates[`v${courseVersion}`][course][hole - 1].teeCoordinates[
      tee
    ];

  if (!teeCoordinates) {
    throw new Error(
      `No tee coordinates found for ${course}, version ${courseVersion}, hole ${hole}, ${tee} tee`
    );
  }

  return teeCoordinates;
};

const getPinCoordinates = ({ course, courseVersion, hole, pin }) => {
  if (!['easy', 'medium', 'hard'].includes(pin)) {
    throw new Error('Pin must be one of easy, medium, hard');
  }

  if (
    ![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].includes(
      hole
    )
  ) {
    throw new Error('Hole must be integer between 1 and 18');
  }

  const pinCoordinates =
    courseHoleCoordinates[`v${courseVersion}`][course][hole - 1].pinCoordinates[
      pin
    ];

  if (!pinCoordinates) {
    throw new Error(
      `No pin coordinates found for ${course}, version ${courseVersion}, hole ${hole}, ${pin} pin`
    );
  }

  return pinCoordinates;
};

const getHoleDistanceTeeToPin = ({ course, courseVersion, hole, tee, pin }) => {
  const teeCoordinates = getTeeCoordinates({
    course,
    courseVersion,
    hole,
    tee,
  });
  const pinCoordinates = getPinCoordinates({
    course,
    courseVersion,
    hole,
    pin,
  });

  const [x1, z1] = [teeCoordinates[0], teeCoordinates[2]];
  const [x2, z2] = [pinCoordinates[0], pinCoordinates[2]];

  return getHorizontalDistanceFromCoordinates(x1, x2, z1, z2);
};

const getTotalDistanceForRound = ({
  course,
  courseVersion,
  roundType,
  tee,
  pin,
}) => {
  if (!['18 holes', 'front 9', 'back 9'].includes(roundType)) {
    throw new Error('Round type must be one of 18 holes, front 9, back 9');
  }

  const FRONT_NINE = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const BACK_NINE = [10, 11, 12, 13, 14, 15, 16, 17, 18];

  const holes =
    roundType === 'front 9'
      ? FRONT_NINE
      : roundType === 'back 9'
        ? BACK_NINE
        : [...FRONT_NINE, ...BACK_NINE];

  let totalDistance = 0;
  for (const h of holes) {
    const holeDistance = getHoleDistanceTeeToPin({
      course,
      courseVersion,
      hole: h,
      tee,
      pin,
    });
    totalDistance += holeDistance;
  }

  return totalDistance;
};

module.exports = {
  COURSES,
  COURSE_HOLE_PARS,
  COURSE_MODE_PARS,
  STROKES_GAINED_CATEGORIES,
  COURSE_ELEVATIONS,
  convertLieType,
  calculateStrokesGainedForRound,
  calculateStrokesGainedForShot,
  getHoleDistanceTeeToPin,
  getTeeCoordinates,
  getHorizontalDistanceFromCoordinates,
  getTotalDistanceFromCoordinates,
  getTotalDistanceForRound,
};
