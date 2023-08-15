// Get one single random integer within a range of 'min' to 'max'
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

 // Get 'count' amount of unique random integers within a range of 'min' to 'max'
 export function getUniqueRandomIntegers(min, max, count) {
   if (count > (max - min + 1)) {
      throw new Error('Count must be less than or equal to the range size');
   }

   const uniqueIntegers = new Set();  // Only unique items are allowed in a Set
   while (uniqueIntegers.size < count) {
     uniqueIntegers.add(getRandomInt(min, max));
   }
 
   return Array.from(uniqueIntegers);
}
