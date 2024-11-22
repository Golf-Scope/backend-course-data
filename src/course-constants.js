const COURSES = {
  ALPINE: 'alpine',
  BAY_HILL: 'bayhill',
  BUTLER_PITCH_PUTT: 'butlerpitchputt',
  CANYONS: 'canyons',
  CASTLE_LINKS: 'castle links',
  CASTLE_PINES: 'castlepines',
  // The 2023 version of eastlake before it was redesigned
  EAST_LAKE: 'eastlake',
  // The 2024 version of eastlake after it was redesigned
  EAST_LAKE_2024: 'eastlake2024',
  CLIFFS: 'cliffs',
  HARBOUR_TOWN: 'harbourtown',
  JUMEIRAH_EARTH: 'jumeirahearth',
  KAPALUA: 'kapalua',
  KIAWAH: 'kiawah',
  LOFOTEN: 'lofoten',
  MAGNOLIA_PINES: 'magnoliapines',
  MUIRFIELD_VILLAGE: 'muirfieldvillage',
  OLYMPIA_FIELDS: 'olympiafields',
  PEBBLE_BEACH: 'pebblebeach',
  PINEHURST_2: 'pinehurst2',
  QUAIL_HOLLOW: 'quailhollow',
  RIVIERA: 'riviera',
  SPYGLASS_HILL: 'spyglasshill',
  ST_ANDREWS_OLD: 'standrewsold',
  ST_ANDREWS_OLD_REVERSED: 'standrewsoldreversed',
  SWEETENS_COVE: 'sweetenscove',
  TE_ARAI_NORTH: 'tearainorth',
  TE_ARAI_PUTTING: 'tearaiputting',
  TE_ARAI_SOUTH: 'tearaisouth',
  THE_CRADLE: 'thecradle',
  THE_HAY: 'thehay',
  THE_HAY_PUTTING: 'thehayputting',
  TORREY_PINES_NORTH: 'torreypinesnorth',
  TORREY_PINES_SOUTH: 'torreypinessouth',
  TPC_SAWGRASS: 'tpcsawgrass',
  TPC_SCOTTSDALE: 'tpcscottsdale',
  TPC_SOUTHWIND: 'tpcsouthwind',
  VALHALLA: 'valhalla',
  WOLF_CREEK: 'wolf creek',
  YALE: 'yale',
  TOPGOLF: 'topgolf',
};

const PUTTING_COURSES = [COURSES.THE_HAY_PUTTING, COURSES.TE_ARAI_PUTTING];

