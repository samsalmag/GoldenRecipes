import { searchMeal } from './api.js';

const maxResults = 3; // Max number of results to show

// HTML elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultDiv = document.getElementById('result');

// For 'ENTER' press on keyboard while in inputbox
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      performSearch();
  }
});

// For 'Search' button press
searchButton.addEventListener('click', function() {
   performSearch();
});

// For 'Clear' button press
document.getElementById('search-clear').addEventListener('click', function() {
   searchInput.value = '';
});

// Performs a search with the API to retrieve recipes
function performSearch() {
   if (searchInput.value.trim() === null || searchInput.value.trim() === '') {
      return;
   }

   searchMeal(searchInput.value.trim()).then(data => {

      console.log(data.meals)

      resultDiv.innerHTML = '';
      const resultHeader = document.createElement('h1');
      resultDiv.appendChild(resultHeader);

      if(data.meals === null) {
         resultHeader.textContent = 'No recipes found. Try a new search with different keywords!'
         return;
      }
      resultHeader.textContent = 'Results'

      // If less than 3 recipe results exist
      const nFoundRecipes = Math.min(data.meals.length, maxResults);
      const uniqueIndexes = getUniqueRandomIntegers(0, data.meals.length - 1, nFoundRecipes);
      console.log(uniqueIndexes)

      for(let i = 0; i < nFoundRecipes; i++) {
         const meal = data.meals[uniqueIndexes[i]];

         const mealTitle = document.createElement('h2');
         mealTitle.id = 'meal-title';
         mealTitle.textContent = meal.strMeal;
         resultDiv.appendChild(mealTitle);

         const mealImage = document.createElement('img');
         mealImage.id = 'meal-img';
         mealImage.src = meal.strMealThumb;
         mealImage.alt = meal.strMeal;
         resultDiv.appendChild(mealImage);

         const mealInstructions = document.createElement('p');
         mealInstructions.id = 'meal-instructions';
         mealInstructions.textContent = meal.strInstructions;
         resultDiv.appendChild(mealInstructions);

         
      }
   });
}

// Get one single random integer within a range of 'min' to 'max'
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
 }

 // Get 'count' amount of unique random integers within a range of 'min' to 'max'
 function getUniqueRandomIntegers(min, max, count) {
   if (count > (max - min + 1)) {
      throw new Error('Count must be less than or equal to the range size');
   }

   const uniqueIntegers = new Set();
   while (uniqueIntegers.size < count) {
     uniqueIntegers.add(getRandomInt(min, max));
   }
 
   return Array.from(uniqueIntegers);
 }