document.addEventListener("DOMContentLoaded", () => {
    // Function to update movie details
    function updateMovieDetails(movie) {
        document.getElementById("movie-poster").src = movie.poster;
        document.getElementById("movie-title").textContent = movie.title;
        document.getElementById("movie-runtime").textContent = `Runtime: ${movie.runtime} minutes`;
        document.getElementById("movie-showtime").textContent = `Showtime: ${movie.showtime}`;
        updateAvailableTickets(movie.capacity, movie.tickets_sold);
    }

    // Get movie details for the first movie
    fetch("http://localhost:3000/films/1")
        .then((response) => response.json())
        .then((data) => {
            // Initial update of movie details
            updateMovieDetails(data);

            // Buy Ticket button click event
            document.getElementById("buy-ticket").addEventListener("click", () => {
                if (data.tickets_sold < data.capacity) {
                    data.tickets_sold++;
                    updateAvailableTickets(data.capacity, data.tickets_sold);
                } else {
                    alert("Sorry, this show is sold out!");
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching movie details:", error);
        });

    // Get the list of all movies
    fetch("http://localhost:3000/films")
        .then((response) => response.json())
        .then((data) => {
            const filmsList = document.getElementById("films");
            filmsList.innerHTML = ""; // Clear any placeholder data

            data.forEach((movie) => {
                const filmItem = document.createElement("li");
                filmItem.textContent = movie.title;
                filmItem.classList.add("film", "item");

                // Click event to update movie details
                filmItem.addEventListener("click", () => {
                    updateMovieDetails(movie);
                });

                filmsList.appendChild(filmItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching movie list:", error);
        });
});

function updateAvailableTickets(capacity, ticketsSold) {
    const availableTickets = capacity - ticketsSold;
    document.getElementById("available-tickets").textContent = `Available Tickets: ${availableTickets}`;
}
