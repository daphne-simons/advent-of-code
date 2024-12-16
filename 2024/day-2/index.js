// Day 2

// each line is a "report"
// each element is a "level"

// Task breakdown:

// Find out how many reports are safe.

// A safe report is:
// - The levels are all increasing OR decreasing
// - The difference between levels should be;
// --- at least one && at most three.

// if report is safe? Add count to "totalSafeReports" variable.

// Type of datastructure - A Matrix? An array of arrays

// e.g
// const exampleArr = [
//   [75, 75, 77, 80, 82, 85, 84], // unsafe - last one decreases
//   [49, 52, 53, 55, 58, 59, 61, 61], // unsafe - last one duplicate
//   [55, 57, 60, 62, 63], // SAFE - INCREASING
//   [4, 6, 8, 10, 11, 14, 19], // unsafe - steps to big at the end
//   [89, 87, 85, 84, 82], // SAFE  - Decreasing
// ]

// Turn the input data into a Matrix Array:

const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
const singleArr = input.split(/\r?\n/)

// Split the singleArr elements (strings that look like this: '75 76 77 80 82 85 84'), into an array of numbers.

const matrixArr = singleArr.map((record) => {
  const recordArr = record.split(' ').map(Number)
  return [...recordArr]
})

// Create running count for safe reports:
let totalSafeReports = 0

// Loop through the matrixArr to find a count of safe reports according to the conditions:
matrixArr.forEach((record) => {
  let isIncreasing = true // Assume it's increasing initially
  let isDecreasing = true // Assume it's decreasing initially

  // EDGE CASE: Check for duplicate adjacent values
  for (let i = 0; i < record.length - 1; i++) {
    if (record[i] === record[i + 1]) {
      isIncreasing = false
      isDecreasing = false
      break
    }
  }
  // Only proceed if we haven't already ruled out both increasing and decreasing
  if (isIncreasing || isDecreasing) {
    // DECREASING CHECK:
    for (let i = 0; i < record.length - 1; i++) {
      if (record[i] <= record[i + 1]) {
        isDecreasing = false
        break
      }
      // AND if the gap between the elements is min 1 and max 3.
      const gap = Math.abs(record[i] - record[i + 1])
      if (gap < 1 || gap > 3) {
        isDecreasing = false
        break
      }
    }

    // INCREASING CHECK:
    for (let i = 0; i < record.length - 1; i++) {
      if (record[i] >= record[i + 1]) {
        isIncreasing = false
        break
      }
      // AND if the gap between the elements is min 1 and max 3.
      const gap = Math.abs(record[i + 1] - record[i])
      if (gap < 1 || gap > 3) {
        isIncreasing = false
        break
      }
    }

    if (isIncreasing || isDecreasing) {
      totalSafeReports += 1
    }
  }
})

console.log(totalSafeReports) // Expected output: 479
