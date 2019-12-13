$(document).ready(function() {

    const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    const weatherApiKey = "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"



function currentWeather(searchValue){
    $.ajax({
        url: weatherUrl + searchValue + weatherApiKey,
        type: "GET",
    }).then(function(response){

        var title = $(".today").html(response.name + " weather details:");
        var todaysTemp = $("#todaysTemp").text("Temperature: " + response.main.temp + "°");
        //provides today's date
        var currentDate = $("#currentDate").text(moment().format("l"));

        getUV(response.coord.lat, response.coord.lon)
    });

}

function getForcast(searchValue){
    $.ajax({
        url: weatherUrl + searchValue + weatherApiKey,
        type: "GET",
    }).then(function(response){
        console.log(response);
        // Adds feels like temp to the main dashboard
        var todaysFeels = $("#todaysFeels").text("Feels like: " + response.main.feels_like + "°")
    })

}

function getUV(lat, lon){
    $.ajax({ 
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lat + "&lon=" + lon + weatherApiKey,
        type: "GET",
    }).then(function(response){
        console.log(response);
        //adds text stating the current UV Index at the chosen location
        var uvStaticText = $(".uv").text("UV index: ");
        var uvNum = $(".uvNum").text(response.value)
        // changes the colors based on UV index
        if (response.value < 3) {
            $(".uvNum").css("background-color", "#3EA72D")
        }
        else if ((response.value >= 3) && (response.value < 6)) {
            $(".uvNum").css("background-color", "#FFF300")
        }
        else if ((response.value >= 6) && (response.value < 8)) {
            $(".uvNum").css("background-color", "#F18B00")
        }
        else if ((response.value >= 8) && (response.value < 11)) {
            $(".uvNum").css("background-color", "#E53210")
        }
        else if (response.value > 11){
            $(".uvNum").css("background-color", "#B567A4")
        }
    })

}

//When search button is clicked, this records that data
$("#search-button").on("click", function(){
    //makes variable for the value the user inputs into the search area and trims it
    var searchValue = $("#search-value").val().trim()

    //searches openweather for:
    currentWeather(searchValue)
    getForcast(searchValue)
})





});