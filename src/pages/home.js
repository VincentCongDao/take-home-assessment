import Filter from "../components/filter";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import Pagination from "../components/pagination";
const Home = ({
  recipes,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  searchTag,
  setSearchTag,
  filteredRecipes,
  removeTag,
  addTag,
  selectedTags,
  totalTimeFilter,
  setTotalTimeFilter,
  removeMealType,
  addMealType,
  selectedMealTypes,
  setSelectedMealTypes,
  searchMealType,
  setSearchMealType,
  setSelectedTags,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const recipePerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(filteredRecipes.length / recipePerPage);

  // Get current recipes
  const indexOfLastRecipe = currentPage * recipePerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // State for managing filter visibility
  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div>
      <h1 className="title">Recipe Book</h1>
      <div className="recipe-filter-shortcut">
        {isFilterVisible ? (
          <div onClick={toggleFilterVisibility} className="recipe-filter-close">
            <ClearIcon />
            <p>Close Filter</p>
          </div>
        ) : (
          <div onClick={toggleFilterVisibility} className="recipe-filter-close">
            <FilterListIcon />
            <p>Filter</p>
          </div>
        )}
        <div className="recipe-search">
          {isFilterVisible ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="Search for recipes.."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-class"
            />
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          paginate={paginate}
          className="recipe-pagination"
        />
      </div>
      <div className={`recipe-wrapper`}>
        {isFilterVisible && (
          <Filter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filter={filter}
            setFilter={setFilter}
            searchTag={searchTag}
            setSearchTag={setSearchTag}
            addTag={addTag}
            removeTag={removeTag}
            selectedTags={selectedTags}
            recipes={recipes}
            totalTimeFilter={totalTimeFilter}
            setTotalTimeFilter={setTotalTimeFilter}
            removeMealType={removeMealType}
            addMealType={addMealType}
            selectedMealTypes={selectedMealTypes}
            setSelectedMealTypes={setSelectedMealTypes}
            searchMealType={searchMealType}
            setSearchMealType={setSearchMealType}
            setSelectedTags={setSelectedTags}
            toggleFilterVisibility={toggleFilterVisibility}
            isFilterVisible={isFilterVisible}
          />
        )}
        <div
          className="recipes-container"
          style={{
            marginLeft: isFilterVisible ? "50px" : "auto",
            justifyContent: isFilterVisible ? "start" : "center",
          }}
        >
          {currentRecipes.map((recipe) => (
            <Link
              key={recipe.id}
              className="recipe-card-container"
              to={`/recipes/${recipe.id}`}
            >
              <div className="recipe-image-container">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-image"
                />
              </div>
              <div className="recipe-info-container">
                <p>{recipe.name}</p>
                <p>{recipe.difficulty}</p>
                <Rating value={recipe.rating} readOnly size="small" />
              </div>
              <div className="recipe-cooking-container">
                <p>
                  Prep Time:{" "}
                  <span className="recipe-time">
                    {recipe.prepTimeMinutes} minutes
                  </span>
                </p>
                <p>
                  Cook Time:{" "}
                  <span className="recipe-time">
                    {recipe.cookTimeMinutes} minutes
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="recipe-footer">
        <Pagination totalPages={totalPages} paginate={paginate} />
      </div>
    </div>
  );
};

export default Home;
