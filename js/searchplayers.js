/*
Author:Kevin Ishak
Last Modification: 2023-11-27
*/

// Event listener for when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on using the URL path.
    if (window.location.pathname.includes('home.html')) {
        // Get the search input element by its ID.
        const searchInput = document.getElementById('search');
        // Add an event listener to prevent form submission on 'Enter' if the input is empty.
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });

        // Get the search form element by its ID.
        const searchForm = document.getElementById('search-form');
        // Add an event listener to handle the search form submission.
        searchForm.addEventListener('submit', function(event) {
            const searchValue = searchInput.value.trim();
            if (!searchValue) {
                // Prevent form submission if the search input is empty.
                event.preventDefault();
            } else {
                // Redirect to the search results page with the query parameter.
                window.location.href = `search.html?query=${encodeURIComponent(searchValue)}`;
            }
        });
    } else if (window.location.pathname.includes('players.html')) {
        // Sort players by name for the players page.
        const sortedPlayers = players.sort((a, b) => a.name.localeCompare(b.name));
        displayPlayers(sortedPlayers);

        // Setup for live search functionality on the players page.
        const searchInput = document.getElementById('search');
        const searchResultsContainer = document.querySelector('.search-results');

        searchInput.addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
              event.preventDefault();
          }});

        // Filter the displayed players as the user types into the search box.
        searchInput.addEventListener('input', function(event) {
            const searchTerm = event.target.value.toLowerCase();
            if (searchTerm) {
                const filteredPlayers = sortedPlayers.filter(player => player.name.toLowerCase().includes(searchTerm));
                displayPlayers(filteredPlayers, searchTerm);
            } else {
                // If the search term is cleared, display all players again.
                displayPlayers(sortedPlayers);
            }
        });
    } else if (window.location.pathname.includes('search.html')) {
        // Logic specific to the search results page.
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');
        // If there's a query parameter, find and display the matching player.
        if (query) {
            const playerData = players.find(player => player.name.toLowerCase() === query.toLowerCase());
            if (playerData) {
                // Display only the searched player's card.
                displayPlayers([playerData]);
            } else {
                // If no player matches the search term, display a 'not found' message.
                document.querySelector('.search-results').innerHTML = '<p>No matching player found.</p>';
            }
        }
    }
});

// Function to create and display player cards on the page.
function displayPlayers(playerArray, searchTerm = '') {
    // Get the container for search results.
    const searchResultsContainer = document.querySelector('.search-results');
    // Set the inner HTML of the search results container depending on if a search term was used.
    searchResultsContainer.innerHTML = searchTerm ? `<h2>Search Results for: <span>${searchTerm}</span></h2>` : '<h2>All Players:</h2>';
    const searchResults = document.createElement('div');

    // Iterate over the player array to create HTML for each player.
    playerArray.forEach(player => {
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
        // Append the player's HTML to the search results.
        searchResults.innerHTML += playerCardHtml;
    });

    // Add the search results to the search results container.
    searchResultsContainer.appendChild(searchResults);
}

