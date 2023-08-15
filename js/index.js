import { getRandomMeal } from './api.js';

// Get a random meal from the API and work with the returned data...
getRandomMeal().then(data => {
   // SET MEAL TITLE
   const mealTitle = document.getElementById('meal-title');
   mealTitle.textContent = data.strMeal;

   // SET MEAL IMAGE
   const mealImg = document.getElementById('meal-img');
   mealImg.src = data.strMealThumb;
   mealImg.alt = data.strMeal;

   // SET MEAL INSTRUCTIONS
   const mealInstructions = document.getElementById('meal-instructions');
   mealInstructions.textContent = data.strInstructions;
});
