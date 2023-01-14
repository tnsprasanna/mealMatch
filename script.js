'use strict';

let inputText;
const recipesContainer = document.querySelector('.recipesContainer');
const APIKey = "bb562a95169d4da584f3f6fdc83b100a";

function renderRecipes(recipes) {
    let i = 0;

    // removing previous search results
    recipesContainer.innerHTML = "";

    while (i < recipes.results.length) {
        /*const heading = document.createElement("a");
        let linkText = document.createTextNode(recipes.results[i].title);
        heading.appendChild(linkText);
        heading.title = recipes.results[i].title;
        heading.href = "https://www.sliderrevolution.com/resources/css-select-styles/"; 
        item.appendChild(heading);*/

        const item = document.createElement("div");
        item.className = "item";
        item.innerHTML = '<h3><a href="javascript:void(0);" onclick="getRecipeLink('+recipes.results[i].id +')">' + recipes.results[i].title + '</a></h3>'

        const image = document.createElement("img");
        image.src = recipes.results[i].image;
        item.appendChild(image);

        recipesContainer.appendChild(item);
        i++;
    }
}

/* "gluten-free">gluten-free</option>
        <option value="ketogenic">ketogenic</option>
        <option value="vegetarian">vegetarian</option>
        <option value="lacto-vegetarian">lacto-vegetarian</option>
        <option value="ovo-vegetarian">ovo-vegetarian</option>
        <option value="vegan">vegan</option>
        <option value="pescetarian">pescetarian</option>
        <option value="paleo">paleo</option>
        <option value="primal">primal</option>
        <option value="low FODMAP">low FODMAP</option>
        <option value="whole30">whole30</option> */

function search() {
    const diet = document.getElementById("dietList").value;
    console.log(diet);
  if(document.getElementById("textSearch").value !== ""){
   inputText = document.getElementById("textSearch").value;
   const configApiUrl = "https://api.spoonacular.com/recipes/complexSearch?";

   let fetchURL;
   if (diet === "none") {
    fetchURL = `${configApiUrl}apiKey=${APIKey}&query=${inputText}`;
   } else {
    fetchURL = `${configApiUrl}apiKey=${APIKey}&query=${inputText}&diet=${diet}`;
   }
   fetch(fetchURL)
   .then(function(response){
     return response.json();
   })
   .then(function(data){
     console.log(data);
     renderRecipes(data);
     //console.log(data.results[0].title);
   })
}
  else {
    alert("Sorry, that food doesn't exist!");
  }
}

function getRecipeLink(id) {
    let link = "";
    const url = `https://api.spoonacular.com/recipes/${id}/information`;
    const fetchURL = `${url}?apiKey=${APIKey}`;
    fetch(fetchURL)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        //console.log(data.sourceUrl);
        //link = data.sourceUrl;
        //console.log(link);
        console.log(data);
        window.open(data.sourceUrl, "_blank");
    })
}

//getRecipeLink(654959);
//console.log(getRecipeLink("654959"));


/*
const renderRecipe = function (data) {
    const html = `
<article class="food ${inputText}">
    <img class="food" src="${data.results[0].image}" />
    <div class="foodData">
      <h3 class="foodName">${data.results[0].title}</h3>
    </div>
  </article>`;
    recipesContainer.insertAdjacentHTML('beforeend', html);
    //recipesContainer.style.opacity = 1;
  };
  */