// The players array
const players = [
  {
    name: "Joao Felix",
    team: "FC Barcelona",
    country: "Portugal",
    position: "ST",
    goals: "5",
    assists: "1",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Joao Cancelo",
    team: "FC Barcelona",
    country: "Portugal",
    position: "RB/RW",
    goals: "3",
    assists: "2",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Malcom Adu",
    team: "Atletico Bilbao",
    country: "Spain",
    position: "RW",
    goals: "5",
    assists: "1",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Abdel Abqar",
    team: "Deportivo Alaves",
    country: "Morocco",
    position: "CB",
    goals: "1",
    assists: "0",
    yellowcard: "3",
    redcard: "1",
  },
  {
    name: "Vinicius Junior",
    team: "Real Madrid",
    country: "Brazil",
    position: "LW",
    goals: "17",
    assists: "10",
    yellowcard: "5",
    redcard: "0",
  },
  {
    name: "Luka Modric",
    team: "Real Madrid",
    country: "Croatia",
    position: "CM",
    goals: "3",
    assists: "8",
    yellowcard: "4",
    redcard: "0",
  },
  {
    name: "Toni Kroos",
    team: "Real Madrid",
    country: "Germany",
    position: "CM",
    goals: "5",
    assists: "6",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Eder Militao",
    team: "Real Madrid",
    country: "Brazil",
    position: "CB",
    goals: "2",
    assists: "1",
    yellowcard: "7",
    redcard: "1",
  },
  {
    name: "Federico Valverde",
    team: "Real Madrid",
    country: "Uruguay",
    position: "CM",
    goals: "3",
    assists: "5",
    yellowcard: "6",
    redcard: "0",
  },
  {
    name: "David Alaba",
    team: "Real Madrid",
    country: "Austria",
    position: "CB",
    goals: "2",
    assists: "2",
    yellowcard: "3",
    redcard: "0",
  },
  {
    name: "Thibaut Courtois",
    team: "Real Madrid",
    country: "Belgium",
    position: "GK",
    goals: "0",
    assists: "0",
    yellowcard: "1",
    redcard: "0",
  },
  {
    name: "Jude Bellingham",
    team: "Real Madrid",
    country: "England",
    position: "CM",
    goals: "8",
    assists: "5",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Robert Lewandowski",
    team: "FC Barcelona",
    country: "Poland",
    position: "ST",
    goals: "12",
    assists: "3",
    yellowcard: "1",
    redcard: "0",
  },
  {
    name: "Rodrygo Silva de Goes",
    team: "Real Madrid",
    country: "Brazil",
    position: "RW",
    goals: "7",
    assists: "9",
    yellowcard: "4",
    redcard: "0",
  },
  {
    name: "Pedri",
    team: "FC Barcelona",
    country: "Spain",
    position: "CM",
    goals: "4",
    assists: "6",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Frenkie de Jong",
    team: "FC Barcelona",
    country: "Netherlands",
    position: "CM",
    goals: "3",
    assists: "4",
    yellowcard: "3",
    redcard: "0",
  },
  {
    name: "Marc-André ter Stegen",
    team: "FC Barcelona",
    country: "Germany",
    position: "GK",
    goals: "0",
    assists: "0",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Youssef En-Nesyri",
    team: "Sevilla FC",
    country: "Morocco",
    position: "ST",
    goals: "6",
    assists: "0",
    yellowcard: "3",
    redcard: "0",
  },
  {
    name: "Jules Koundé",
    team: "FC Barcelona",
    country: "France",
    position: "CB",
    goals: "2",
    assists: "1",
    yellowcard: "4",
    redcard: "0",
  },
  {
    name: "Lucas Ocampos",
    team: "Sevilla FC",
    country: "Argentina",
    position: "LW",
    goals: "7",
    assists: "2",
    yellowcard: "5",
    redcard: "0",
  },
  {
    name: "Jesús Navas",
    team: "Sevilla FC",
    country: "Spain",
    position: "RB",
    goals: "1",
    assists: "4",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Jan Oblak",
    team: "Atlético Madrid",
    country: "Slovenia",
    position: "GK",
    goals: "0",
    assists: "0",
    yellowcard: "2",
    redcard: "0",
  },
  {
    name: "Goncalo Guedes",
    team: "Valencia CF",
    country: "Portugal",
    position: "LW",
    goals: "11",
    assists: "6",
    yellowcard: "4",
    redcard: "0",
  },
  {
    name: "Mikel Oyarzabal",
    team: "Real Sociedad",
    country: "Spain",
    position: "LW",
    goals: "10",
    assists: "8",
    yellowcard: "2",
    redcard: "0",
  },
{
    name: "Gerard Moreno",
    team: "Villarreal CF",
    country: "Spain",
    position: "ST",
    goals: "13",
    assists: "4",
    yellowcard: "3",
    redcard: "0",
  },
  {
    name: "Iñaki Williams",
    team: "Athletic Bilbao",
    country: "Spain",
    position: "ST",
    goals: "8",
    assists: "3",
    yellowcard: "1",
    redcard: "0",
  },
  {
    name: "Iker Muniain",
    team: "Athletic Bilbao",
    country: "Spain",
    position: "LW",
    goals: "5",
    assists: "6",
    yellowcard: "4",
    redcard: "0",
  },
  {
    name: "Nabil Fekir",
    team: "Real Betis",
    country: "France",
    position: "CAM",
    goals: "9",
    assists: "7",
    yellowcard: "7",
    redcard: "1",
  }
].sort((a, b) => a.name.localeCompare(b.name));

const people = players.map(player => player.name);
