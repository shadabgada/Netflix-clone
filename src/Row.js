import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Row.css"

function Row({title, fetchUrl, isLargeRow = false}) {

    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData()
    }, [])

    console.log(fetchUrl)
    console.log(movies)
    return (    
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(movie =>(
                    <div>

                    <img 
                    className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                    key={movie.id}
                    src={`${base_url}${
                        isLargeRow?movie.poster_path:movie.backdrop_path
                    }`} alt={movie.name}/>
                    <h5>{movie.title?movie.title:movie.name?movie.name:"NA"}</h5>

                    <p>{movie.release_date?movie.release_date:movie.first_air_date?movie.first_air_date:"NA"}</p>
                    
                    <p>&#9733; {movie.vote_average}/10 ({movie.vote_count})</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Row;
