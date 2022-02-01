import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, AddMovie  } from "./pages.js";

function App() {
 
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetch('/api/movies') 
      .then((response) => response.json())
      .then(setMovies)
  }, []);

  if( movies == null) return null;

  return (
    <div className="App">
      <Routes>
         <Route path="/" element={<Home movies={movies} setMovies={setMovies}/>} />
         <Route path="/addmovie" element={<AddMovie movies={movies} setMovies={setMovies} />} />
      </Routes>
    </div>
  );
}

export default App;
