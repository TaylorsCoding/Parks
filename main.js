$(function () {
    $('#parks').on('submit', function (event) {
        event.preventDefault();
        let states = $("input[name=state]").val();
        let numberOfParks = $("input[name=park]").val();
        let stateArray = states.split(" ");
        let limit = numberOfParks || 10;
        let url = makeUrl(stateArray, limit)

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => console.log(JSON.stringify(responseJson)))
            .catch(err => {
                $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
    })
});


function makeUrl(states, number) {
    let url = 'https://developer.nps.gov/api/v1/parks?api_key=si04k94062nZ9ws3gExiO6H17J1Ka1zbKUtJINQo';

    for (let i = 0; i < states.length; i++) {
        url += `&stateCode=${states[i]}`;
    }

    url += `&limit=${number}`
    return url;
}



//how do you turn a string into an array?
// "va pa ca"