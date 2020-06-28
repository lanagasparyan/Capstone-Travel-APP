#  Capstone - Travel App at FEND

The goal of this project is building a travel application. It pulls in multiple types of data, from different sources and occasionally one API will be required to get data from another API.

## How to run the project

### Install dependencies
To install the dependecies run the command
```
npm install
```

### Running the tests

For testing run

```
npm run test
```

### Starting the webapp and server

To run the project open the terminal in the root directory and run the command

```
npm run build-dev
```
This will start client at `8080`

After that:
```
npm run start
```
This will start server at `8081`

Now visit your localhost on port number `8080` in the browser to run the application


## What we will cover

- Webpack entry point
- Webpack output and dist folder
- Webpack Loaders
- Webpack Plugins
- Webpack Mode
- Tools for convenient Webpack development

## Running with the 3-Party-APIs

Geonames API - Geographical database from which the location 
Weatherbit API - Weather API 
Pixabay API - free images and videos

- USERNAME=<>
- WEATHER_KEY=<>
- PIXABAY_KEY=<>

API Key or username and a baseUrl  are in an .env file.  USERNAME  for the Geonames API,  and WEATHER_KEY for the Weatherbit API & PIXABAY_KEY  for the Pixabay API


## Extend your Project/Ways to Stand Out 

Following sections have been added:

- Add end date and display length of trip.
- Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).


