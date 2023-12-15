const COURSES = {
  ALPINE: 'alpine',
  CASTLE_LINKS: 'castle links',
  EAST_LAKE: 'eastlake',
  CLIFFS: 'cliffs',
  KAPALUA: 'kapalua',
  KIAWAH: 'kiawah',
  OLYMPIA_FIELDS: 'olympiafields',
  PEBBLE_BEACH: 'pebblebeach',
  PINEHURST_2: 'pinehurst2',
  ST_ANDREWS_OLD: 'standrewsold',
  TPC_SAWGRASS: 'tpcsawgrass',
  TPC_SCOTTSDALE: 'tpcscottsdale',
  TPC_SOUTHWIND: 'tpcsouthwind',
  VALHALLA: 'valhalla',
  WOLF_CREEK: 'wolf creek',
  YALE: 'yale',
  TOPGOLF: 'topgolf',
};

const COURSE_DISPLAY_NAMES = {
  [COURSES.ALPINE]: 'Alpine',
  [COURSES.CASTLE_LINKS]: 'Castle Links',
  [COURSES.CLIFFS]: 'Cliffs',
  [COURSES.EAST_LAKE]: 'East Lake',
  [COURSES.KAPALUA]: 'Kapalua',
  [COURSES.KIAWAH]: 'Kiawah',
  [COURSES.OLYMPIA_FIELDS]: 'Olympia Fields',
  [COURSES.PEBBLE_BEACH]: 'Pebble Beach',
  [COURSES.PINEHURST_2]: 'Pinehurst No. 2',
  [COURSES.ST_ANDREWS_OLD]: 'St Andrews',
  [COURSES.TPC_SAWGRASS]: 'TPC Sawgrass',
  [COURSES.TPC_SCOTTSDALE]: 'TPC Scottsdale',
  [COURSES.TPC_SOUTHWIND]: 'TPC Southwind',
  [COURSES.VALHALLA]: 'Valhalla',
  [COURSES.WOLF_CREEK]: 'Wolf Creek',
  [COURSES.YALE]: 'Yale',
  [COURSES.TOPGOLF]: 'Topgolf',
};

const COURSE_HOLE_PARS = {
  [COURSES.ALPINE]: [4, 3, 4, 5, 3, 4, 4, 4, 4, 5, 4, 3, 4, 3, 4, 5, 4, 4],
  [COURSES.CASTLE_LINKS]: [
    4, 5, 3, 4, 4, 4, 3, 4, 5, 4, 4, 5, 4, 3, 4, 4, 3, 5,
  ],
  [COURSES.CLIFFS]: [4, 5, 4, 3, 4, 4, 4, 3, 4, 4, 4, 4, 3, 5, 3, 4, 5, 4],
  [COURSES.EAST_LAKE]: [4, 3, 4, 4, 4, 5, 4, 4, 3, 4, 3, 4, 4, 4, 3, 4, 4, 5],
  [COURSES.KAPALUA]: [4, 3, 4, 4, 5, 4, 4, 3, 5, 4, 3, 4, 4, 4, 5, 4, 4, 5],
  [COURSES.KIAWAH]: [4, 5, 4, 4, 3, 4, 5, 3, 4, 4, 5, 4, 4, 3, 4, 5, 3, 4],
  [COURSES.OLYMPIA_FIELDS]: [
    5, 4, 4, 4, 4, 3, 4, 3, 4, 4, 4, 4, 3, 4, 5, 3, 4, 4,
  ],
  [COURSES.PEBBLE_BEACH]: [
    4, 5, 4, 4, 3, 5, 3, 4, 4, 4, 4, 3, 4, 5, 4, 4, 3, 5,
  ],
  [COURSES.PINEHURST_2]: [4, 4, 4, 4, 5, 3, 4, 5, 3, 5, 4, 4, 4, 4, 3, 5, 3, 4],
  [COURSES.ST_ANDREWS_OLD]: [
    4, 4, 4, 4, 5, 4, 4, 3, 4, 4, 3, 4, 4, 5, 4, 4, 4, 4,
  ],
  [COURSES.TPC_SAWGRASS]: [
    4, 5, 3, 4, 4, 4, 4, 3, 5, 4, 5, 4, 3, 4, 4, 5, 3, 4,
  ],
  [COURSES.TPC_SCOTTSDALE]: [
    4, 4, 5, 3, 4, 4, 3, 4, 4, 4, 4, 3, 5, 4, 5, 3, 4, 4,
  ],
  [COURSES.TPC_SOUTHWIND]: [
    4, 4, 5, 3, 5, 4, 4, 3, 4, 4, 3, 4, 4, 3, 4, 5, 4, 4,
  ],
  [COURSES.VALHALLA]: [4, 5, 3, 4, 4, 4, 5, 3, 4, 5, 3, 4, 4, 3, 4, 4, 4, 5],
  [COURSES.WOLF_CREEK]: [5, 4, 3, 4, 5, 4, 4, 3, 4, 4, 3, 5, 4, 4, 3, 4, 5, 4],
  [COURSES.YALE]: [4, 4, 4, 4, 3, 4, 4, 4, 3, 4, 4, 4, 3, 4, 3, 5, 4, 5],
};

