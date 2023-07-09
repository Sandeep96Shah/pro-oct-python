async function searchMovie(){
    const inputField = document.querySelector("#searchField");
    console.log("inputField", inputField);
    const movieName = inputField.value;
    console.log("movieName", movieName);

    const response = await fetch(`https://www.omdbapi.com/?apikey=3ca5df7&t=${movieName}`);
    const data = await response.json();
    console.log("data", data);

    const searchContainer = document.querySelector(".movies-container-search");

    // create html elements 
    const card = document.createElement("div");
    const poster = document.createElement("div");
    const details = document.createElement("div");
    const image = document.createElement("img");
    const title = document.createElement("p");
    const plot = document.createElement("p");
    const btns = document.createElement("div");
    const addBtn = document.createElement("p");
    const cancelBtn = document.createElement("p");

    // add event listener for cancel button
    cancelBtn.addEventListener("click", () => {
        searchContainer.removeChild(card);
        inputField.value = "";
    });

    // add event listener on add button
    addBtn.addEventListener("click", () => {
        // fetch mymovieList from local storage
        const movieList = JSON.parse(localStorage.getItem("myMovieList")) || [];
        movieList.push(data);
        localStorage.setItem("myMovieList", JSON.stringify(movieList));
        showallMovies(true);

        searchContainer.removeChild(card);
        inputField.value = "";
    })

    // add styling
    card.classList.add("movie");
    poster.classList.add("poster");
    details.classList.add("details");
    title.classList.add("title");
    plot.classList.add("plot");
    btns.classList.add("btns");
    addBtn.classList.add("add");
    cancelBtn.classList.add("cancel");

    // add content
    title.innerHTML = data.Title;
    plot.innerHTML = data.Plot;
    addBtn.innerHTML = "Add";
    cancelBtn.innerHTML = "Cancel";

    // add attribute for image element
    image.setAttribute("src", data.Poster);
    image.setAttribute("alt", "Poster");

    // parent-child relationship
    btns.appendChild(addBtn);
    btns.appendChild(cancelBtn);
    details.appendChild(title);
    details.appendChild(plot);
    details.appendChild(btns);
    poster.appendChild(image);
    card.appendChild(poster);
    card.appendChild(details);
    searchContainer.appendChild(card);
}

function showallMovies(val = false){
    const movies = JSON.parse(localStorage.getItem("myMovieList")) || [];
    const moviesContainer = document.querySelector("#movies-container");

    for(let i = val ? movies.length - 1 : 0; i < movies.length; i++){
        // create required elements
        const card = document.createElement("div");
        const poster = document.createElement("div");
        const image = document.createElement("img");
        const details = document.createElement("div");
        const title = document.createElement("p");
        const plot = document.createElement("p");
        const removeBtn = document.createElement("p");

        // add event listener
        removeBtn.addEventListener("click", () => {
            moviesContainer.removeChild(card);
            let moviesList = JSON.parse(localStorage.getItem("myMovieList"));
            moviesList = moviesList.filter((movie) => movie.Title != movies[i].Title);
            localStorage.setItem("myMovieList", JSON.stringify(moviesList)); 
        })

        // add content to the above elements
        title.innerHTML = movies[i].Title;
        plot.innerHTML = movies[i].Plot;
        removeBtn.innerHTML = "Remove";

        // add attribute for img element
        image.setAttribute("src", movies[i].Poster);
        image.setAttribute("alt", "Poster");

        // add styling
        card.classList.add("movie-card");
        poster.classList.add("poster-card");
        details.classList.add("details-card");
        removeBtn.classList.add("remove-card");

        // create parent-child relationship
        details.appendChild(title);
        details.appendChild(plot);
        details.appendChild(removeBtn);
        poster.appendChild(image);
        card.appendChild(poster);
        card.appendChild(details);
        moviesContainer.appendChild(card);
    }
}

showallMovies();