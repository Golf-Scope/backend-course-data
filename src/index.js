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

  return courseHoleDistances[course][hole - 1][`${tee}_${pin}`];
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
