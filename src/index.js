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

module.exports = {
  COURSES,
  COURSE_HOLE_PARS,
  COURSE_MODE_PARS,
  strokesGainedValues,
  courseHoleDistances,
  convertLieType,
  calculateEffectiveDistance,
  calculateEffectiveDistanceIndex,
  calculateStrokesGainedForRound,
  calculateStrokesGainedForShot,
};
