Make sure to utilize the empty function, that way our elements clear out and don't append.

1. When user goest to site
    - need header
    - search bar
    - main panel that dynamically displays city name with todays date
        - humidity
        - wind speed
        - UV index
            - with conditional where color will indicate the lvl of uv

    - 5 day forcast widget with the:
        - date
        - weather icon/picture
        - temp
        - humidity
    
    - if the user has already searched a city:
        - it will be shown/saved for them to click again in the future
        - you can set conditional to clear after x searches, as well.

    - as a bonus, have poeple allow location and automatically pull up weather where they are

2. Make sure API open weather works
3. create onclick event for the search button
4. create a function to search for the weather
    make an AJAX call to the current weather API
    append data to the page
5. create a function to get the forcast
    make an AJAX call to the forcast API
    append data to the page
6. create a function to get the UV index
    make an AJAX call to the UV API
    append data to the page (which is inside the current weather box/function)
    