const express = require('express');
const fetch = require("node-fetch");
/* Dependencies */
const cors = require('cors');


/* Server Setup */


const bodyParser = require('body-parser');

const searchImages = require('pixabay-api');

// parse application/x-www-form-urlencoded

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
    // Start up an instance of app

// set ejs as rendering engine
app.set('view engine', 'ejs');

function page1(req, res) {
    res.render("index.ejs")
}

function titleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
}



async function get_lat_long(place) {
    api_path = 'http://api.geonames.org/searchJSON?q=';
    api_params = '&maxRows=10&username=';
    api_key = 'lanako';
    const url = api_path + place + api_params + api_key
    return fetch(url)
        .then(async function(response) {
            return response.json();
        }).then(async function(data) {
            const geo = data.geonames[0]
            return [place, geo.lat, geo.lng]
        });

}

function get_weather(place, lat, long) {
    api_path = 'https://api.weatherbit.io/v2.0/current?'
    api_params = '&lat=' + lat + '&lon=' + long
    API_KEY = "&key=e27fc55be3b7427b86e57893e088febd"
    const url_weather = api_path + api_params + API_KEY

    return fetch(url_weather)
        .then(response => {
            return response.json();
        }).then(data => {
            c = data.data[0]
            return [place, lat, long, c.temp]
        });

}

const getTripDate = (date) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const tripDate = new Date(date);
    const tripDateText = `${days[tripDate.getDay()]}, ${months[tripDate.getMonth()]} ${tripDate.getDate()}, ${tripDate.getFullYear()}`;

    return tripDateText;
}


const getTripStart = () => {

    const date = date.value.split('-');

    return date;
}

const getTripEnd = () => {
    const date = date.value.split('-');

    return date;
}



const countdown = (start, end) => {

    const tripStart = Date.parse(start);
    const tripEnd = Date.parse(end);

    const countdown = tripEnd - tripStart;

    const daysLeft = Math.ceil(countdown / (1000 * 60 * 60 * 24));


    console.log(daysLeft);

    return daysLeft;
}


async function get_Image(place) {
    return await searchImages.searchImages("17003914-2beacaf9d125edaefc4659387", place).then(output => {
        console.log(output)
        return output.hits[0].largeImageURL
    });
}



function page2(req, res) {
    console.log(req.query)
    let img = "None"
    get_Image(req.query.place).then(output => { img = output }).then(
        ignore => { return get_lat_long(req.query.place) }).then(ll => {
        return get_weather(ll[0], ll[1], ll[2])
    }).then(llw =>
        res.send({
            new_place: titleCase(llw[0]),
            weather: llw[3],
            start_trip: getTripDate(req.query.date_start),
            end_trip: getTripDate(req.query.date_end),
            days: countdown(req.query.date_start, req.query.date_end),
            pic_url: img
        })
    )
}




app.get('/page2', page2)



app.listen(8081, () => {
    console.log('Listening at 8081.')

})