const strokesGainedValues = require('./strokes-gained-values');

const METERS_TO_FEET = 3.28084;

const convertLieType = ({ lieType, distanceToHole }) => {
  let effectiveLieType = lieType;

  if (lieType === 'concrete' || lieType === 'wood') {
    effectiveLieType = 'rocks';
  }

  if (lieType === 'red dirt') {
    effectiveLieType = 'sand';
  }

  if (lieType === 'ob') {
    effectiveLieType = 'rough';
  }

  if (
    lieType === 'tee' ||
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

const calculateEffectiveDistanceIndex = ({
  effectiveLieType,
  effectiveDistance,
}) => {
  // If effectiveDistance is zero, then the final strokes gained value we should use
  // is zero. Return -1 for index so it will be undefined and we can use zero as a fallback
  if (effectiveDistance === 0) return -1;

  return effectiveLieType === 'green'
    ? effectiveDistance - 1
    : effectiveDistance / 10 - 1;
};

const calculateStrokesGainedForShot = ({
  startLie,
  startDistance,
  endLie,
  endDistance,
  difficulty,
  greenSpeed,
}) => {
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

  const startEffectiveDistanceIndex = calculateEffectiveDistanceIndex({
    effectiveLieType: startEffectiveLie,
    effectiveDistance: startEffectiveDistance,
  });
  const endEffectiveDistanceIndex = calculateEffectiveDistanceIndex({
    effectiveLieType: endEffectiveLie,
    effectiveDistance: endEffectiveDistance,
  });

  let startExpectedStrokesByDistance =
    strokesGainedValues[difficulty][greenSpeed][startEffectiveLie];
  let endExpectedStrokesByDistance =
    strokesGainedValues[difficulty][greenSpeed][endEffectiveLie];

  if (
    startExpectedStrokesByDistance == null ||
    (endExpectedStrokesByDistance == null && endEffectiveDistance !== 0)
  ) {
    return null;
  }

  const startExpectedStrokes =
    startExpectedStrokesByDistance[startEffectiveDistanceIndex];
  const endExpectedStrokes =
    endEffectiveDistance === 0
      ? 0
      : endExpectedStrokesByDistance[endEffectiveDistanceIndex];

  if (startExpectedStrokes == null || endExpectedStrokes == null) {
    return null;
  } else {
    // Because we only have one shot to look at, we won't be able to detect
    // where someone hit their next shot from if they hit this shot out of bounds
    // or in the water. Normally we would calculate strokes gained off of their
    // new shot location, but we can't do that here.
    return (
      Math.round(1000 * (startExpectedStrokes - endExpectedStrokes - 1)) / 1000
    );
  }
};

const calculateStrokesGainedForRound = ({
  roundJson,
  roundType,
  version,
  roundId,
  greenSpeedOverride,
}) => {
  const settingStrokesGainedValues =
    strokesGainedValues[roundJson.difficulty][
      greenSpeedOverride
        ? greenSpeedOverride
        : roundJson.greenSpeeds === 'slow'
          ? 'medium'
          : roundJson.greenSpeeds
    ];

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

      const startEffectiveDistanceIndex = calculateEffectiveDistanceIndex({
        effectiveLieType: startEffectiveLie,
        effectiveDistance: startEffectiveDistance,
      });
      const endEffectiveDistanceIndex = calculateEffectiveDistanceIndex({
        effectiveLieType: endEffectiveLie,
        effectiveDistance: endEffectiveDistance,
      });

      let startExpectedStrokesByDistance =
        settingStrokesGainedValues[startEffectiveLie];
      let endExpectedStrokesByDistance =
        settingStrokesGainedValues[endEffectiveLie];

      if (startExpectedStrokesByDistance == null) {
        // If greenSpeedOverride is present, then we are just trying to find the best shot
        // We don't need to trigger bad lie type saves again
        if (startEffectiveLie != null && greenSpeedOverride == null) {
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
        startExpectedStrokesByDistance = [];
      }

      if (endExpectedStrokesByDistance == null) {
        // If greenSpeedOverride is present, then we are just trying to find the best shot
        // We don't need to trigger bad lie type saves again
        if (endEffectiveLie != null && greenSpeedOverride == null) {
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
        endExpectedStrokesByDistance = [];
      }

      const startExpectedStrokes =
        startExpectedStrokesByDistance[startEffectiveDistanceIndex];
      const endExpectedStrokes =
        endEffectiveDistance === 0
          ? 0
          : endExpectedStrokesByDistance[endEffectiveDistanceIndex];

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
            category: 'off the tee',
            ...strokesGainedMetadata,
          });
        } else {
          strokesGainedApproachTheGreen += strokesGained;
          strokesGainedByShot[holeIndex].push({
            category: 'approach the green',
            ...strokesGainedMetadata,
          });
        }
      } else if (startEffectiveLie === 'green') {
        strokesGainedPutting += strokesGained;
        strokesGainedByShot[holeIndex].push({
          category: 'putting',
          ...strokesGainedMetadata,
        });
      } else if (startDistance <= 45.7) {
        // Inside 50 yards
        strokesGainedAroundTheGreen += strokesGained;
        strokesGainedByShot[holeIndex].push({
          category: 'around the green',
          ...strokesGainedMetadata,
        });
      } else {
        strokesGainedApproachTheGreen += strokesGained;
        strokesGainedByShot[holeIndex].push({
          category: 'approach the green',
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
  calculateEffectiveDistanceIndex,
  calculateStrokesGainedForRound,
  calculateStrokesGainedForShot,
  convertLieType,
};
