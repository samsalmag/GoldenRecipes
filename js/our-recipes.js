import { searchMeal } from './api.js';
import { getUniqueRandomIntegers } from './random.js';

const maxResults = 3; // Max number of results to show

// HTML elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultDiv = document.getElementById('result');

// 'ENTER' press on keyboard while in inputbox
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      performSearch();
  }
});

// 'Search' button press
searchButton.addEventListener('click', function() {
   performSearch();
});

// 'Clear' button press
document.getElementById('search-clear').addEventListener('click', function() {
   searchInput.value = '';
});

// Performs a search with the API to retrieve recipes
function performSearch() {
   // Do not perform a search if input is empty
   if (searchInput.value.trim() === null || searchInput.value.trim() === '') {
      return;
   }

   // Search a meal in the API and work with the returned data...
   searchMeal(searchInput.value.trim()).then(data => {

      // Remove previous results
      resultDiv.innerHTML = '';
      const resultHeader = document.createElement('h1');
      resultDiv.appendChild(resultHeader);  // Add back the 'Results' text

      // If no meals were found, exit the function. Also set 'Results' text
      if(data.meals === null) {
         resultHeader.textContent = 'No recipes found. Try a new search with different keywords!'
         return;
      }
      resultHeader.textContent = 'Results'

      const nFoundRecipes = Math.min(data.meals.length, maxResults); // In case less than 3 recipes were returned
      const uniqueIndexes = getUniqueRandomIntegers(0, data.meals.length - 1, nFoundRecipes);  // Get unique indexes so duplicate recipes are avoided on each search result

      // For each meal recipe found...
      for(let i = 0; i < nFoundRecipes; i++) {
         const meal = data.meals[uniqueIndexes[i]];

         // Add all elements to the results div
         addMealTitle(meal);
         addMealImage(meal);
         addMealInstructions(meal);
      }
   });
}

// ADD MEAL TITLE TO RESULTS DIV
function addMealTitle(meal) {
   const mealTitle = document.createElement('h2');
   mealTitle.id = 'meal-title';
   mealTitle.textContent = meal.strMeal;
   resultDiv.appendChild(mealTitle);
}

// ADD MEAL IMAGE TO RESULTS DIV
function addMealImage(meal) {
   const mealImage = document.createElement('img');
   mealImage.id = 'meal-img';
   mealImage.src = meal.strMealThumb;
   mealImage.alt = meal.strMeal;
   resultDiv.appendChild(mealImage);
}

// ADD MEAL INSTRUCTIONS TO RESULTS DIV
function addMealInstructions(meal) {
   const mealInstructions = document.createElement('p');
   mealInstructions.id = 'meal-instructions';
   mealInstructions.textContent = meal.strInstructions;
   resultDiv.appendChild(mealInstructions);
}
