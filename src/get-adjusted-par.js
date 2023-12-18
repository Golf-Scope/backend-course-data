const {
  COURSES,
} = require('./course-constants');

const ADJUSTED_PAR_MODIFIERS = {
  [COURSES.ALPINE]: {
    'front 9': { // par 35
      BASE: 32.8, // -2.2
      GREEN_SPEED: {
        medium: -1,
        fast: 0,
        veryfast: 1.5,
        pro: 3,
      },
      PIN: {
        easy: -0.1,
        medium: 0,
        hard: 0.6,
      },
      TEE: {
        front: -1.5,
        middle: 0,
        back: 1.7,
      },
      WIND: {
        low: 0,
        moderate: 1.5,
        high: 2,
      },
    },
    'back 9': { // par 36
      BASE: 34.2, // -1.8
      GREEN_SPEED: {
        medium: -1,
        fast: 0,
        veryfast: 1.5,
        pro: 3,
      },
      PIN: {
        easy: -0.1,
        medium: 0,
        hard: 0.6,
      },
      TEE: {
        front: -1.5,
        middle: 0,
        back: 1.7,
      },
      WIND: {
        low: 0,
        moderate: 1.5,
        high: 2,
      },
    },
  },
  [COURSES.CASTLE_LINKS]: {
    'front 9': { // par 36
      BASE: 34.8, // -1.2
      GREEN_SPEED: {
        medium: -1.4,
        fast: 0,
        veryfast: 1.6,
        pro: 3.3,
      },
      PIN: {
        easy: -0.6,
        medium: 0,
        hard: 0.1,
      },
      TEE: {
        front: -2.5,
        middle: 0,
        back: 1.3,
      },
      WIND: {
        low: 0,
        moderate: 0.6,
        high: 1.3,
      },
    },
    'back 9': { // par 36
      BASE: 36.6, // +0.6
      GREEN_SPEED: {
        medium: -1.4,
        fast: 0,
        veryfast: 1.6,
        pro: 3.3,
      },
      PIN: {
        easy: -0.6,
        medium: 0,
        hard: 0.1,
      },
      TEE: {
        front: -2.5,
        middle: 0,
        back: 1.3,
      },
      WIND: {
        low: 0,
        moderate: 0.6,
        high: 1.3,
      },
    },
  },
  [COURSES.CLIFFS]: {
    'front 9': { // par 35
      BASE: 34.0, // -1.0
      GREEN_SPEED: {
        medium: -1.2,
        fast: 0,
        veryfast: 1.9,
        pro: 3.9,
      },
      PIN: {
        easy: -0.8,
        medium: 0,
        hard: 1.9,
      },
      TEE: {
        front: -0.8,
        middle: 0,
        back: 1.6,
      },
      WIND: {
        low: 0,
        moderate: 1.8,
        high: 2.4,
      },
    },
    'back 9': { // par 36
      BASE: 33.6, // -2.4
      GREEN_SPEED: {
        medium: -1.2,
        fast: 0,
        veryfast: 1.9,
        pro: 3.9,
      },
      PIN: {
        easy: -0.8,
        medium: 0,
        hard: 1.9,
      },
      TEE: {
        front: -0.8,
        middle: 0,
        back: 1.6,
      },
      WIND: {
        low: 0,
        moderate: 1.8,
        high: 2.4,
      },
    },
  },
  [COURSES.EAST_LAKE]: {
    'front 9': { // par 35
      BASE: 37.5, // +0.5
      GREEN_SPEED: {
        medium: -1.0,
        fast: 0,
        veryfast: 1.6,
        pro: 3.2,
      },
      PIN: {
        easy: -0.1,
        medium: 0,
        hard: 1.0,
      },
      TEE: {
        front: -2.0,
        middle: 0,
        back: 2.4,
      },
      WIND: {
        low: 0,
        moderate: 1.5,
        high: 2.0,
      },
    },
    'back 9': { // par 35
      BASE: 35.4, // +0.4
      GREEN_SPEED: {
        medium: -1.0,
        fast: 0,
        veryfast: 1.6,
        pro: 3.2,
      },
      PIN: {
        easy: -0.1,
        medium: 0,
        hard: 1.0,
      },
      TEE: {
        front: -2.0,
        middle: 0,
        back: 2.4,
      },
      WIND: {
        low: 0,
        moderate: 1.5,
        high: 2.0,
      },
    },
  },
  [COURSES.KAPALUA]: {
    'front 9': { // par 36
      BASE: 35.6, // -0.4
      GREEN_SPEED: {
        medium: -1.0,
        fast: 0,
        veryfast: 1.4,
        pro: 2.7,
      },
      PIN: {
        easy: -0.4,
        medium: 0,
        hard: 0.7,
      },
      TEE: {
        front: -1.7,
        middle: 0,
        back: 1.5,
      },
      WIND: {
        low: 0,
        moderate: 0.5,
        high: 1.6,
      },
    },
    'back 9': { // par 37
      BASE: 35.8, // -1.2
      GREEN_SPEED: {
        medium: -1.0,
        fast: 0,
        veryfast: 1.4,
        pro: 2.7,
      },
      PIN: {
        easy: -0.4,
        medium: 0,
        hard: 0.7,
      },
      TEE: {
        front: -1.7,
        middle: 0,
        back: 1.5,
      },
      WIND: {
        low: 0,
        moderate: 0.5,
        high: 1.6,
      },
    },
  },
  [COURSES.KIAWAH]: {
    'front 9': { // par 36
      BASE: 33.8, // -2.2
      GREEN_SPEED: {
        medium: -1.3,
        fast: 0,
        veryfast: 1.5,
        pro: 3,
      },
      PIN: {
        easy: -0.1,
        medium: 0,
        hard: 1.1,
      },
      TEE: {
        front: -2.5,
        middle: 0,
        back: 2.3,
      },
      WIND: {
        low: 0,
        moderate: 1.2,
        high: 2.5,
      },
    },
    'back 9': { // par 36
      BASE: 36.1, // +0.1
      GREEN_SPEED: {
        medium: -1.3,
        fast: 0,
        veryfast: 1.5,
        pro: 3,
      },
      PIN: {
        easy: -0.1,
        medium: 0,
        hard: 1.1,
      },
      TEE: {
        front: -2.5,
        middle: 0,
        back: 2.3,
      },
      WIND: {
        low: 0,
        moderate: 1.2,
        high: 2.5,
      },
    },
  },
  [COURSES.OLYMPIA_FIELDS]: {
    'front 9': { // par 35
      BASE: 35.0, // +0.0
      GREEN_SPEED: {
        medium: -0.9,
        fast: 0,
        veryfast: 1.7,
        pro: 3.5,
      },
      PIN: {
        easy: -0.2,
        medium: 0,
        hard: 0.2,
      },
      TEE: {
        front: -2.2,
        middle: 0,
        back: 1.6,
      },
      WIND: {
        low: 0,
        moderate: 0.8,
        high: 1.7,
      },
    },
    'back 9': { // par 35
      BASE: 37.2, // +2.2
      GREEN_SPEED: {
        medium: -0.9,
        fast: 0,
        veryfast: 1.7,
        pro: 3.5,
      },
      PIN: {
        easy: -0.2,
        medium: 0,
        hard: 0.2,
      },
      TEE: {
        front: -2.2,
        middle: 0,
        back: 1.6,
      },
      WIND: {
        low: 0,
        moderate: 0.8,
        high: 1.7,
      },
    },
  },
  [COURSES.PEBBLE_BEACH]: {
    'front 9': { // par 36
      BASE: 35.3, // -0.7
      GREEN_SPEED: {
        medium: -0.8,
        fast: 0,
        veryfast: 1.4,
        pro: 2.8,
      },
      PIN: {
        easy: -0.2,
        medium: 0,
        hard: 0.5,
      },
      TEE: {
        front: -2.2,
        middle: 0,
        back: 1.4,
      },
      WIND: {
        low: 0,
        moderate: 0.9,
        high: 2.3,
      },
    },
    'back 9': { // par 36
      BASE: 36.3, // +0.3
      GREEN_SPEED: {
        medium: -0.8,
        fast: 0,
        veryfast: 1.4,
        pro: 2.8,
      },
      PIN: {
        easy: -0.2,
        medium: 0,
        hard: 0.5,
      },
      TEE: {
        front: -2.2,
        middle: 0,
        back: 1.4,
      },
      WIND: {
        low: 0,
        moderate: 0.9,
        high: 2.3,
      },
    },
  },
  [COURSES.PINEHURST_2]: {
    'front 9': { // par 36
      BASE: 36.2, // +0.2
      GREEN_SPEED: {
        medium: -1.1,
        fast: 0,
        veryfast: 1.7,
        pro: 3.5,
      },
      PIN: {
        easy: -0.3,
        medium: 0,
        hard: 0.3,
      },
      TEE: {
        front: -2.8,
        middle: 0,
        back: 1.8,
      },
      WIND: {
        low: 0,
        moderate: 0.8,
        high: 1.5,
      },
    },
    'back 9': { // par 36
      BASE: 35.5, // -0.5
      GREEN_SPEED: {
        medium: -1.1,
        fast: 0,
        veryfast: 1.7,
        pro: 3.5,
      },
      PIN: {
        easy: -0.3,
        medium: 0,
        hard: 0.3,
      },
      TEE: {
        front: -2.8,
        middle: 0,
        back: 1.8,
      },
      WIND: {
        low: 0,
        moderate: 0.8,
        high: 1.5,
      },
    },
  },
  [COURSES.ST_ANDREWS_OLD]: {
    'front 9': { // par 36
      BASE: 35.1, // -0.9
      GREEN_SPEED: {
        medium: -1.0,
        fast: 0,
        veryfast: 1.1,
        pro: 3.0,
      },
      PIN: {
        easy: -0.8,
        medium: 0,
        hard: 0.5,
      },
      TEE: {
        front: -1.5,
        middle: 0,
        back: 1.2,
      },
      WIND: {
        low: 0,
        moderate: 0.6,
        high: 1.4,
      },
    },
    'back 9': { // par 36
      BASE: 34.7, // -1.3
      GREEN_SPEED: {
        medium: -1.0,
        fast: 0,
        veryfast: 1.1,
        pro: 3.0,
      },
      PIN: {
        easy: -0.8,
        medium: 0,
        hard: 0.5,
      },
      TEE: {
        front: -1.5,
        middle: 0,
        back: 1.2,
      },
      WIND: {
        low: 0,
        moderate: 0.6,
        high: 1.4,
      },
    },
  },
  [COURSES.TPC_SAWGRASS]: {
    'front 9': { // par 36
      BASE: 34.7, // -1.3
      GREEN_SPEED: {
        medium: -0.7,
        fast: 0,
        veryfast: 1.4,
        pro: 2.8,
      },
      PIN: {
        easy: -0.9,
        medium: 0,
        hard: 0.3,
      },
      TEE: {
        front: -2.7,
        middle: 0,
        back: 1.9,
      },
      WIND: {
        low: 0,
        moderate: 1.0,
        high: 2.2,
      },
    },
    'back 9': { // par 36
      BASE: 36.7, // +0.7
      GREEN_SPEED: {
        medium: -0.7,
        fast: 0,
        veryfast: 1.4,
        pro: 2.8,
      },
      PIN: {
        easy: -0.9,
        medium: 0,
        hard: 0.3,
      },
      TEE: {
        front: -2.7,
        middle: 0,
        back: 1.9,
      },
      WIND: {
        low: 0,
        moderate: 1.0,
        high: 2.2,
      },
    },
  },
  [COURSES.TPC_SCOTTSDALE]: {
    'front 9': { // par 35
      BASE: 33.6, // -1.4
      GREEN_SPEED: {
        medium: -1.4,
        fast: 0,
        veryfast: 1.3,
        pro: 2.7,
      },
      PIN: {
        easy: -0.5,
        medium: 0,
        hard: 0.1,
      },
      TEE: {
        front: -1.9,
        middle: 0,
        back: 1.7,
      },
      WIND: {
        low: 0,
        moderate: 0.7,
        high: 1.7,
      },
    },
    'back 9': { // par 36
      BASE: 35.0, // -1.0
      GREEN_SPEED: {
        medium: -1.4,
        fast: 0,
        veryfast: 1.3,
        pro: 2.7,
      },
      PIN: {
        easy: -0.5,
        medium: 0,
        hard: 0.1,
      },
      TEE: {
        front: -1.9,
        middle: 0,
        back: 1.7,
      },
      WIND: {
        low: 0,
        moderate: 0.7,
        high: 1.7,
      },
    },
  },
  [COURSES.TPC_SOUTHWIND]: {
    'front 9': { // par 36
      BASE: 34.7, // -1.3
      GREEN_SPEED: {
        medium: -0.7,
        fast: 0,
        veryfast: 1.3,
        pro: 2.8,
      },
      PIN: {
        easy: -0.7,
        medium: 0,
        hard: 0.7,
      },
      TEE: {
        front: -2.5,
        middle: 0,
        back: 1.4,
      },
      WIND: {
        low: 0,
        moderate: 0.8,
        high: 1.5,
      },
    },
    'back 9': { // par 35
      BASE: 36.1, // +1.1
      GREEN_SPEED: {
        medium: -0.7,
        fast: 0,
        veryfast: 1.4,
        pro: 2.8,
      },
      PIN: {
        easy: -0.7,
        medium: 0,
        hard: 0.7,
      },
      TEE: {
        front: -2.5,
        middle: 0,
        back: 1.4,
      },
      WIND: {
        low: 0,
        moderate: 0.8,
        high: 1.5,
      },
    },
  },
  [COURSES.VALHALLA]: {
    'front 9': { // par 36
      BASE: 34.0, // -2.0
      GREEN_SPEED: {
        medium: -0.9,
        fast: 0,
        veryfast: 1.1,
        pro: 2.3,
      },
      PIN: {
        easy: -0.6,
        medium: 0,
        hard: 0.8,
      },
      TEE: {
        front: -2.8,
        middle: 0,
        back: 2.0,
      },
      WIND: {
        low: 0,
        moderate: 1.5,
        high: 2.3,
      },
    },
    'back 9': { // par 36
      BASE: 35.8, // -0.2
      GREEN_SPEED: {
        medium: -0.9,
        fast: 0,
        veryfast: 1.1,
        pro: 2.3,
      },
      PIN: {
        easy: -0.6,
        medium: 0,
        hard: 0.8,
      },
      TEE: {
        front: -2.8,
        middle: 0,
        back: 2.0,
      },
      WIND: {
        low: 0,
        moderate: 1.5,
        high: 2.3,
      },
    },
  },
  [COURSES.WOLF_CREEK]: {
    'front 9': { // par 36
      BASE: 33.6, // -2.4
      GREEN_SPEED: {
        medium: -1.2,
        fast: 0,
        veryfast: 2.5,
        pro: 5.0,
      },
      PIN: {
        easy: -0.5,
        medium: 0,
        hard: 1.0,
      },
      TEE: {
        front: -3.2,
        middle: 0,
        back: 3.6,
      },
      WIND: {
        low: 0,
        moderate: 1.5,
        high: 2.5,
      },
    },
    'back 9': { // par 36
      BASE: 33.1, // -2.9
      GREEN_SPEED: {
        medium: -1.2,
        fast: 0,
        veryfast: 2.5,
        pro: 5.0,
      },
      PIN: {
        easy: -0.5,
        medium: 0,
        hard: 1.0,
      },
      TEE: {
        front: -3.2,
        middle: 0,
        back: 1.6,
      },
      WIND: {
        low: 0,
        moderate: 1.5,
        high: 2.5,
      },
    },
  },
  [COURSES.YALE]: {
    'front 9': { // par 34
      BASE: 33.6, // -0.4
      GREEN_SPEED: {
        medium: -0.9,
        fast: 0,
        veryfast: 1.3,
        pro: 2.7,
      },
      PIN: {
        easy: -0.3,
        medium: 0,
        hard: 1.7,
      },
      TEE: {
        front: -2.1,
        middle: 0,
        back: 1.3,
      },
      WIND: {
        low: 0,
        moderate: 0.6,
        high: 1.0,
      },
    },
    'back 9': { // par 36
      BASE: 34.8, // -1.2
      GREEN_SPEED: {
        medium: -0.9,
        fast: 0,
        veryfast: 1.3,
        pro: 2.7,
      },
      PIN: {
        easy: -0.3,
        medium: 0,
        hard: 1.7,
      },
      TEE: {
        front: -2.1,
        middle: 0,
        back: 1.3,
      },
      WIND: {
        low: 0,
        moderate: 0.6,
        high: 1.0,
      },
    },
  },
};

const getAdjustedPar = ({ course, type, tee, wind, pin, greenSpeed }) => {
  const adjustedParModifiers = ADJUSTED_PAR_MODIFIERS[course][type];

  return (
    Math.round(
      10 *
        (adjustedParModifiers.BASE +
          adjustedParModifiers.TEE[tee] +
          adjustedParModifiers.PIN[pin] +
          adjustedParModifiers.WIND[wind] +
          adjustedParModifiers.GREEN_SPEED[greenSpeed === 'slow' ? 'medium' : greenSpeed])
    ) / 10
  );
};

module.exports = {
  getAdjustedPar,
};