const COURSE_MODE_PARS = {};

for (const [course, holePars] of Object.entries(COURSE_HOLE_PARS)) {
  COURSE_MODE_PARS[course] = {
    '18 holes': holePars.reduce((a, b) => a + b),
    'front 9': holePars.slice(0, 9).reduce((a, b) => a + b),
    'back 9': holePars.slice(9, 18).reduce((a, b) => a + b),
  };
}

const COURSE_HOLE_HANDICAPS = {
  [COURSES.ALPINE]: [
    5, 15, 13, 1, 3, 7, 9, 11, 17, 6, 18, 14, 8, 16, 12, 10, 4, 2,
  ],
  [COURSES.CASTLE_LINKS]: [
    5, 3, 7, 1, 17, 11, 15, 13, 9, 18, 4, 16, 14, 12, 10, 8, 6, 2,
  ],
  [COURSES.CLIFFS]: [
    13, 3, 5, 7, 1, 17, 11, 15, 9, 16, 2, 4, 12, 14, 18, 10, 8, 6,
  ],
  [COURSES.EAST_LAKE]: [
    5, 15, 11, 17, 3, 9, 7, 1, 13, 4, 18, 10, 6, 14, 2, 8, 12, 16,
  ],
  [COURSES.KAPALUA]: [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 2, 4, 6, 8, 10, 12, 14, 16, 18,
  ],
  [COURSES.KIAWAH]: [
    9, 1, 13, 3, 17, 7, 11, 15, 5, 2, 10, 4, 6, 14, 16, 8, 18, 12,
  ],
  [COURSES.OLYMPIA_FIELDS]: [
    6, 10, 2, 4, 14, 18, 12, 16, 8, 11, 3, 13, 17, 15, 1, 9, 5, 7,
  ],
  [COURSES.PEBBLE_BEACH]: [
    4, 6, 12, 16, 2, 18, 10, 8, 14, 15, 3, 11, 7, 5, 9, 13, 17, 1,
  ],
  [COURSES.PINEHURST_2]: [
    5, 1, 9, 15, 3, 13, 7, 11, 17, 2, 8, 4, 6, 12, 18, 10, 16, 14,
  ],
  [COURSES.ST_ANDREWS_OLD]: [
    6, 12, 10, 8, 2, 16, 14, 18, 4, 15, 17, 11, 13, 7, 9, 1, 3, 5,
  ],
  [COURSES.TPC_SAWGRASS]: [
    4, 8, 10, 6, 14, 12, 2, 16, 18, 15, 5, 11, 17, 7, 3, 13, 1, 9,
  ],
  [COURSES.TPC_SCOTTSDALE]: [
    6, 4, 2, 10, 12, 14, 16, 18, 8, 13, 3, 9, 11, 15, 1, 17, 5, 7,
  ],
  [COURSES.TPC_SOUTHWIND]: [
    4, 8, 2, 16, 10, 6, 18, 14, 12, 9, 1, 5, 7, 15, 13, 11, 3, 17,
  ],
  [COURSES.VALHALLA]: [
    7, 1, 13, 11, 17, 5, 3, 15, 9, 14, 8, 6, 2, 18, 4, 16, 12, 10,
  ],
  [COURSES.WOLF_CREEK]: [
    3, 11, 9, 15, 5, 13, 1, 7, 17, 8, 18, 2, 14, 16, 6, 12, 4, 10,
  ],
  [COURSES.YALE]: [
    1, 3, 9, 13, 7, 11, 17, 15, 5, 2, 16, 8, 18, 14, 12, 4, 6, 10,
  ],
};

const PURCHASABLE_COURSES_TO_OCULUS_SKU = new Map([
  [COURSES.EAST_LAKE, 'eastlake'],
  [COURSES.KAPALUA, 'kapalua'],
  [COURSES.KIAWAH, 'kiawah'],
  [COURSES.OLYMPIA_FIELDS, 'olympiafields'],
  [COURSES.PEBBLE_BEACH, 'pebblebeach'],
  [COURSES.PINEHURST_2, 'pinehurst2'],
  [COURSES.ST_ANDREWS_OLD, 'standrewsold'],
  [COURSES.TPC_SAWGRASS, 'tpcsawgrass'],
  [COURSES.TPC_SCOTTSDALE, 'tpcscottsdale'],
  [COURSES.TPC_SOUTHWIND, 'tpcsouthwind'],
  [COURSES.VALHALLA, 'valhalla'],
  [COURSES.YALE, 'yale'],
  [COURSES.WOLF_CREEK, 'wolfcreek'],
]);

