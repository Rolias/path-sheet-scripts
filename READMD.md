# Google App Scripts bound to the SW Development Path Status Google Sheet

## Clasp Overview

Google App Scripts has a package called "clasp", Command Line App Script Project. It is an an npm package. 
The [github project](https://github.com/google/clasp)
There is also a [code labs tutorial](https://codelabs.developers.google.com/codelabs/clasp/#0). 
In a nutshell
```bash
# install clasp globally
npm i @google/clasp -g
clasp login # pick your Google account
# create an empty script for sheet then use File->Project Properties menu. 
# copy the Script ID value from the dialog
clasp clone # Script ID from above.
# You can also use clasp create [scripttitle] [parentid] but why bother?
# make changes on desktop 
clasp push #push your changes
# if you make changes in the google script editor
clasp pull
# try not to make changes in the google script editor

```

## Script Overview

The script perform two basic functions.  

1. `onEdit()` script triggers off changes in the sheet and is looking for a change in the Last Reviewed column. If it finds one it will clear the checkbox in the Notified column if it exists. This allows the curriculum lead to get another email when the next review is needed. 
1. `runCode()` is invoked from a timed trigger. To modify or create this trigger you need to use the Google App script Editor. Use the `Edit->Current Project's Triggers` menu and set up a timed trigger. The script checks all the rows in the sheet to see if today's date exceeds the date in the Next Review column. If it does it sends and email to the Curriculum Lead and marks the `Notified` column as true. The script stops on the first row that has a blank for the Path Name.

## testScripts.js

Nope, these aren't the unit tests. This is just where I test out how things work in Google app scripts. A good future step though is to figure out how to run unit tests on Google App Scripts.