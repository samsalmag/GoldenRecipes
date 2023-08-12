import { getRandomMeal } from './api.js';

getRandomMeal().then(data => {
   console.log(data);

   // MEAL TITLE
   const mealTitle = document.getElementById('meal-title');
   mealTitle.textContent = data.strMeal;

   // MEAL IMAGE
   const mealImg = document.getElementById('meal-img');
   mealImg.src = data.strMealThumb;
   mealImg.alt = data.strMeal;

   // MEAL INSTRUCTIONS
   const mealInstructions = document.getElementById('meal-instructions');
   mealInstructions.textContent = data.strInstructions;
});