const OCULUS_SKU_TO_PURCHASABLE_COURSES = new Map(
  Array.from(PURCHASABLE_COURSES_TO_OCULUS_SKU, (a) => a.reverse())
);

const FREE_COURSES = Object.values(COURSES).filter(
  (c) => !PURCHASABLE_COURSES_TO_OCULUS_SKU.has(c)
);

const COURSE_MULTIPLAYER_MIN_VERSIONS = new Map([
  [COURSES.ALPINE, 693],
  [COURSES.CASTLE_LINKS, 709],
  [COURSES.CLIFFS, 601],
  [COURSES.EAST_LAKE, 739],
  [COURSES.KAPALUA, 745],
  [COURSES.KIAWAH, 705],
  [COURSES.OLYMPIA_FIELDS, 738],
  [COURSES.PEBBLE_BEACH, 723],
  [COURSES.PINEHURST_2, 716],
  [COURSES.ST_ANDREWS_OLD, 742],
  [COURSES.TPC_SAWGRASS, 730],
  [COURSES.TPC_SCOTTSDALE, 727],
  [COURSES.TPC_SOUTHWIND, 737],
  [COURSES.VALHALLA, 640],
  [COURSES.WOLF_CREEK, 601],
  [COURSES.YALE, 734],
  [COURSES.TOPGOLF, 745],
]);

const COURSE_SAVE_REPLAY_DATA_MIN_VERSIONS = new Map([
  [COURSES.ALPINE, 731],
  [COURSES.CASTLE_LINKS, 731],
  [COURSES.CLIFFS, 731],
  [COURSES.EAST_LAKE, 739.0],
  [COURSES.KAPALUA, 745.08],
  [COURSES.KIAWAH, 731],
  [COURSES.OLYMPIA_FIELDS, 738.4],
  [COURSES.PEBBLE_BEACH, 731],
  [COURSES.PINEHURST_2, 731],
  [COURSES.ST_ANDREWS_OLD, 743],
  [COURSES.TPC_SAWGRASS, 731],
  [COURSES.TPC_SCOTTSDALE, 731],
  [COURSES.TPC_SOUTHWIND, 737.06],
  [COURSES.VALHALLA, 731],
  [COURSES.WOLF_CREEK, 731],
  [COURSES.YALE, 734.04],
]);

const BATTLE_BOT_ENABLED_COURSES = [
  COURSES.ALPINE,
  COURSES.CASTLE_LINKS,
  COURSES.CLIFFS,
  COURSES.EAST_LAKE,
  COURSES.KIAWAH,
  COURSES.OLYMPIA_FIELDS,
  COURSES.PEBBLE_BEACH,
  COURSES.PINEHURST_2,
  COURSES.ST_ANDREWS_OLD,
  COURSES.TPC_SAWGRASS,
  COURSES.TPC_SCOTTSDALE,
  COURSES.TPC_SOUTHWIND,
  COURSES.VALHALLA,
  COURSES.WOLF_CREEK,
  COURSES.YALE,
];

const BATTLE_MULTIPLE_BOT_ENABLED_COURSES = [
  COURSES.ALPINE,
  COURSES.CLIFFS,
  COURSES.PEBBLE_BEACH,
  COURSES.TPC_SAWGRASS,
  COURSES.VALHALLA,
];

const COURSES_WITH_REVENUE_SHARES = [
  COURSES.PEBBLE_BEACH,
  COURSES.KIAWAH,
  COURSES.YALE,
  COURSES.ST_ANDREWS_OLD,
];

const COURSES_WITH_ROUND_COMPLETE_REVENUE_SHARES = [
  COURSES.PEBBLE_BEACH,
  COURSES.KIAWAH,
];

const TOURNAMENT_COURSES = [
  COURSES.ALPINE,
  COURSES.CASTLE_LINKS,
  COURSES.CLIFFS,
  COURSES.EAST_LAKE,
  COURSES.KIAWAH,
  COURSES.OLYMPIA_FIELDS,
  COURSES.PEBBLE_BEACH,
  COURSES.PINEHURST_2,
  COURSES.ST_ANDREWS_OLD,
  COURSES.TPC_SAWGRASS,
  COURSES.TPC_SCOTTSDALE,
  COURSES.TPC_SOUTHWIND,
  COURSES.VALHALLA,
  COURSES.WOLF_CREEK,
  COURSES.YALE,
];

