import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'


export function Home({movies, setMovies}) {
    return (
        <>
        {/* { movies.map( movie => { return <Home movie={movie} setMovies={setMovies}></Home>}) } */}
        <div className="home">
            <h1 className="pt-5 text-center">Movie Reviews</h1>
            <div className="p-3 fs-3 text-center">
                <nav id="nav" >
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
        <div className="text-left">
            <Container className="mb-5 border border-dark">
            {movies.map( (movies, i) => { 
                console.log(movies);
                return (
                    <>
                    <Row className="mt-5 mb-5 text-left">
                        <Col>
                        <img className="float-end" src={movies.poster} width="50%" />
                        </Col>
                        <Col className="text-left">
                            <h2>{movies.name}</h2>
                            <div className="fs-5">
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
                        </Col>
                    </Row>
                    {/* <p>{JSON.stringify(movies)}</p> */}
                    </>
                )}
            )}
            </Container>
        </div>
    )
}
  
export function AddMovie({movies, setMovies}) {
return (
    <>
    <Container>
        <Col>
            <Row className="pt-5 text-center">
                <h2 >Add Movie!</h2>
            </Row>
            <Row className="p-3 fs-3 text-center">
                <nav  id="nav">
                    <Link to="/" style={{color: "black", textDecoration: "none", padding: "5px"}}>Home </Link>
                </nav>  
            </Row>
            <Row className="justify-content-md-center">
                <Form onNewMovie = { ( name, poster, actors, date, rating ) => {
                const newMovies = [ ...movies, { name, poster, actors, date, rating } ];
                setMovies(newMovies);
                }}
                />
            </Row>
        </Col>
    </Container>
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
        <Container className="justify-content-md-center">
        <div className="pl-5 text-left">
            <Col>
            </Col>
            <Col md={{ span: 7, offset: 3 }} className="border border-dark" >
            <form className="form" onSubmit={submit}>
                <Row className="p-2"> 
                <div >
                    <label htmlFor="name" className="p-2">Name: </label>
                    <input value={name} onChange = {evt => setName(evt.target.value)} type="text" name="name" required />
                </div>
                </Row>
                <Row className="p-2">
                <div>
                    <label htmlFor="image" className="p-2">Poster: </label>
                    <input onChange = {evt => onFileChange(evt)} type="file" name="poster" accept=".png, .jfif, .jpg, .jpeg" required />
                </div>
                </Row>
                <Row className="p-2">
                <div>
                    <label htmlFor="actors" className="p-2">Actors: </label>
                    <input value={actors} onChange = {evt => setActors(evt.target.value)} type="text" name="actors" required />
                </div>
                </Row>
                <Row className="p-2">
                <div>
                    <label htmlFor="date" className="p-2">Release Date: </label>
                    <input value={date} onChange = {evt => setDate(evt.target.value)} type="date" name="date" required />
                </div>
                </Row>
                <Row className="p-2">
                <div>
                    <label htmlFor="rating" className="p-2">Rating: </label>
                    <select value={rating}onChange = {evt => setRating(evt.target.value)} name="rating" required >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                </Row>
                <Row className="p-2">
                <div>
                    <button className="submitButton" type="submit" value="Submit">Add Review</button>
                </div>
                </Row>
            </form>
            </Col>
            <Col>
            </Col>
        </div>
        </Container>
        </>
      );
}
