# Map Browser

This is a demo project with React frontend and spring-boot backend.

## Making it work
This project was developed on a Linux machine, didn't test it on Windows or macOS. In order to get things up and running:

0. Get your API keys and place them into `frontend/src/utils/config.js`. You need a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) and a [GeoNames user](http://www.geonames.org/export/web-services.html) for this step.
1. In `frontend` directory, run `npm install && npm run build`
2. In `backend` directory, run `mvn install && mvn dockerfile:build`
3. If you've completed previous steps successfully, you can run do `docker-compose up` in `docker` directory.

To perform these steps, you'll need Node 10.15 LTS, Java 9 and Docker 18.02 or higher.

## Frontend 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). To keep things simple, I tried to avoid redux or redux-saga. CSS work is minimium.

## Backend
It was an experiment with a reactive setup, but the absence of batch updates in the API made me post the updates from a non-reactive API, so it is clumsy coding. 

## Testing
Test coverage is nonexistent.

## Lessons Learned
Although there are google map components for react, they are complex for this small demonstration. Moreover, they don't conform to React guidelines for lifecycle management.

Office UI Fabric test: It was an big bulk of an add-on for a list plus a search box.
