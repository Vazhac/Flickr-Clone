# PhotoPickr Project

Project Wireframe: https://www.figma.com/file/xraSqyGNmKe9IAqlJ5Mm7T/Untitled

Project Website: https://photopickr.herokuapp.com/

## PhotoPickr at a Glance

PhotoPickr is a full stack Flask and React app that allows users to find photos of a selected tag or album name. Logged in users can comment on other users' photos. Users can also upload photos to their profile pages to demonstrate the types of music they like to make. Currently, JamOut is only seeded with demo users to allow for testing of features.

## Application Architecture

PhotoPickr is built on a React frontend with a Flask backend, using PostgreSQL as a database.

## Frontend Overview

PhotoPickr does the vast majority of its application logic on the backend, but display/interaction logic on the frontend is managed using several technologies.

### Frontend Technologies Used

#### React 

PhotoPickr is a React application. All display logic is handled by the React libraries.

#### Redux

PhotoPickr makes extensive use of Redux. All state management is handled with Redux, with thunks making API calls to the backend server for data. 

## Backend Overview

PhotoPickr uses an Express server with a PostgreSQL database, with the PostGIS extension enabled in order to allow for distance queries. 

### Backend Technologies Used

#### FlaskJS

Flask was an easy choice to make for the PhotoPickr server. The simple data flow from the frontend to the backend with JavaScript at the core of the frontend and Python for the backend made for quick, easy development.

#### PostgreSQL

PostgreSQL was the database of choice because it is simple to work with, and is easily manipulable using Sequelize.

#### Flask Alchemy

Flask Alchemy was the ORM of choice for PhotoPickr because of how nicely it integrates with PostgreSQL and a Python backend. All table management and data seeding was handled neatly and simply by way of Flask Alchemy.

#### React Icons API

React Icons was used on the frontend to manage different kinds of messages and to distribute icons to the appropriate error.


## Conclusion and Next Steps

While the core functionality of PhotoPickr works, there are a number of design issues I'm unhappy with. As I have little design experience, I had to make choices that were functional, but not necessarily great, and I would like to take the time to redesign some of the visual aspects of the site so that it is more appealing to look at. Beyond that, I plan to implement the ability for users to edit and delete Albums and Favorites, which they currently cannot do. I also plan to implement a tag system when users search and for photos, as well as follow a tag to see recent photos with that tag. Lastly, I want to implement an Amazon Serverless Image Handler, which will allow users to be able to upload any image instead of providing a URL and be used as a profile picture.
