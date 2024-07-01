const deepRoughExpectedStrokes = require('./data/strokes-gained/deep-rough');
const fairwayExpectedStrokes = require('./data/strokes-gained/fairway');
const greenExpectedStrokes = require('./data/strokes-gained/green');
const longGrassExpectedStrokes = require('./data/strokes-gained/long-grass');
const pinestrawExpectedStrokes = require('./data/strokes-gained/pinestraw');
const rocksExpectedStrokes = require('./data/strokes-gained/rocks');
const roughExpectedStrokes = require('./data/strokes-gained/rough');
const sandExpectedStrokes = require('./data/strokes-gained/sand');
const wasteExpectedStrokes = require('./data/strokes-gained/waste');

const METERS_TO_FEET = 3.28084;

const STROKES_GAINED_CATEGORIES = {
  OFF_THE_TEE: 'off the tee',
  APPROACH_THE_GREEN: 'approach the green',
  AROUND_THE_GREEN: 'around the green',
  PUTTING: 'putting',
};

const KNOWN_STROKES_GAINED_LIE_TYPES = [
  'deep rough',
  'fairway',
  'first cut',
  'green',
  'long grass',
  'pinestraw',
  'rocks',
  'rough',
  'sand',
  'waste',
];

const LIE_TYPES_TO_EXPECTED_STROKES = {
  'deep rough': deepRoughExpectedStrokes,
  fairway: fairwayExpectedStrokes,
  green: greenExpectedStrokes,
  'long grass': longGrassExpectedStrokes,
  pinestraw: pinestrawExpectedStrokes,
  rocks: rocksExpectedStrokes,
  rough: roughExpectedStrokes,
  sand: sandExpectedStrokes,
  waste: wasteExpectedStrokes,
};

const _getExpectedStrokes = ({ difficulty, greenSpeed, lieType, distance }) => {
  const expectedStrokesPoints =
    LIE_TYPES_TO_EXPECTED_STROKES[lieType][`${difficulty}-${greenSpeed}`];
  const [lowDistance, lowExpectedStrokes] = expectedStrokesPoints.find(
    ([pointDistance]) => pointDistance <= distance
  );
  const [highDistance, highExpectedStrokes] = expectedStrokesPoints.find(
    ([pointDistance]) => distance < pointDistance
  );
  const slope =
    (highExpectedStrokes - lowExpectedStrokes) / (highDistance - lowDistance);
  return lowExpectedStrokes + slope * (distance - lowDistance);
};

const getExpectedStrokes = ({ difficulty, greenSpeed, lieType, distance }) => {
  if (
    !KNOWN_STROKES_GAINED_LIE_TYPES.includes(lieType) ||
    distance < 0 ||
    distance >= 600
  ) {
    return null;
  }

  if (lieType === 'first cut') {
    // Treat first cut just like rough up until 70 yards and then like 2/3rds rough, 1/3rd fairway
    if (distance < 70) {
      return _getExpectedStrokes({
        difficulty,
        greenSpeed,
        lieType: 'rough',
        distance,
      });
    } else {
      return (
        (2 / 3) *
          _getExpectedStrokes({
            difficulty,
            greenSpeed,
            lieType: 'rough',
            distance,
          }) +
        (1 / 3) *
          _getExpectedStrokes({
            difficulty,
            greenSpeed,
            lieType: 'fairway',
            distance,
          })
      );
    }
  } else {
    return _getExpectedStrokes({ difficulty, greenSpeed, lieType, distance });
  }
};

const convertLieType = ({ lieType, distanceToHole }) => {
  let effectiveLieType = lieType;

  if (
    lieType === 'concrete' ||
    lieType === 'wood' ||
    lieType === 'bridge' ||
    lieType === 'ob'
  ) {
    effectiveLieType = 'rough';
  }

  if (lieType === 'red dirt') {
    effectiveLieType = 'sand';
  }

  if (
    lieType === '' ||
    lieType === 'tee' ||
    lieType === 'collar' ||
    lieType === 'fringe' ||
    lieType === 'fairway (1)' ||
    lieType === 'fairway (2)' ||
    (lieType === 'green' && distanceToHole * METERS_TO_FEET > 99)
  ) {
    effectiveLieType = 'fairway';
  }

  return effectiveLieType;
};

const calculateEffectiveDistance = ({ effectiveLieType, distanceToHole }) => {
  if (!effectiveLieType) {
    return 0;
  }

  return effectiveLieType === 'green'
    ? Math.ceil(distanceToHole * METERS_TO_FEET)
    : 10 * Math.ceil(distanceToHole / 10);
};

