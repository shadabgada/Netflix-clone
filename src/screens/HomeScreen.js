import React from 'react'
import Banner from '../Banner'
import "./HomeScreen.css"
import Nav from '../Nav'
import requests from '../Requests'
import Row from '../Row'


function HomeScreen() {
    return (
        <div className="homeScreen">

{/* nav */}
{/* banner */}
{/* row */}
            <Nav/>

            <Banner/>
    
            <Row 
            title="NETFLIX ORIGINALS"
            fetchUrl={requests.baseURL+requests.fetchNetflixOriginals}
            isLargeRow
            />
            <Row title="Trending now" fetchUrl={requests.baseURL+requests.fetchTrending}/>
            <Row title="Top rated" fetchUrl={requests.baseURL+requests.fetchTopRated}/>
            <Row title="Action movies" fetchUrl={requests.baseURL+requests.fetchActionMovies}/>
            <Row title="Comedy movies" fetchUrl={requests.baseURL+requests.fetchComedyMovies}/>
            <Row title="Horror movies" fetchUrl={requests.baseURL+requests.fetchHorrorMovies}/>
            <Row title="Romance movies" fetchUrl={requests.baseURL+requests.fetchRomanceMovies}/>
            <Row title="Documentaries" fetchUrl={requests.baseURL+requests.fetchDocumentaries}/>
            
    
        </div>
    )
}

export default HomeScreen
