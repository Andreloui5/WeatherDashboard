$(document).ready(function() {

    const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    const weatherApiKey = "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"



function currentWeather(searchValue){
    $.ajax({
        url: weatherUrl + searchValue + weatherApiKey,
        type: "GET",
    }).then(function(response){

        var title = $(".today").html("<h3>" + response.name + " weather details:<h3>" + "Temperature " + response.main.temp + "°");
        
        getUV(response.coord.lat, response.coord.lon)
    });

}

function getForcast(searchValue){
    $.ajax({
        url: weatherUrl + searchValue + weatherApiKey,
        type: "GET",
    }).then(function(response){
        console.log(response);

        var title1 = $(".forcast").html("<p>" +"Feels like: " + response.main.feels_like + "<p>");

    })

}

function getUV(lat, lon){
    $.ajax({ 
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lat + "&lon=" + lon + weatherApiKey,
        type: "GET",
    }).then(function(response){
        console.log(response);

        var title = $(".uv").html("<p>UV index: " + response.value + "<p>");
        if (title )
    })

}

//When search button is clicked, this records that data
$("#search-button").on("click", function(){
    var searchValue = $("#search-value").val()

    //searches openweather for:
    currentWeather(searchValue)
    getForcast(searchValue)


})





});