import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Token ${token}`
        }
    };

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/v1/recipe/favorite/', config);
                setFavoriteRecipes(response.data);
                console.log(favoriteRecipes)
            } catch (error) {
                console.error('Error fetching favorites', error);
            }
        };
        fetchFavorites();
    }, []);

    const removeRecipeFromFavorites = async (recipeId) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/v1/recipe/favorite/del/${recipeId}/`, config);
            setFavoriteRecipes(favoriteRecipes.filter(recipe => recipe.dish.id !== recipeId));
        } catch (error) {
            console.error('Error removing recipe from favorites', error);
        }
    };

    return (
        <div>
            <h2 className="mainH2">Favorites</h2>
            <div className="card-container" style={{ marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {favoriteRecipes.map(recipe => (
                    <RecipeCard
                        id={recipe.dish.id}
                        title={recipe.dish.title}
                        image={recipe.dish.image}
                        key={recipe.dish.id}
                        removeFromFavorites={removeRecipeFromFavorites}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
