const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

function fetchdata(ingredients) {
    const apiKey = 'c8fe12a4c0e0441596e2c6a1c0b5967a';
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };

  // Create an array of promises for each ingredient
  const promises = ingredients.map(ingredient =>
    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${encodeURIComponent(ingredient)}`, config)
  );

  // Use Promise.all to wait for all promises to be resolved
  return Promise.all(promises)
    .then(responses => {
      // Extract the data you need from each response
      const recipes = responses.map(response => response.data.map(recipe => recipe.title));
    
      const images = responses.map(response => response.data.map(pic => pic.image));

      return {recipes, images };
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
    const { recipes, images } = data;
    console.log('Images:', images.flat()); // Log the images array to the console
    res.render('recipe', { recipes: recipes.flat(), images: images.flat() });
  })
    .catch(error => {
      res.status(500).send('Error fetching data');
    });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




