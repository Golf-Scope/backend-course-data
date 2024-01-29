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
const { getAdjustedPar } = require('./get-adjusted-par');
const strokesGainedValues = require('./strokes-gained-values');

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
  getAdjustedPar,
};