const calculateStrokesGainedForShot = ({
  startLie,
  startDistance,
  endLie,
  endDistance,
  difficulty,
  greenSpeed,
}) => {
  // Slow is old, and there is not much medium data, so just treat both as fast for strokes gained
  const effectiveGreenSpeed = ['slow', 'medium'].includes(greenSpeed)
    ? 'fast'
    : greenSpeed;
  const startEffectiveLie = convertLieType({
    lieType: startLie,
    distanceToHole: startDistance,
  });
  const endEffectiveLie = convertLieType({
    lieType: endLie,
    distanceToHole: endDistance,
  });

  const startEffectiveDistance = calculateEffectiveDistance({
    effectiveLieType: startEffectiveLie,
    distanceToHole: startDistance,
  });
  const endEffectiveDistance = calculateEffectiveDistance({
    effectiveLieType: endEffectiveLie,
    distanceToHole: endDistance,
  });

  const startExpectedStrokes = getExpectedStrokes({
    difficulty,
    greenSpeed: effectiveGreenSpeed,
    lieType: startEffectiveLie,
    distance: startEffectiveDistance,
  });
  const endExpectedStrokes =
    endEffectiveDistance === 0
      ? 0
      : getExpectedStrokes({
          difficulty,
          greenSpeed: effectiveGreenSpeed,
          lieType: endEffectiveLie,
          distance: endEffectiveDistance,
        });

  if (startExpectedStrokes == null || endExpectedStrokes == null) {
    return null;
  }

  // Because we only have one shot to look at, we won't be able to detect
  // where someone hit their next shot from if they hit this shot out of bounds
  // or in the water. Normally we would calculate strokes gained off of their
  // new shot location, but we can't do that here.
  return (
    Math.round(1000 * (startExpectedStrokes - endExpectedStrokes - 1)) / 1000
  );
};

