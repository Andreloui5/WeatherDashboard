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
        //adds text stating the current UV Index at the chosen location
        var uvStaticText = $(".uv")
        uvStaticText.html("<p>UV index: " + "<span>" + response.value + "</span>" + "<p>");
        uvStaticText.children("span").addClass("uvNum");
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
    var searchValue = $("#search-value").val()

    //searches openweather for:
    currentWeather(searchValue)
    getForcast(searchValue)


})





});