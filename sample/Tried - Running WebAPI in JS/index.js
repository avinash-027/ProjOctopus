
// node index.js

console.log('Loading...');
fetch('http://localhost:5247/api/GeminiNutrientTracker/generate-nutrition-report', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
  "text": "string",
  "weightKg": 70,
  "heightCm": 170,
  "age": 20,
  "gender": "male",
  "healthConditions": [
    "no health conditions"
  ]})
})
.then(response => {
  return response.text();
})
.then(data => {
  console.log("FoodInfo:",data);
})
.catch(error => {
  console.error('FoodError:', error);
})

fetch('http://localhost:5247/api/GeminiNutrientTracker')
// response is the HTTP Response object
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    return response.text();
  }
})
// data is the parsed JSON object
.then(data => {
  console.log('Data received:', data); // This will log the actual JSON object
})
.catch(error => {
  console.error('Fetch error:', error);
});

// fetch() 
//   ↓
// .then(response => { ... })  // 'response' is the Response object
//   ↓
// .then(data => { ... })      // 'data' is the parsed JSON or text, depending on what you returned above

// globalThis.fetch('http://localhost:5247/api/GeminiNutrientTracker')

// fetch is not built-in in Node.js (before v18). If you're using Node.js v18 or later, fetch is available natively. If you're using an earlier version, you'll need to install a package like node-fetch.
// const fetch = require('node-fetch');

// This disables SSL verification for all HTTPS requests in your Node.js process. Never use this in production, as it makes your application vulnerable to man-in-the-middle attacks.
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';