const calculateStrokesGainedForRound = ({
  roundJson,
  roundType,
  version,
  roundId,
  greenSpeedOverride,
}) => {
  const roundJsonGreenSpeed = roundJson.greenSpeeds;
  // Slow is old, and there is not much medium data, so just treat both as fast for strokes gained
  const greenSpeed = greenSpeedOverride
    ? greenSpeedOverride
    : ['slow', 'medium'].includes(roundJsonGreenSpeed)
      ? 'fast'
      : roundJsonGreenSpeed;
  const difficulty = roundJson.difficulty;

  const holes = roundJson.holes;

  const strokesGainedByShot = holes
    .map(() => [])
    .slice(0, roundType === '18 holes' ? 18 : 9);

  let strokesGainedOffTheTee = 0;
  let strokesGainedApproachTheGreen = 0;
  let strokesGainedAroundTheGreen = 0;
  let strokesGainedPutting = 0;

  const badLies = [];

  for (
    let holeIndex = 0;
    holeIndex < (roundType === '18 holes' ? 18 : 9);
    holeIndex++
  ) {
    const hole = holes[holeIndex];
    for (let shotIndex = 0; shotIndex < hole.shots.length; shotIndex++) {
      const {
        startLie,
        startDistance,
        startPosition,
        stroke,
        distance,
        club,
        inHole,
      } = hole.shots[shotIndex];

      // Use the start lie of the next shot, since the end lie of the current shot
      // may not be where the next shot is taken from if there is a drop or penalty.
      let {
        startLie: endLie,
        startDistance: endDistance,
        startPosition: endPosition,
      } = hole.shots[shotIndex + 1] || {};

      // For auto pickups, we should use the end lie/distance/position for this final shot,
      // not the start lie of the next shot which doesn't exist
      if (shotIndex === hole.shots.length - 1 && !inHole) {
        endLie = hole.shots[shotIndex].endLie;
        endDistance = hole.shots[shotIndex].endDistance;
        endPosition = hole.shots[shotIndex].endPosition;
      }

      const startEffectiveLie = convertLieType({
        lieType: startLie,
        distanceToHole: startDistance,
      });
      const endEffectiveLie = convertLieType({
        lieType: endLie,
        distanceToHole: endDistance,
      });

      const startEffectiveDistance = calculateEffectiveDistance({
        effectiveLieType: startEffectiveLie,
        distanceToHole: startDistance,
      });
      const endEffectiveDistance = calculateEffectiveDistance({
        effectiveLieType: endEffectiveLie,
        distanceToHole: endDistance,
      });

      const startExpectedStrokes = getExpectedStrokes({
        difficulty,
        greenSpeed,
        lieType: startEffectiveLie,
        distance: startEffectiveDistance,
      });
      const endExpectedStrokes =
        endEffectiveDistance === 0
          ? 0
          : getExpectedStrokes({
              difficulty,
              greenSpeed,
              lieType: endEffectiveLie,
              distance: endEffectiveDistance,
            });

      // If greenSpeedOverride is present, then we are just trying to find the best shot for top shots purposes
      // We don't need to trigger bad lie type saves again
      if (
        startEffectiveLie != null &&
        !KNOWN_STROKES_GAINED_LIE_TYPES.includes(startEffectiveLie) &&
        greenSpeedOverride == null
      ) {
        badLies.push({
          course: roundJson.course,
          hole_number: hole.hole,
          stroke_number: stroke,
          lie_type: startEffectiveLie,
          start_or_end: 'start',
          coordinates: startPosition,
          round_id: roundId,
          game_version: version,
          timestamp: new Date(),
        });
      }
      if (
        endEffectiveLie != null &&
        !KNOWN_STROKES_GAINED_LIE_TYPES.includes(endEffectiveLie) &&
        greenSpeedOverride == null
      ) {
        badLies.push({
          course: roundJson.course,
          hole_number: hole.hole,
          stroke_number: stroke,
          lie_type: endEffectiveLie,
          start_or_end: 'end',
          coordinates: endPosition,
          round_id: roundId,
          game_version: version,
          timestamp: new Date(),
        });
      }

      if (startExpectedStrokes == null || endExpectedStrokes == null) {
        strokesGainedByShot[holeIndex].push({
          category: 'n/a',
          startLie,
          endLie,
          startDistance,
          endDistance,
          distance,
          startExpectedStrokes,
          endExpectedStrokes,
          stroke,
          club,
          hole: holeIndex + (roundType === 'back 9' ? 10 : 1),
        });
        continue;
      }

      const startStrokes = stroke;
      const nextShotStrokes =
        shotIndex < hole.shots.length - 1
          ? hole.shots[shotIndex + 1].stroke
          : stroke + 1;

      const includesPenaltyStroke = nextShotStrokes > startStrokes + 1;

      const strokesGained =
        Math.round(
          1000 *
            (startExpectedStrokes -
              endExpectedStrokes -
              (nextShotStrokes - startStrokes))
        ) / 1000;

      const strokesGainedMetadata = {
        startLie,
        endLie,
        startDistance,
        endDistance,
        distance,
        stroke,
        strokesGained,
        startExpectedStrokes,
        endExpectedStrokes,
        club,
        includesPenaltyStroke,
        hole: holeIndex + (roundType === 'back 9' ? 10 : 1),
      };

      if (stroke === 1) {
        if (hole.par === 4 || hole.par === 5) {
          strokesGainedOffTheTee += strokesGained;
          strokesGainedByShot[holeIndex].push({
            category: STROKES_GAINED_CATEGORIES.OFF_THE_TEE,
            ...strokesGainedMetadata,
          });
        } else {
          strokesGainedApproachTheGreen += strokesGained;
          strokesGainedByShot[holeIndex].push({
            category: STROKES_GAINED_CATEGORIES.APPROACH_THE_GREEN,
            ...strokesGainedMetadata,
          });
        }
      } else if (startEffectiveLie === 'green') {
        strokesGainedPutting += strokesGained;
        strokesGainedByShot[holeIndex].push({
          category: STROKES_GAINED_CATEGORIES.PUTTING,
          ...strokesGainedMetadata,
        });
      } else if (startDistance <= 45.7) {
        // Inside 50 yards
        strokesGainedAroundTheGreen += strokesGained;
        strokesGainedByShot[holeIndex].push({
          category: STROKES_GAINED_CATEGORIES.AROUND_THE_GREEN,
          ...strokesGainedMetadata,
        });
      } else {
        strokesGainedApproachTheGreen += strokesGained;
        strokesGainedByShot[holeIndex].push({
          category: STROKES_GAINED_CATEGORIES.APPROACH_THE_GREEN,
          ...strokesGainedMetadata,
        });
      }
    }
  }

  return {
    strokesGainedByShot,
    strokesGainedOffTheTee: Math.round(strokesGainedOffTheTee * 1000) / 1000,
    strokesGainedApproachTheGreen:
      Math.round(strokesGainedApproachTheGreen * 1000) / 1000,
    strokesGainedAroundTheGreen:
      Math.round(strokesGainedAroundTheGreen * 1000) / 1000,
    strokesGainedPutting: Math.round(strokesGainedPutting * 1000) / 1000,
    strokesGained:
      Math.round(
        (strokesGainedOffTheTee +
          strokesGainedApproachTheGreen +
          strokesGainedAroundTheGreen +
          strokesGainedPutting) *
          1000
      ) / 1000,
    badLies,
  };
};

module.exports = {
  calculateEffectiveDistance,
  calculateStrokesGainedForRound,
  calculateStrokesGainedForShot,
  convertLieType,
  STROKES_GAINED_CATEGORIES,
};
