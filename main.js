$(function () {
    $('#parks').on('submit', function (event) {
        event.preventDefault();
        let states = $("input[name=state]").val();
        let numberOfParks = $("input[name=park]").val();
        let limit = numberOfParks || 10;
        let url = makeUrl(states, limit)

        fetch(url)
            .then(response => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            })
            .then(responseJson => {
                let parks = responseJson.data;
                displayParks(parks)
            })
            .catch(err => {
                $('#js-error-message').text(`Something went wrong: ${err.message}`);
            });
    })
});


function makeUrl(states, number) {
    let url = `https://developer.nps.gov/api/v1/parks?stateCode=${states}&api_key=si04k94062nZ9ws3gExiO6H17J1Ka1zbKUtJINQo&limit=${number}`;

    return url;
}

function displayParks(parks) {
    $('#parksTable').remove();
    const table = "<table id='parksTable'> \
                        <thead> \
                            <tr> \
                                <th>State</th> \
                                <th>Name</th> \
                                <th>Description</th> \
                                <th>Website</th> \
                            </tr> \
                        </thead> \
                        <tbody> \
                        </tbody> \
                    </table> "
    $('#parksContainer').append(table);
    $.each(parks, function (index, park) {
        let info = park.description
        let parkName = park.fullName
        let webUrl = "http://www.nps.gov/" + park.parkCode
        let states = park.states
        console.log(`<tr><td>${states}</td><td>${parkName}</td><td>${info}</td><td>${webUrl}</td></tr>`)
        $('#parksTable tbody').append(`<tr><td>${states}</td><td>${parkName}</td><td>${info}</td><td><a href="${webUrl}">${webUrl}</a></td></tr>`);
    })
}