const IAP_TO_EMOJI = {
  eastlake: ':peach:',
  kapalua: ':volcano:',
  kiawah: ':desert_island:',
  wolfcreek: ':wolf:',
  olympiafields: ':national_park:',
  pebblebeach: ':ocean:',
  pinehurst2: ':evergreen_tree:',
  standrewsold: ':european_castle:',
  tpcsawgrass: ':carpentry_saw:',
  tpcscottsdale: ':cactus:',
  tpcsouthwind: ':wind_blowing_face:',
  valhalla: ':eagle:',
  yale: ':school:',
  'credits-800': ':dollar:',
  'credits-1800': ':moneybag:',
  'credits-3800': ':money_mouth_face:',
  'credits-6000': ':money_with_wings:',
  'holiday-bundle-2022': ':shopping_bags:',
  'five-course-bundle-may-2023': ':shopping_trolley:',
};

const IAP_TO_NAME = {
  eastlake: 'East Lake',
  kapalua: 'Kapalua Plantation',
  kiawah: 'Kiawah Island',
  wolfcreek: 'Wolf Creek',
  olympiafields: 'Olympia Fields',
  pebblebeach: 'Pebble Beach',
  pinehurst2: 'Pinehurst No. 2',
  standrewsold: 'Old Course at St Andrews',
  tpcsawgrass: 'TPC Sawgrass',
  tpcscottsdale: 'TPC Scottsdale',
  tpcsouthwind: 'TPC Southwind',
  valhalla: 'Valhalla',
  yale: 'Yale',
  'credits-800': '800 Credits',
  'credits-1800': '1800 Credits',
  'credits-3800': '3800 Credits',
  'credits-6000': '6000 Credits',
  'holiday-bundle-2022': 'Four Course Bundle (December 2022)',
  'five-course-bundle-may-2023': 'Five Course Bundle (May 2023)',
};

// Validate that all the constants have been updated properly
Object.values(COURSES).forEach((courseName) => {
  const minMultiplayerVersion = COURSE_MULTIPLAYER_MIN_VERSIONS.get(courseName);
  if (!minMultiplayerVersion) {
    throw new Error(`Min multiplayer version not specified for course: ${courseName}`);
  }

  const displayName = COURSE_DISPLAY_NAMES[courseName];
  if (!displayName) {
    throw new Error(`Display name not specified for course: ${courseName}`);
  }

  // Skip the following checks for Topgolf
  // - hole pars: n/a, no holes in Topgolf
  // - hole handicaps: n/a, no holes in Topgolf
  // - min bot saving version: n/a, we don't save shot metadata in Topgolf
  if (courseName === COURSES.TOPGOLF) return;

  const minBotSavingVersion = COURSE_SAVE_REPLAY_DATA_MIN_VERSIONS.get(courseName);
  if (!minBotSavingVersion) {
    throw new Error(
      `Min save replay data version not specified for course: ${courseName}`
    );
  }

  const holePars = COURSE_HOLE_PARS[courseName];
  if (!holePars) {
    throw new Error(`Hole pars not specified for course: ${courseName}`);
  }
  if (holePars.length !== 18) {
    throw new Error(`Must have 18 hole pars for course: ${courseName}`);
  }

  const holeHandicaps = COURSE_HOLE_HANDICAPS[courseName];
  if (!holeHandicaps) {
    throw new Error(`Hole handicaps not specified for course: ${courseName}`);
  }
  if (holeHandicaps.length !== 18) {
    throw new Error(`Must have 18 hole handicaps for course: ${courseName}`);
  }
});

module.exports = {
  COURSES,
  COURSE_DISPLAY_NAMES,
  COURSE_HOLE_PARS,
  COURSE_MODE_PARS,
  COURSE_HOLE_HANDICAPS,
  PURCHASABLE_COURSES_TO_OCULUS_SKU,
  OCULUS_SKU_TO_PURCHASABLE_COURSES,
  FREE_COURSES,
  COURSE_MULTIPLAYER_MIN_VERSIONS,
  COURSE_SAVE_REPLAY_DATA_MIN_VERSIONS,
  BATTLE_BOT_ENABLED_COURSES,
  BATTLE_MULTIPLE_BOT_ENABLED_COURSES,
  COURSES_WITH_REVENUE_SHARES,
  COURSES_WITH_ROUND_COMPLETE_REVENUE_SHARES,
  TOURNAMENT_COURSES,
  IAP_TO_EMOJI,
  IAP_TO_NAME,
}