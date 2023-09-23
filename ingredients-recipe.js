const ingredients=document.getElementById("chicken");

    const config = {
        headers: {
            Accept: 'application/json'
        }
    };
 

for(let i=0; i<ingredients.length; i++){
    if(ingredients[i].checked){
    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=c8fe12a4c0e0441596e2c6a1c0b5967a&ingredients=${ingredients[i].value}`, config).then(res => {
       console.log(res.data[0].title);
            
            })
        }
        }

var array='';

if (ingredients.checked) {
    console.log("Checkbox is checked.");
} else {
    console.log("Checkbox is not checked.");
}




