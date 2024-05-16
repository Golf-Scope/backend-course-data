# backend-course-data
* Repository of course constants and utilities for calculating strokes gained
* Shared by golf-plus-api and golf-plus-analytics

# Scripts

## get-hole-distances-from-course-json.js
* Processes raw course JSON files into course hole distances. Any time we need to know the distance from tee to pin for a given hole, we can simply reference this object. 
* When we add a new course json file to vr-web-ui or when we change an existing one, we also need to copy it into the `scripts/data/raw-course-json` directory in this repo and run this script.
* The script will write the new course hole distances constant into `src/course-hole-distances.js` but it will be unformatted. Be sure to format the file after running the script so the diff is clear. One easy option for formatting is to go into the file and add a new line after `module.exports = {` then save with Prettier "format on save" enabled.
* Note that we only have entries in `courseHoleDistances` for courses for which we have course json data. Not every course has an entry here and new courses most likely won't.