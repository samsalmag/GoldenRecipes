import { getRandomMeal } from './api.js';

getRandomMeal().then(data => {
   let meal = data.meals[0];

   const mealTitle = document.getElementById('meal-title');
   mealTitle.textContent = meal.strMeal;

   const mealImg = document.getElementById('meal-img');
   mealImg.src = meal.strMealThumb;
   mealImg.alt = meal.strMeal;
});
