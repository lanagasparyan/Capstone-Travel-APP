import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.scss';
import 'bootstrap';


async function get_details(place, start_date, end_date) {
    const api_path = 'http://localhost:8081/page2?';
    const api_place = 'place=' + place;
    const api_sd = '&date_start=' + start_date;
    const api_ed = '&date_end=' + end_date;

    const url = api_path + api_place + api_sd + api_ed
    return fetch(url)
        .then(async function(response) {
            return response.json();
        });

}




document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("go").addEventListener("click", function() {
        console.log("Hello")
        const pl = document.getElementById('place').value;
        const sd = document.getElementById('date_start').value;
        const ed = document.getElementById('date_end').value;
        get_details(pl, sd, ed).then(res => {
            document.getElementById('new_place').textContent = res.new_place;
            document.getElementById('weather').textContent = res.weather;
            document.getElementById('start_trip').textContent = res.start_trip;
            document.getElementById('end_trip').textContent = res.end_trip;
            document.getElementById('days').textContent = res.days;
            document.getElementById('pic_url').src = res.pic_url;
            document.getElementById('hide').style.visibility = 'visible';
        })
    });
});