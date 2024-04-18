import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom'

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
                const data = await response.json();
                setCharacters(data.results);
                setTotalPages(data.info.pages);
                console.log(characters)
            } catch (error) {
                console.error("Error fetching character data", error);
            }
        };

        fetchCharacters();
    }, [currentPage]);


    const handlePrevPage = () => {
        setCurrentPage(Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(currentPage + 1, totalPages));
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };
    
    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    return (
        <div>
            <h2 className="mainH2">Rick and Morty Characters</h2>
            <div className="card-container" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {characters.map((character, index) => (
                    <Link to={`/characterdetailspage/${character.id}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card key={index} style={{ margin: "2rem", width: "302px", height: "366px" }}>
                    <CardImg top src={character.image} alt={character.name} style={{ width: "300px", height: "300px" }} />
                        {/* <CardImg top src={character.image} alt={character.name} style={{width: "300px !important"}} width="300px"/> */}
                        <CardBody>
                            <CardTitle>{character.name}</CardTitle>
                        </CardBody>
                    </Card>
                    </Link>
                ))}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '20px'}}>
                <span onClick={handleFirstPage} style={{padding: "5px", width: "80px", color: "#08BAE3", cursor: "pointer"}}>First</span>
                <button onClick={handlePrevPage} disabled={currentPage === 1} style={{padding: "5px", width: "120px", margin: "0 5px"}}>Previous Page</button>
                <div style={{color: 'gray', width: '120px', padding: '5px' }}><span>Page {currentPage} of {totalPages}</span></div>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} style={{padding: "5px", width: "120px", margin: "0 5px"}}>Next Page</button>
                <span onClick={handleLastPage} style={{padding: "5px", width: "80px", margin: "0 5px", color: "#08BAE3", cursor: "pointer"}}>Last</span>
            </div>
        </div>
    );
};

export default Characters;
