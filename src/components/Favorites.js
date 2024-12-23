// Favorites.js
import React from "react";
import "./Favorites.css";

const Favorites = ({ favorites }) => {
    return (
        <div id="favorites" className="favorites">
            <h2>Favorites</h2>
            <div className="favorites-list">
                {favorites.length > 0 ? (
                    favorites.map((movie, index) => (
                        <div key={index} className="favorite-item">
                            <img src={movie.Poster} alt={movie.Title} />
                            <h3>{movie.Title}</h3>
                        </div>
                    ))
                ) : (
                    <p>No favorites added yet.</p>
                )}
            </div>
        </div>
    );
};
export default Favorites;