const COURSE_HOLE_PARS = {
  [COURSES.ALPINE]: [4, 3, 4, 5, 3, 4, 4, 4, 4, 5, 4, 3, 4, 3, 4, 5, 4, 4],
  [COURSES.BAY_HILL]: [4, 3, 4, 5, 4, 5, 3, 4, 4, 4, 4, 5, 4, 3, 4, 5, 3, 4],
  [COURSES.BUTLER_PITCH_PUTT]: [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [COURSES.CASTLE_LINKS]: [
    4, 5, 3, 4, 4, 4, 3, 4, 5, 4, 4, 5, 4, 3, 4, 4, 3, 5,
  ],
  [COURSES.CASTLE_PINES]: [
    5, 4, 4, 3, 4, 4, 3, 5, 4, 4, 3, 4, 4, 5, 4, 3, 5, 4,
  ],
  [COURSES.CANYONS]: [4, 3, 5, 4, 4, 3, 5, 4, 4, 5, 3, 4, 4, 4, 5, 3, 4, 4],
  [COURSES.CLIFFS]: [4, 5, 4, 3, 4, 4, 4, 3, 4, 4, 4, 4, 3, 5, 3, 4, 5, 4],
  [COURSES.EAST_LAKE]: [4, 3, 4, 4, 4, 5, 4, 4, 3, 4, 3, 4, 4, 4, 3, 4, 4, 5],
  [COURSES.EAST_LAKE_2024]: [
    4, 3, 4, 4, 4, 5, 4, 4, 3, 4, 3, 4, 4, 5, 3, 4, 4, 5,
  ],
  [COURSES.HARBOUR_TOWN]: [
    4, 5, 4, 3, 5, 4, 3, 4, 4, 4, 4, 4, 4, 3, 5, 4, 3, 4,
  ],
  [COURSES.JUMEIRAH_EARTH]: [
    4, 5, 4, 3, 4, 3, 5, 4, 4, 4, 4, 4, 3, 5, 4, 4, 3, 5,
  ],
  [COURSES.KAPALUA]: [4, 3, 4, 4, 5, 4, 4, 3, 5, 4, 3, 4, 4, 4, 5, 4, 4, 5],
  [COURSES.KIAWAH]: [4, 5, 4, 4, 3, 4, 5, 3, 4, 4, 5, 4, 4, 3, 4, 5, 3, 4],
  [COURSES.LOFOTEN]: [4, 3, 4, 4, 5, 4, 3, 5, 4, 4, 4, 3, 5, 4, 4, 4, 3, 4],
  [COURSES.MAGNOLIA_PINES]: [
    4, 5, 4, 3, 4, 3, 4, 5, 4, 4, 4, 3, 5, 4, 5, 3, 4, 4,
  ],
  [COURSES.MUIRFIELD_VILLAGE]: [
    4, 4, 4, 3, 5, 4, 5, 3, 4, 4, 5, 3, 4, 4, 5, 3, 4, 4,
  ],
  [COURSES.OLYMPIA_FIELDS]: [
    5, 4, 4, 4, 4, 3, 4, 3, 4, 4, 4, 4, 3, 4, 5, 3, 4, 4,
  ],
  [COURSES.PEBBLE_BEACH]: [
    4, 5, 4, 4, 3, 5, 3, 4, 4, 4, 4, 3, 4, 5, 4, 4, 3, 5,
  ],
  [COURSES.PINEHURST_2]: [4, 4, 4, 4, 5, 3, 4, 5, 3, 5, 4, 4, 4, 4, 3, 5, 3, 4],
  [COURSES.QUAIL_HOLLOW]: [
    4, 4, 4, 3, 4, 3, 5, 4, 4, 5, 4, 4, 3, 4, 5, 4, 3, 4,
  ],
  [COURSES.RIVIERA]: [5, 4, 4, 3, 4, 3, 4, 4, 4, 4, 5, 4, 4, 3, 4, 3, 5, 4],
  [COURSES.SPYGLASS_HILL]: [
    5, 4, 3, 4, 3, 4, 5, 4, 4, 4, 5, 3, 4, 5, 3, 4, 4, 4,
  ],
  [COURSES.ST_ANDREWS_OLD]: [
    4, 4, 4, 4, 5, 4, 4, 3, 4, 4, 3, 4, 4, 5, 4, 4, 4, 4,
  ],
  [COURSES.ST_ANDREWS_OLD_REVERSED]: [
    4, 4, 4, 4, 5, 4, 4, 3, 4, 4, 3, 4, 4, 5, 4, 4, 4, 4,
  ],
  [COURSES.SWEETENS_COVE]: [
    5, 4, 5, 3, 4, 4, 4, 4, 3, 5, 4, 5, 3, 4, 4, 4, 4, 3,
  ],
  [COURSES.TE_ARAI_NORTH]: [
    4, 3, 4, 4, 4, 4, 3, 4, 5, 4, 5, 3, 4, 5, 3, 4, 3, 5,
  ],
  [COURSES.TE_ARAI_PUTTING]: [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
  ],
  [COURSES.TE_ARAI_SOUTH]: [
    5, 4, 4, 4, 3, 4, 5, 3, 4, 4, 4, 3, 5, 4, 4, 4, 3, 5,
  ],
  [COURSES.THE_CRADLE]: [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [COURSES.THE_HAY]: [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [COURSES.THE_HAY_PUTTING]: [
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
  ],
  [COURSES.TORREY_PINES_NORTH]: [
    4, 4, 3, 4, 5, 4, 4, 3, 5, 5, 4, 3, 4, 4, 3, 4, 5, 4,
  ],
  [COURSES.TORREY_PINES_SOUTH]: [
    4, 4, 3, 4, 4, 5, 4, 3, 5, 4, 3, 4, 5, 4, 4, 3, 4, 5,
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
    '18 holes': holePars.reduce((a, b) => a + b, 0),
    'front 9': holePars.slice(0, 9).reduce((a, b) => a + b, 0),
    'back 9': holePars.slice(9, 18).reduce((a, b) => a + b, 0),
  };
}

module.exports = {
  COURSES,
  PUTTING_COURSES,
  COURSE_HOLE_PARS,
  COURSE_MODE_PARS,
};
