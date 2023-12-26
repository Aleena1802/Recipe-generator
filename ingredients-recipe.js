const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname)));


function fetchdata(ingredients) {
    const apiKey = 'c8fe12a4c0e0441596e2c6a1c0b5967a';

    // Create an array of promises for each ingredient
  const promises = ingredients.map(ingredient =>
    fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredient}`, {
        headers: {
            Accept: 'application/json',
        },
    })
        .then(res => {
            // Check if the request was successful
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => data)
        .catch(e => {
            console.error(e);
            throw e; // Propagate the error to the caller
        })
);
  
  // Use Promise.all to wait for all promises to be resolved
  return Promise.all(promises)
      .then(responses => { 
        return { responses };
      })
      .catch(error => {
          console.error(error);
          throw error; // Propagate the error to the caller
      });
}

app.post('/formdata', (req, res) => {
  const formData = Array.isArray(req.body.box) ? req.body.box : [req.body.box];
  const encodedIngredients = formData.map(ingredient => encodeURIComponent(ingredient));

  fetchdata(encodedIngredients)
    .then(data => {
    const { responses } = data; //extracting responses from the data object
    res.render('form2', { responses: responses.flat() });
  })
    .catch(error => {
      res.status(500).send('Error fetching data');
    });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




