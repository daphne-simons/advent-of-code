// Description of problem:

// For example:

// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3

// Maybe the lists are only off by a small amount! To find out, pair up the numbers and measure how far apart they are. Pair up the smallest number in the left list with the smallest number in the right list, then the second-smallest left number with the second-smallest right number, and so on.

// Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances. For example, if you pair up a 3 from the left list with a 7 from the right list, the distance apart is 4; if you pair up a 9 with a 3, the distance apart is 6.

// In the example list above, the pairs and distances would be as follows:

// The smallest number in the left list is 1, and the smallest number in the right list is 3. The distance between them is 2.
// The second-smallest number in the left list is 2, and the second-smallest number in the right list is another 3. The distance between them is 1.
// The third-smallest number in both lists is 3, so the distance between them is 0.
// The next numbers to pair up are 3 and 4, a distance of 1.
// The fifth-smallest numbers in each list are 3 and 5, a distance of 2.
// Finally, the largest number in the left list is 4, while the largest number in the right list is 9; these are a distance 5 apart.
// To find the total distance between the left list and the right list, add up the distances between all of the pairs you found. In the example above, this is 2 + 1 + 0 + 1 + 2 + 5, a total distance of 11!

// Your actual left and right lists contain many location IDs. What is the total distance between your lists?

// JOBS:

// 0. Put text data into two arrays.
// -- this is an example of the text data:
// 12823   12823
// 74540   88907
// 37687   50218
// 83750   57255
// 43380   59171
// 25542   37895
// 82191   69869
// 1. Sort both arrays of numbers from smallest to largest.
// 2. Loop through left array and compare with right array.
// -- if the leftArr[i] is less than or equal to the rightArr[i],
// -- then calculate their distance (minus) and push this distance into a new array.
// 4. This newArray will be added up to get the total distance.

const fs = require('fs')
const path = require('path')
// Set up a package.json and have a "type: module" set up.
// This will allow me to use the ES6 modules.
// import fs from 'node:fs'
// import path from 'node:path'

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const inputArr = input.split(/\r?\n/)

const leftArr = []
const rightArr = []

for (let i = 0; i < inputArr.length; i++) {
  const [left, right] = inputArr[i].split('   ')
  leftArr.push(left)
  rightArr.push(right)
}

leftArr.sort((a, b) => a - b)
rightArr.sort((a, b) => a - b)
// console.log('L', leftArr, 'R', rightArr)

const distanceArr = []

for (let i = 0; i < leftArr.length; i++) {
  const left = leftArr[i]
  const right = rightArr[i]
  const distance = Math.abs(left - right) // returns the absolute value of a number.
  distanceArr.push(distance)
  // console.log(`${left} - ${right} = ${distance}`)
}

const totalDistance = distanceArr.reduce((a, b) => a + b, 0)
console.log('Total Distance:', totalDistance)

// Total Distance: 3714264

//  ------ NOTES / LEARNINGS: -----

// I think this algorithm is O(n) ... would that be right?

// No! The .sort() method from javascript is actually O(log n log)
// Breakdown of overall Time Complexity:
// - Step 1 (Reading and splitting input): O(n) (where n is the number of characters in the file).
// - Step 2 (Splitting lines into left and right): O(m) (where m is the number of lines).
// - Step 3 (Sorting left and right arrays): O(m log m).
// - Step 4 (Calculating distances): O(m).
// - Step 5 (Reducing distances to a total): O(m).
// - The most computationally expensive step is sorting, which is O(m log m). Therefore, the overall complexity of this algorithm is:

// Final Time Complexity: O(m log m)

// The surrent solution is fine for my dataset,
// but if I had a larger dataset, I would need to find a way to optimize the algorithm.
//  If i wanted to explore more efficient sorting algorithms for larger datasets, I would look into:
// - Countsort
// - Radixsort
// - Mergesort
// - Quicksort

// https://www.geeksforgeeks.org/sorting-algorithms/
