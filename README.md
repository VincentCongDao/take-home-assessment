# Project Title  

Recipe Books

## Preview

If you want to see the preview, visit [Preview](https://take-home-assessment-tau.vercel.app/)

## Tech Stack

**Client**: React.js

**Style**: CSS

**Icon**: Material Icon

## Description
This project, created using React.js and traditional CSS, allows users to interact with a collection of recipes through a dynamic filter system without the need for form submission. To run this project on your local machine, use the following commands:
~~~bash
npm install
npm start
~~~

## Features

- Dynamic filtering on the DOM without form submission.
- Displays a limited number of recipes per search criteria.

## Requirement for this project

1. The number of results returned will be limited to 8, and you do not need to worry about pagination
2.The first item in the list is considered the "Featured Recipe" and will take up more space than the other 7 items.
3. Filters for Search:
      1. Name (text search)
      2. Difficulty: [Any, Easy, Medium]
      3. Total Time: [All, Less than 15 minutes, 15-30 minutes, more than 30 minutes]
4. The search can be filtered by name, difficulty and total time simultaneously, but never more than one option per each filter. For example, you wouldn't need to search for both 15-30 minutes AND more than 30 minutes when searching for Total Time.


