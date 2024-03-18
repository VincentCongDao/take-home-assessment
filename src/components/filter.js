import AutocompleteInput from "./autocompleteinput";
import CachedIcon from "@mui/icons-material/Cached";
import ClearIcon from "@mui/icons-material/Clear";
const Filter = ({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  searchTag,
  setSearchTag,
  recipes,
  addTag,
  removeTag,
  selectedTags,
  totalTimeFilter,
  setTotalTimeFilter,
  removeMealType,
  addMealType,
  selectedMealTypes,
  searchMealType,
  setSearchMealType,
  setSelectedMealTypes,
  setSelectedTags,
  toggleFilterVisibility,
  isFilterVisible,
}) => {
  const handleTagChange = (tag) => {
    setSearchTag(tag);
  };
  const handleMealTypeChange = (type) => {
    setSearchMealType(type);
  };
  const resetFilters = () => {
    setSearchTerm("");
    setSearchTag("");
    setSearchMealType("");
    setFilter("All");
    setTotalTimeFilter("All");
    setSelectedTags([]);
    setSelectedMealTypes([]);
  };

  // If the tags or mealtypes have duplication will remove
  // Shows only the one new object into the search
  const allTags = recipes
    ? [...new Set(recipes.flatMap((recipe) => recipe.tags || []))]
    : [];

  const allMealTypes = recipes
    ? [...new Set(recipes.flatMap((recipe) => recipe.mealType))]
    : [];
  return (
    <div className="recipe-filter-wrapper">
      <div
        className={`recipe-filter-container ${!isFilterVisible ? "hide" : ""}`}
      >
        <div className="top-filter">
          <CachedIcon onClick={resetFilters} />
          <ClearIcon onClick={toggleFilterVisibility} />
        </div>
        <div className="break-container" />
        <input
          type="text"
          placeholder="Search for recipes.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-class"
        />
        <div className="break-container" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select-class"
        >
          <option value="All">Select By Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <div className="break-container" />
        <AutocompleteInput
          options={allTags}
          value={searchTag}
          onChange={handleTagChange}
          addTag={addTag}
          removeTag={removeTag}
          selectedTags={selectedTags}
          placeholder="Specific Meal..."
        />
        <div className="break-container" />
        <AutocompleteInput
          placeholder="Dinner...Lunch..."
          options={allMealTypes}
          value={searchMealType}
          onChange={handleMealTypeChange}
          addTag={addMealType}
          removeTag={removeMealType}
          selectedTags={selectedMealTypes}
        />
        <div className="break-container" />
        <select
          value={totalTimeFilter}
          onChange={(e) => setTotalTimeFilter(e.target.value)}
          className="select-class"
        >
          <option value="All">Total Time</option>
          <option value="Less than 15 minutes">Less than 15 minutes</option>
          <option value="15-30 minutes">15-30 minutes</option>
          <option value="More than 30 minutes">More than 30 minutes</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
