# backend-course-data
* Repository of course constants and utilities for calculating strokes gained
* Shared by golf-plus-api and golf-plus-analytics

# Scripts

## get-coordinates-from-course-json.js
* Processes raw course JSON files into a single object for accessing course hole tee/pin coordinates.
* When we add a new course json file to vr-web-ui or when we change an existing one, we also need to copy it into the `scripts/data/course-json` directory in this repo and run the script.
* The script will write the new course hole distances constant into `src/course-hole-coordinates.js`. The pre-commit hook will format the file for us.
* Note that we only have entries in `courseHoleCoordinates` for courses for which we have course json data. Not every course has an entry here and new courses most likely won't.