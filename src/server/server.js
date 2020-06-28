// configuring env
const dotenv = require('dotenv');
dotenv.config();

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
app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
    // Start up an instance of app

function titleCase(string) {
    var sentence = string.toLowerCase().split(" ");
    for (var i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(" ");
}



async function get_lat_long(place) {
    let api_path = 'http://api.geonames.org/searchJSON?q=';
    let api_params = '&maxRows=10&username=';
    let api_key = process.env.USERNAME;
    let url = api_path + place + api_params + api_key
    console.log(url)
    return fetch(url)
        .then(async function(response) {
            return response.json();
        }).then(async function(data) {
            const geo = data.geonames[0]
            return [place, geo.lat, geo.lng]
        });

}

function get_weather(place, lat, long) {
    let api_path = 'https://api.weatherbit.io/v2.0/current?';
    let api_params = '&lat=' + lat + '&lon=' + long;
    let API_KEY = '&key=' + process.env.WEATHER_KEY;
    let url_weather = api_path + api_params + API_KEY;
    console.log(url_weather)
    return fetch(url_weather)
        .then(response => {
            return response.json();
        }).then(data => {
            let c = data.data[0]
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

    return daysLeft;
}


async function get_Image(place) {
    let pixabay_key = ""
    pixabay_key = process.env.PIXABAY_KEY
    console.log(pixabay_key)
    return await searchImages.searchImages(pixabay_key, place).then(output => {
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

function page1(req, res) {
    res.send("This is a server, please use `npm run build-dev` to start a client UI<br>" +
        "Server runs at port 8081; client(UI) runs at port 8080, and they can communicate indipendently"

    )
}


app.get('/page2', page2)
app.get('/', page1)



app.listen(8081, () => {
    console.log('Listening at 8081.')
    console.log('This is a server, please use `npm run build-dev` to start a client UI')

})
module.exports = { app, get_lat_long };
// module.exports = get_lat_long;