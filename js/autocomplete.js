/*
Author: Kevin Ishak
Last Modification: 2023-11-27
Code inspired by https://codepen.io/aronmarriott-smith/pen/JrWqva
*/

// Function to match people's names based on input.
function matchPeople(input) {
    var sanitizedInput = input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    if (/^\\/.test(sanitizedInput)) return [];
    var reg = new RegExp(sanitizedInput.split("").join("\\w*").replace(/\W/, ""), "i");
    var res = [];
    if (sanitizedInput.trim().length === 0) return res;
    for (var i = 0; i < people.length; i++) {
        if (people[i].match(reg)) res.push(people[i]);
    }
    return res;
}

// Function to handle changes in the search input.
function changeInput(val) {
    var autoCompleteResult = matchPeople(val);
    var resultDiv = document.getElementById("result");
    if (autoCompleteResult.length > 0) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = "";
        autoCompleteResult.slice(0, 10).forEach(function(item) {
            var link = document.createElement("a");
            link.className = "list-group list-group-action";
            link.href = "#";
            link.onclick = function() { setSearch(this.textContent); return false; };
            link.textContent = item;
            resultDiv.appendChild(link);
        });
    } else {
        resultDiv.style.display = "none";
    }
}

// Function to set the search input and handle different page actions.
function setSearch(value) {
    var searchInput = document.getElementById('search');
    searchInput.value = value;
    document.getElementById("result").style.display = "none";

    if (window.location.pathname.includes('players.html')) {
        changeInputPlayersPage(value);
    } else if (window.location.pathname.includes('home.html')) {
        document.getElementById('search-form').submit();
    }
}

// Helper function to display filtered players on players.html
function displayFilteredPlayers(filteredPlayers, searchTerm) {
    const searchResultsContainer = document.querySelector('.search-results');
    searchResultsContainer.innerHTML = ''; // Clear previous results

    // Create a heading for the search results
    const resultsHeading = document.createElement('h2');
    resultsHeading.innerHTML = `Search Results for: <span>${searchTerm}</span>`;
    searchResultsContainer.appendChild(resultsHeading);

    // Check if there are any filtered players
    if (filteredPlayers.length > 0) {
        // Create a container for the player cards
        const playerCardsContainer = document.createElement('div');
        playerCardsContainer.className = 'player-cards-container';

        // Iterate through the filtered players and create their cards
        filteredPlayers.forEach(player => {
            // Construct the card HTML
            const playerCardHtml = `
                <div class="player-result">
                    <h3>${player.name}</h3>
                    <div class="player-card">
                        <img src="imgs/player_logos/${player.name.toLowerCase().replace(/\s+/g, '_')}.png" alt="${player.name}" class="player-image">
                        <p>Name: ${player.name}</p>
                        <p>Team: ${player.team}</p>
                        <p>Country: ${player.country}</p>
                        <p>Position: ${player.position}</p>
                        <div id="${player.name.replace(/\s+/g, '')}-more-info" style="display: none;">
                            <p>Goals: ${player.goals}</p>
                            <p>Assists: ${player.assists}</p>
                            <p>Yellow Cards: ${player.yellowcard}</p>
                            <p>Red Cards: ${player.redcard}</p>
                        </div>
                        <a href="#!" class="learn-more-button" onclick="toggleVisibility('${player.name.replace(/\s+/g, '')}-more-info', this)">Learn More</a>
                    </div>
                </div>`;
            // Append the card HTML to the container
            playerCardsContainer.innerHTML += playerCardHtml;
        });

        // Append the container of player cards to the search results container
        searchResultsContainer.appendChild(playerCardsContainer);
    } else {
        // If no players are found, display a message
        searchResultsContainer.innerHTML += '<p>No matching player found.</p>';
    }
}


// Function to handle changes in the search input on players.html
function changeInputPlayersPage(val) {
    const searchTerm = val.toLowerCase();
    const filteredPlayers = players.filter(player => player.name.toLowerCase().includes(searchTerm));
    displayFilteredPlayers(filteredPlayers, searchTerm);
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');

    if (window.location.pathname.includes('players.html')) {
        searchInput.addEventListener('input', function(event) {
            changeInputPlayersPage(event.target.value);
        });
    } else if (window.location.pathname.includes('home.html')) {
        searchInput.addEventListener('input', function(event) {
            changeInputHomePage(event.target.value);
        });
    }

    // Shared functionality like autocomplete can go here
    searchInput.addEventListener('keyup', function(event) {
        changeInput(event.target.value);
    });
});
