const COURSES = {
  ALPINE: 'alpine',
  BAY_HILL: 'bayhill',
  BUTLER_PITCH_PUTT: 'butlerpitchputt',
  CASTLE_LINKS: 'castle links',
  EAST_LAKE: 'eastlake',
  CLIFFS: 'cliffs',
  HARBOUR_TOWN: 'harbourtown',
  KAPALUA: 'kapalua',
  KIAWAH: 'kiawah',
  MUIRFIELD_VILLAGE: 'muirfieldvillage',
  OLYMPIA_FIELDS: 'olympiafields',
  PEBBLE_BEACH: 'pebblebeach',
  PINEHURST_2: 'pinehurst2',
  QUAIL_HOLLOW: 'quailhollow',
  RIVIERA: 'riviera',
  ST_ANDREWS_OLD: 'standrewsold',
  ST_ANDREWS_OLD_REVERSED: 'standrewsoldreversed',
  TPC_SAWGRASS: 'tpcsawgrass',
  TPC_SCOTTSDALE: 'tpcscottsdale',
  TPC_SOUTHWIND: 'tpcsouthwind',
  VALHALLA: 'valhalla',
  WOLF_CREEK: 'wolf creek',
  YALE: 'yale',
  TOPGOLF: 'topgolf',
};

const COURSE_HOLE_PARS = {
  [COURSES.ALPINE]: [4, 3, 4, 5, 3, 4, 4, 4, 4, 5, 4, 3, 4, 3, 4, 5, 4, 4],
  [COURSES.BAY_HILL]: [4, 3, 4, 5, 4, 5, 3, 4, 4, 4, 4, 5, 4, 3, 4, 5, 3, 4],
  [COURSES.BUTLER_PITCH_PUTT]: [3, 3, 3, 3, 3, 3, 3, 3, 3],
  [COURSES.CASTLE_LINKS]: [
    4, 5, 3, 4, 4, 4, 3, 4, 5, 4, 4, 5, 4, 3, 4, 4, 3, 5,
  ],
  [COURSES.CLIFFS]: [4, 5, 4, 3, 4, 4, 4, 3, 4, 4, 4, 4, 3, 5, 3, 4, 5, 4],
  [COURSES.EAST_LAKE]: [4, 3, 4, 4, 4, 5, 4, 4, 3, 4, 3, 4, 4, 4, 3, 4, 4, 5],
  [COURSES.HARBOUR_TOWN]: [
    4, 5, 4, 3, 5, 4, 3, 4, 4, 4, 4, 4, 4, 3, 5, 4, 3, 4,
  ],
  [COURSES.KAPALUA]: [4, 3, 4, 4, 5, 4, 4, 3, 5, 4, 3, 4, 4, 4, 5, 4, 4, 5],
  [COURSES.KIAWAH]: [4, 5, 4, 4, 3, 4, 5, 3, 4, 4, 5, 4, 4, 3, 4, 5, 3, 4],
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
  [COURSES.ST_ANDREWS_OLD]: [
    4, 4, 4, 4, 5, 4, 4, 3, 4, 4, 3, 4, 4, 5, 4, 4, 4, 4,
  ],
  [COURSES.ST_ANDREWS_OLD_REVERSED]: [
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
    '18 holes': holePars.reduce((a, b) => a + b, 0),
    'front 9': holePars.slice(0, 9).reduce((a, b) => a + b, 0),
    'back 9': holePars.slice(9, 18).reduce((a, b) => a + b, 0),
  };
}

module.exports = {
  COURSES,
  COURSE_HOLE_PARS,
  COURSE_MODE_PARS,
};
