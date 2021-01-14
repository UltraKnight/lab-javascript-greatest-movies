// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(movies) {
    return movies.map(movie => movie.director);
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
//How could you "clean" a bit this array and make it unified (without duplicates)?
const cleanDouble = doubleArr => [... new Set(doubleArr)]; //... -> spread operator

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
const howManyMovies = (movies) => {
    if(movies.length === 0)
        return 0;

    return movies.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes("Drama")).length;
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals
const ratesAverage = movies => {
    if(! movies.length) // if (movies.length === 0)
        return 0;
        
    let filtered = movies.filter(movie => movie.rate >= 0);

    let avg = filtered.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0)/movies.length
    return parseFloat(avg.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
const dramaMoviesRate = movies => {
    let dramas = movies.filter(movie => movie.genre.includes("Drama"));

    if(dramas.length === 0)
        return 0;

    return ratesAverage(dramas);
    /* let filtered = dramas.filter(movie => movie.rate >= 0);
    let avg = filtered.reduce((accumulator, currentValue) => accumulator + currentValue.rate, 0)/dramas.length;
    return parseFloat(avg.toFixed(2));; */
};

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
const orderByYear = movies => {

    let orderedMovies = movies.slice(0).sort((movie1, movie2) => {
        if(movie1.year === movie2.year) {
            return movie1.title.localeCompare(movie2.title); //localeCompare to compare strings inside objects
        } else {
            return movie1.year - movie2.year;
        }
        }); //instead of slice map can be used -> .map(item => item);
    return orderedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
const orderAlphabetically = movies => {
    //let moviesCopy = [...movies];
    //sort by title and get only the first 20 ones
    let orderedMovies = movies.slice(0).sort((movie1, movie2) => movie1.title.localeCompare(movie2.title)).slice(0,20);
    return orderedMovies.map(movie => movie.title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
const turnHoursToMinutes = (movies) => {
    let timeString = [];
    let convertedHours = 0;
    let min = 0;

    let moviesReadable = movies.map(object => ({ ...object })) //copy without reference

     for (let i = 0; i < moviesReadable.length; i++) {
        convertedHours = 0;
        min = 0;
        if(typeof moviesReadable[i].duration === 'string') { //if this movie has a valid duration
            timeString = moviesReadable[i].duration.split(' ');
        } else {
            timeString = ['0'];
        }

        if(timeString.length > 1) {
            timeString.forEach(time => time.replace(/[^0-9] /g, '')); //remove duration letters
            convertedHours = parseInt(timeString[0]) * 60; //hours to integer minutes
            min = parseInt(timeString[1]); //mins to integer
        } else if(timeString.length === 1) {
            if(timeString[0].endsWith('min')) { //verify if the duration has less than one hour
                timeString.forEach(time => time.replace(/[^0-9] /g, ''));
                min = parseInt(timeString[0]);
            } else { //duration is full hour
                timeString.forEach(time => time.replace(/[^0-9] /g, ''));
                convertedHours = parseInt(timeString[0]) * 60;
            }
        }

        moviesReadable[i].duration = convertedHours + min; //change the duration value of the object inside the array
    }
    return moviesReadable;
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average
