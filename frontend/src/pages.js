import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

export function Home({movies, setMovies}) {
    return (
        <>
        {/* { movies.map( movie => { return <Home movie={movie} setMovies={setMovies}></Home>}) } */}
        <div className="home">
            <h1>Movie Reviews</h1>
            <div className="nav">
                <nav  >
                    <Link to="addmovie" style={{color: "black", textDecoration: "none", padding: "5px"}}> Add Rating</Link>
                </nav>  
            </div>
            <Display movies={movies}
                onRemove = {
                    movieName => {
                        const newMovies = movies.filter(movie => movie.name !== movieName);
                        setMovies(newMovies);
                    }
                } />
        </div>
        </>
    );
}

export function Display({movies, onRemove = f => f}) {
    return (
        <div className="displayMovies">
            {movies.map( (movies, i) => { 
                console.log(movies);
                return (
                    <>
                    <h2>{movies.name}</h2>
                    <div className="row">
                    <img className="moviePoster" id="column" src={movies.poster} width="50%" height="50%" />
                    <div className="moveInfo" id="column">
                    <p>Actors: {movies.actors.map(( actor, i) => {
                        if ( i + 1 == movies.actors.length ) {
                            return `${actor}` 
                        }
                        else {
                            return `${actor}, ` }
                        })}</p>
                    <p>Date: {movies.date}</p>
                    <p>Rating: {movies.rating}</p>   
                    <button onClick={() => onRemove(movies.name)}>Remove</button>
                    </div>
                    </div>
                    {/* <p>{JSON.stringify(movies)}</p> */}
                    </>
                )}
            )}
        </div>
    )
}
  
export function AddMovie({movies, setMovies}) {
return (
    <>
    <h2>Add Movie!</h2>
    <div className="nav">
        <nav  >
            <Link to="/" style={{color: "black", textDecoration: "none", padding: "5px"}}>Home </Link>
        </nav>  
      </div>
    <Form onNewMovie = { ( name, poster, actors, date, rating ) => {
        const newMovies = [ ...movies, { name, poster, actors, date, rating } ];
        setMovies(newMovies);
        }}
    />
    </>
 );
}

export function Form({onNewMovie }) {
    const [name, setName] = useState("");
    const [poster, setPoster] = useState("");
    const [actors, setActors] = useState("");
    const [date, setDate] = useState([]);
    const [rating, setRating] = useState(0);
    const onFileChange = evt => {
        let file = evt.target.files[0];
        setPoster(URL.createObjectURL(file));
    }
    const navToHome = useNavigate();
    const submit = evt => {
        evt.preventDefault();
        onNewMovie(name, poster, actors.split(", "), date, rating);
        setName("");
        setDate(null);
        setActors([]);
        setPoster("");
        setRating(0);
        navToHome("/");
    }

    return (
        <>
        <div className="formDiv">
            <form className="form" onSubmit={submit}>
                <div className="name">
                    <label htmlFor="name">Name: </label>
                    <input value={name} onChange = {evt => setName(evt.target.value)} type="text" name="name" required />
                </div>
                <div className="poster">
                    <label htmlFor="image">Poster: </label>
                    <input onChange = {evt => onFileChange(evt)} type="file" name="poster" accept=".png, .jfif, .jpg, .jpeg" required />
                </div>
                <div className="actors">
                    <label htmlFor="actors">Actors: </label>
                    <input value={actors} onChange = {evt => setActors(evt.target.value)} type="text" name="actors" required />
                </div>
                <div className="date">
                    <label htmlFor="date">Release Date: </label>
                    <input value={date} onChange = {evt => setDate(evt.target.value)} type="date" name="date" required />
                </div>
                <div className="rating">
                    <label htmlFor="rating">Rating: </label>
                    <select value={rating}onChange = {evt => setRating(evt.target.value)} name="rating" required >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div>
                    <button className="submitButton" type="submit" value="Submit">Add Review</button>
                </div>
            </form>
        </div>
        </>
      );
}
