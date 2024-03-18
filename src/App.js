import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import RecipePage from "./pages/recipe";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [searchMealType, setSearchMealType] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);
  const [totalTimeFilter, setTotalTimeFilter] = useState("All");
  useEffect(() => {
    async function fetchRecipes() {
      //     Fetching the API
      const response = await fetch("https://dummyjson.com/recipes");
      const data = await response.json();
      setRecipes(data.recipes);
    }

    fetchRecipes();
  }, [selectedTags, selectedMealTypes, totalTimeFilter]);

  // add tag from the select
  const addTag = (tag) => {
    setSelectedTags((prevTags) => {
      return Array.from(new Set([...prevTags, tag]));
    });
  };

  // remove tag from the select
  const removeTag = (tagToRemove) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };
  // add meals type from the select
  const addMealType = (tag) => {
    setSelectedMealTypes((prevTags) => {
      return Array.from(new Set([...prevTags, tag]));
    });
  };

  // remove meals type from the select
  const removeMealType = (tagToRemove) => {
    setSelectedMealTypes((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };
  const filteredRecipes = recipes.filter((recipe) => {
    //   All search and results will be in lowercase
    const matchesSearchTerm = recipe.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "All" || recipe.difficulty === filter;
    const matchesMealType =
      selectedMealTypes.length === 0 ||
      selectedMealTypes.some((type) => recipe.mealType.includes(type));

    // The tags will be OR, in the previous version, I tried to create AND functions. It will not works due to
    //   Not matching with the specific tags of the content
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => recipe.tags.includes(tag));
    // Total time in minutes for the recipe
    const recipeTotalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

    // Determine if the recipe's total time matches the selected time filter
    const matchesTotalTime =
      totalTimeFilter === "All" ||
      (totalTimeFilter === "Less than 15 minutes" && recipeTotalTime < 15) ||
      (totalTimeFilter === "15-30 minutes" &&
        recipeTotalTime >= 15 &&
        recipeTotalTime <= 30) ||
      (totalTimeFilter === "More than 30 minutes" && recipeTotalTime > 30);

    return (
      matchesSearchTerm &&
      matchesFilter &&
      matchesTags &&
      matchesTotalTime &&
      matchesMealType
    );
  });
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              recipes={recipes}
              filteredRecipes={filteredRecipes}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filter={filter}
              setFilter={setFilter}
              searchTag={searchTag}
              setSearchTag={setSearchTag}
              removeTag={removeTag}
              addTag={addTag}
              selectedTags={selectedTags}
              totalTimeFilter={totalTimeFilter}
              setTotalTimeFilter={setTotalTimeFilter}
              selectedMealTypes={selectedMealTypes}
              setSelectedMealTypes={setSelectedMealTypes}
              addMealType={addMealType}
              removeMealType={removeMealType}
              searchMealType={searchMealType}
              setSearchMealType={setSearchMealType}
              setSelectedTags={setSelectedTags}
            />
          }
        />
        <Route
          path="/recipes/:id"
          element={
            <RecipePage
              searchTerm={searchTerm}
              filter={filter}
              setFilter={setFilter}
              setSearchTerm={setSearchTerm}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
