export function searchMeal(searchTerm) {
   const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

   return fetch(url)
      .then(response => response.json())
      .catch(err => console.error(err));
}

export function getRandomMeal() {
   const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

   return fetch(url)
      .then(response => response.json())
      .then(data => data.meals[0])
      .catch(err => console.error(err));
}
