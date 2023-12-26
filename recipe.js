// Retrieve the recipe id from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("recipeID");

const apiKey = "c8fe12a4c0e0441596e2c6a1c0b5967a";

async function fetchData() {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();
    document.getElementById('title').innerText=data.title;
    document.getElementById('image').innerHTML=`<img src='${data.image}'>`;
    document.getElementById('pTime').innerText=data.preparationMinutes + "mins";
    document.getElementById('cTime').innerText=data.cookingMinutes + "mins";
    document.getElementById('ready').innerText=data.readyInMinutes + "mins";
    document.getElementById('serve').innerText=data.servings;
    document.getElementById('health').innerText=data.healthScore;
    document.getElementById('source').innerText=data.sourceName;
    for(let i=0; i<data.extendedIngredients.length; i++){
      const elem=document.createElement('span');
      elem.innerText=data.extendedIngredients[i].name;
      document.getElementById('ingredients').appendChild(elem);
    }
    for(let i=0; i<data.analyzedInstructions.length; i++){
      for(let j=0; j<data.analyzedInstructions[i].steps.length; j++){
      const elem=document.createElement('li');
      elem.innerText=data.analyzedInstructions[i].steps[j].step;
      console.log(elem);
      document.getElementById('ol').appendChild(elem);
      }
  }




  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();