// JavaScript to handle the dropdown menu
const searchSection = document.querySelector('.search-section');
const cityDropdown = document.getElementById('cityDropdown');

cityDropdown.addEventListener('click', function() {
    if (searchSection.classList.contains('open')) {
        searchSection.classList.remove('open');
    } else {
        searchSection.classList.add('open');
    }
});

// JavaScript to update the text input when a city is selected
document.getElementById("cityDropdown").addEventListener("change", function() {
    const selectedCity = this.value;
    document.getElementById("searchInput").value = selectedCity;
});

// JavaScript to handle the search button click
document.getElementById("searchButton").addEventListener("click", function() {
    const selectedCity = document.getElementById("cityDropdown").value;
    const searchText = document.getElementById("searchInput").value;
    console.log("Selected City: " + selectedCity);
    console.log("Search Text: " + searchText);
});


// JavaScript to handle the Weather searches
const apiKey = "28a7ee5707154ddb848fc79da1f6499b";

const main = document.getElementById('main');
fetch('https://extreme-ip-lookup.com/json/')
.then( res => res.json())
.then(response => {
    console.log("Country: ", response.country);
})
.catch((data, status) => {
    console.log('Request failed');
})

const form = document.getElementById('form');
const search = document.getElementById('searchInput');

const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    try
    {
        const resp = await fetch(url(city), {
            origin: "cros"
        });
        if (resp.status === 200)
        {
            const respData = await resp.json();
            addWeatherToPage(respData);
        } 
        else 
        {
            displayError("Weather data not available for this location. You might have done a spelling mistake.");
        }
    } 
    catch (error) 
    {
        displayError("An error occurred while fetching weather data.");
    }
}

function displayError(errorMessage) {
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.textContent = errorMessage;
    main.innerHTML = '';
    main.appendChild(errorElement);
}
    
function addWeatherToPage(data)
{
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div')
    weather.classList.add('weather');
    weather.innerHTML = `
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
    <small>${data.weather[0].main}</small> `;
    //cleanup 
    main.innerHTML= "";
    main.appendChild(weather);
};
    
    
function Ktoc(K)
{
    return Math.floor(K - 273.15);
}

form.addEventListener('submit',(e) =>{
    e.preventDefault();
    const city = search.value;
    if(city)
    {
        getWeatherByLocation(city)
    }
});

document.getElementById("searchButton").addEventListener("click", function() {
    const selectedCity = document.getElementById("cityDropdown").value;
    const searchText = document.getElementById("searchInput").value;
    if (searchText) {
        // Check if there's text in the input field
        getWeatherByLocation(searchText);
    } 
    else {
        // Handle no city or text entered
        console.log("Please enter a city or location.");
    }
});