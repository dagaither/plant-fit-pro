import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, Button } from 'reactstrap';

const Recipes = () => {
    const [recipe, setRecipe] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [forceRender, setForceRender] = useState(false)
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Token ${token}`
        }
    };

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/recipe/', config);
                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipes', error);
            }
        };
        fetchRecipes();
    }, [forceRender]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/recipe/favorite/', config);
                setFavoriteRecipes(response.data.map(item => item.dish.id));
            } catch (error) {
                console.error('Error fetching favorites', error);
            }
        };
        fetchFavorites();
    }, [forceRender]);

    const handleGenerateNewRecipe = () => {
        setForceRender(!forceRender);
    }

    const handleSubmit = async () => {
        try {
            if (favoriteRecipes.includes(recipe.id)) {
                const response = await axios.delete(`http://127.0.0.1:8000/api/v1/recipe/favorite/del/${recipe.id}/`, config);
                setSuccessMessage(response.data);
                // Remove the recipe from favoriteRecipes state
                setFavoriteRecipes(prevState => prevState.filter(id => id !== recipe.id));
            } else {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/recipe/favorite/add/${recipe.id}/`, config);
                setSuccessMessage(response.data);
                // Add the recipe to favoriteRecipes state
                setFavoriteRecipes(prevState => [...prevState, recipe.id]);
            }
        } catch (error) {
            console.error('Error updating favorites', error.response);
            setErrorMessage('Failed to update favorites');
        }
    };

    return (
        <div>
            {recipe && (
                <div>
                    <h2 className="mainH2">{recipe.title}</h2>
                    <div className="card-container" style={{ marginTop: "2rem", width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Card style={{ margin: "2rem", width: "600px" }}>
                            <CardImg top src={recipe.image} alt={recipe.title} />
                            <CardBody>
                                <CardTitle style={{ marginTop: "15px", fontFamily: "Courier New" }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <span><h2>{recipe.title}</h2></span><br />
                                        <span>{recipe.description}</span><br />
                                        <div style={{ textAlign: "left" }}>
                                            <span style={{ fontWeight: "bold" }}>Ingredients:</span><br />
                                            <ul>
                                                {recipe.ingredients.map((ingredient, index) => (
                                                    <li key={index}>{ingredient}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div style={{ textAlign: "left" }}>
                                            <span style={{ fontWeight: "bold" }}>Method:</span><br />
                                            <ol>
                                                {recipe.method.map((step, index) => (
                                                    <li key={index}>{Object.values(step)[0]}</li>
                                                ))}
                                            </ol>
                                        </div>
                                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                                        <Button className="recipeButton" onClick={handleSubmit} style={{ marginBottom: "10px" }}>
                                            {favoriteRecipes.includes(recipe.id) ? 'Remove From Favorites' : 'Add To Favorites'}
                                        </Button>
                                        <Button className="recipeButton" onClick={() => {
                                            handleGenerateNewRecipe();
                                            window.scrollTo(0, 0);
                                            setSuccessMessage("");
                                            setErrorMessage("");
                                            }}
                                        >
                                            Generate New Recipe
                                        </Button>
                                    </div>
                                </CardTitle>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Recipes;
