const { app, get_lat_long } = require('../server/server');
const supertest = require('supertest');
// const get_lat_long = require('../server/server');
const fetch = require("node-fetch");
// configuring env
const dotenv = require('dotenv');
dotenv.config();



describe('Endpoint test', () => {
    it('http://localhost:8081/page2?place=brooklyn&date_start=&date_end=', async(done) => {
        const response = await fetch('http://localhost:8081/page2?place=brooklyn&date_start=&date_end=');
        expect(response.status).toBe(200);
        done();
    });
});

test('get_lat_long test', () => {
    get_lat_long("brooklyn").then(ll => {
        expect(ll[0]).toBe("brooklyn");
    });
});