// Treat rocks just like rough
// Rocks data is pretty wild, since all almost all the rocks shots are from wolf creek,
// often in canyons that you can't get out of, so the data is very skewed.
// By treating like rough, we can avoid rocks shots from being too heavily weighted
// and showing up at the top of top shots leaderboards.
const roughStrokesGained = require('./rough');

module.exports = roughStrokesGained;
