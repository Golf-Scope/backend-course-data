const {
  calculateStrokesGainedForRound,
  calculateStrokesGainedForShot,
  convertLieType,
  calculateEffectiveDistance,
  calculateEffectiveDistanceIndex,
} = require('./calculate-strokes-gained');
const {
  COURSES,
  COURSE_HOLE_PARS,
  COURSE_MODE_PARS,
} = require('./course-constants');
const strokesGainedValues = require('./strokes-gained-values');
const courseHoleDistances = require('./course-hole-distances');

const getHoleDistanceTeeToPin = ({ course, hole, tee, pin }) => {
  if (!['front', 'middle', 'back'].includes(tee)) {
    throw new Error('Tee must be one of front, middle, back');
  }

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

  const holeDistance = courseHoleDistances[course][hole - 1][`${tee}_${pin}`];

  if (!holeDistance) {
    throw new Error(
      `No hole distance found for ${course} hole ${hole} ${tee} ${pin}`
    );
  }

  return holeDistance;
};

module.exports = {
  COURSES,
  COURSE_HOLE_PARS,
  COURSE_MODE_PARS,
  strokesGainedValues,
  convertLieType,
  calculateEffectiveDistance,
  calculateEffectiveDistanceIndex,
  calculateStrokesGainedForRound,
  calculateStrokesGainedForShot,
  getHoleDistanceTeeToPin,
};
