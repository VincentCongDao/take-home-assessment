// RecipePage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/backbutton";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`https://dummyjson.com/recipes/${id}`);
      const data = await response.json();
      setRecipe(data);
      // Initialize the checkedIngredients state here after data is fetched
      setCheckedIngredients(
        data.ingredients.reduce((acc, ingredient) => {
          acc[ingredient] = false;
          return acc;
        }, {})
      );
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Handler to toggle the checked status
  const handleCheckboxChange = (ingredient) => {
    setCheckedIngredients((prevState) => ({
      ...prevState,
      [ingredient]: !prevState[ingredient],
    }));
  };

  return (
    <>
      <div>
        <BackButton />
      </div>
      <div className="info-wrapper">
        <div className="info-image-container">
          <img src={recipe.image} alt={recipe.name} width={400} height={400} />
        </div>
        <div className="info-body">
          <h2>{recipe.name}</h2>
          <div className="info-tag-container">
            {recipe.tags.map((tag, i) => (
              <div key={i} className="info-tag">
                {tag}
              </div>
            ))}
          </div>
          <div className="info-serve">
            <p>
              Servings for {recipe.servings} | Total Calories:{" "}
              {recipe.caloriesPerServing * recipe.servings} calories
            </p>
          </div>
          <div className="info-content">
            <div className="info-ingredient">
              <h4>Requirement Ingredients</h4>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      checked={checkedIngredients[ingredient] || false}
                      onChange={() => handleCheckboxChange(ingredient)}
                    />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <h4>Instructions</h4>
            <div className="info-time-container">
              <p>Prep Times: {recipe.prepTimeMinutes} minutes</p>
              <p>Prep Times: {recipe.cookTimeMinutes} minutes</p>
            </div>
            <div className="info-instructions-container">
              <ul>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipePage;
