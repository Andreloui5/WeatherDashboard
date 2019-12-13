$(document).ready(function() {

    const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q="
    const weatherApiKey = "&appid=7ba67ac190f85fdba2e2dc6b9d32e93c&units=imperial"



function currentWeather(searchValue){
    $.ajax({
        url: weatherUrl + searchValue + weatherApiKey,
        type: "GET",
    }).then(function(response){
        // console.log(response)
        //adds a class of card to the main dashboard (enabling the light border)
        var dashboard = $("#mainDashboard").addClass("card");
        // Adds the title to the page: '____' weather details:
        var title = $(".today").html(response.name + " weather details:");
        //puts today's date on the page
        var currentDate = $("#currentDate").text(moment().format("l"));
        //puts today's temperature on the page
        var todaysTemp = $("#todaysTemp").text("Temperature: " + response.main.temp + "°F");
        //puts today's 'feels like' temperature on the page
        var todaysFeels = $("#todaysFeels").text("Feels like: " + response.main.feels_like + "°F");
        //puts today's humidity on the page
        var todaysHumid = $("#todaysHumid").text("Humidity: " + response.main.humidity + "%");
        //Calls function to retrieve UV Index
        getUV(response.coord.lat, response.coord.lon)
        // Calls function to populate the five day forcast
        fiveDayForcast(response.coord.lat, response.coord.lon);
    });

}

function fiveDayForcast(lat, lon){
    $.ajax({
        url:  "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lat + "&lon=" + lon + weatherApiKey,
        type: "GET",
    }).then(function(response){
        let weatherArray = response.list
        console.log(weatherArray);
        //empties out dynamically created elements from previous search
        $("#mainColumn").empty();
        //for loop over the array, beginning at 3, and using an iteration of 8(24hours), so that the data will be taken at 12pm each day.
        for (let i = 3; i < weatherArray.length; i += 8) {
            //Creates a new div
            let newDiv= $("<div>");
            // Names and retrieves the date
            let shortDate = weatherArray[i].dt_txt
            //shortens the date to exclude the timestamp
            shortDate = shortDate.substring(0,10);
            // Creates new h4 t display the date
            let theDate = $("<h5>"  + shortDate + "</h5>");
            // creates a p tag with forcasted temperature
            let tempWord = $("<p>Temp: " + weatherArray[i].main.temp + "°F</p>")
            // creates a p tag with forcasted humidity
            let humid = $("<p>Humidity: " + weatherArray[i].main.humidity + "%</p>")
            //adds classes to the date element
            theDate.addClass("card-title text-center marginTop");
            //adds class to the temperature element
            tempWord.addClass("card-text");
            //adds class to the humidity element
            humid.addClass("card-text");
            // Creates an img tag to display the forcast icon
            let weatherSymbol = $("<img>");
            // Creates a src url for the img element
            weatherSymbol.attr("src", "http://openweathermap.org/img/w/" + weatherArray[i].weather[0].icon + ".png");
            //Adds a class to the img element
            weatherSymbol.addClass("card-img");
            //adds classes to the div element
            newDiv.addClass("col-3 card float-left dynamicCard");
            //Appends all the different elements to the div
            newDiv.append(theDate);
            newDiv.append(weatherSymbol);
            newDiv.append(tempWord);
            newDiv.append(humid);
            // Appends the div to the appropriate id on the page
            $("#mainColumn").append(newDiv);
        }
    })
};


function getUV(lat, lon){
    $.ajax({ 
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lat + "&lon=" + lon + weatherApiKey,
        type: "GET",
    }).then(function(response){
        // console.log(response);
        //adds text stating the current UV Index at the chosen location
        var uvStaticText = $(".uv").text("UV index:");
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

// Make jumbotron initial search button (it searches and then collapses/empties everything)
// $("#initial-search-button").on("click", function(){
//     //makes variable for the value the user inputs into the search area and trims it
//     var searchValue = $("#initial-search-value").val()
//     $("#startScreen").remove();
//     $("#mainPage").removeClass("collapse");
//     //searches openweather for:
//     currentWeather(searchValue)
// })

//When search button is clicked, this records that data
$("#search-button").on("click", function(){
    //makes variable for the value the user inputs into the search area and trims it
    var searchValue = $("#search-value").val().trim()
    //searches openweather for:
    currentWeather(searchValue)
})




});