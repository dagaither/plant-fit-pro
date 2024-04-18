import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import { useParams } from 'react-router-dom';

const CharacterDetailsPage = () => {
    const [character, setCharacter] = useState("");
    const { id } = useParams();
    
    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                const data = await response.json();
                setCharacter(data);
                console.log(character)
            } catch (error) {
                console.error("Error fetching character data", error);
            }
        };

        fetchCharacter();
    }, [id]); // Include id in the dependency array to re-run effect when id changes

    if (!character) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className="mainH2">Character Details</h2>
            <div className="card-container" style={{ marginTop: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Card style={{ margin: "2rem", width: "500px"}}>
                    <CardImg top src={character.image} alt={character.name} />
                    <CardBody>
                        <CardTitle style={{marginTop: "15px", fontFamily: "Courier New", fontWeight: "bold"}}>
                            <div style={{display: "flex", flexDirection: "column"}}>
                              <span>Name: {character.name}</span>
                              <span>Species: {character.species}</span>
                              <span>Location: {character.location.name}</span>
                              <span>Status: {character.status}</span>
                            </div>
                        </CardTitle>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default CharacterDetailsPage;

