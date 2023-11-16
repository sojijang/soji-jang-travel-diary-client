# Project Title

- Travel Diary

## Overview

- Travel Diary offers features such as currency conversion, budget tracker, organizing trip plans with a calender feature and saving places-to-go & creating routes on a map.

### Problem

- When traveling abroad, I often find it challenging to figure out how much this price is if I convert it into my country's currency. While there are many currency conversion apps available, I've tended to discontinue using due to their limited functionality. This led me the idea of a travel app that not only facilitates currency conversion but also have additional features like budget tracking, savings plans and places to visit.

### User Profile

- Travelers, international students and workers will be user. They can benefit from this app which will help them manage their finances and trip plans efficiently during their stay.

### Features

- Currency Conversion:
  Users can convert currencies easily within the app.

- Budget Tracker:
  Users can input their total budget and track it. They can save their budget along with details, and the app provides real-time updates on their budget status, allowing for better financial management during the trip.

- Organizing Trip Plans with Calendar Feature:
  Users can plan and organize their trips through a calendar feature.

- Saving Places-to-Go & Creating Routes on a Map:
  Users can save desired place-to-go and create routes on a map. The app also offers a list of recommended places and user can save a recommended place.

- Saving Booking Information:
  The app allows users to save essential booking details for flights, hotels, and other reservations.

- Checklist Creation:
  Users can create and manage checklists to ensure they have everything they need for their trip.

- Memo saving:
  Users can create and manage memos.

### Tech Stack

- Sass, React(+Router), Axios, Node.js, Express, Knex.js and more ....

### APIs

- map npm, calender npm, currency conversion api, real-time data api, attractions api and more ...

### Sitemap

- Country Selection Page:
  Users begin selecting the country they plan to travel to.

- Main Page(Dashborad):
  This page displays the user's trip information(if logged in), current currency information, a checklist and a memo.

- Login page: (pop-up)
  This page offers a secure entry point with Google authentication.

- Budget Page:
  This page covers budget real-time tracking.

- Calendar Page:
  User can save and organize their trip plans using the calendar feature on this page.

- Map Page:
  This page allows users to save desired places-to-go, create routes on a map and also provides a list of recommended places to explore.

### Mockups

### Data

### Endpoints

1. Country Selection Page: /
2. Main Page: /dashboard
3. Login Page: /login
4. Signup Page: /signup
5. Calendar Page: /calender
6. Map Page: /map

### Auth

- Authentication will be included using JWT. (log in using Email)

## Roadmap

1. Sprint-1 (Duration: first week):
   Establish the foundational structure of the app, including creating pages & components & any necessary codes to build a basic frame.

- Identify and create necessary pages (Country Selection, Main Page, Budget Page, Calendar Page, Map Page).
- Develop essential components for each page.
- Set up basic navigation between pages.
- Write initial code structure for the app.

2. Sprint-2 (Duration: first week):
   Build a database and integrate necessary APIs for functionality.

- Create a back-end.
- Identify and get APIs for currency conversion, real-time data api, tour attractions & any other external functionalities.

3. Sprint-3 (Duration: second week):
   Fetch data from the back-end to populate the app's pages.

- Set up data retrieval for each pages.
- Construct codes to display data on relevant pages.
- Conduct error handling and debugging.

4. Sprint-4 (Duration: second & last week):
   Style the app for an attractive and user-friendly experience.

- Create a consistent and visually appealing design for each page.
- Implement responsive design to accommodate various devices.

## Nice-to-haves

- Price Tag Detection:
  Description: A feature where users can upload images of price tags(or shows it through camera like QR code), and the app will detect the price, displaying it in the converted currency.
  Implementation: Utilize optical character recognition (OCR) & data extraction technology to extract the price and convert it into current currency.

- Information Page:
  Description: Create a page providing comprehensive information about the selected destination such as weather updates and transportation details.
  Implementation: Utilize relevant APIs to fetch real-time weather data and transportation information for the specified location.

- Social media authentication service.

- Korean version
