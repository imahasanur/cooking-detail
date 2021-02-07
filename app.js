let dishItems = document.getElementById('dish-items');
let searchButton = document.getElementById('search');
let searchBox = document.getElementById('search-box');
let dishDetail = document.getElementById('dish-detail');
let recipe = document.getElementById('recipe');
let uniqueDishes = {};

searchButton.addEventListener('click', loadDishes);

function loadDishes(){
    let searchedRecipe = recipe.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedRecipe}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayDish(data));
}

function displayDish(dishes){
    dishItems.innerHTML = "";
    let searchedDish = recipe.value;
    recipe.value = "";
    if( dishes.meals != null){
        dishes.meals.forEach(dish => {
          let div = document.createElement('div');
          let item = `
            <div class="card">
              <img src="${dish.strMealThumb}" class="card-img-top" alt="...">
              <div class="card-body">
                <h6 class="card-title">${dish.strMeal}</h6>
              </div>
            </div>   
            `
          uniqueDishes[dish.strMeal] = dish.idMeal;
          div.className = "col-10 col-sm-4 col-md-3 mb-4 mt-2"
          div.innerHTML = item;
          dishItems.appendChild(div);
        });
    }
    else{
        dishItems.innerHTML = "";
        dishItems.innerHTML = `
          <img src="./images/crying.jpg" id="error-image" alt = "not found">
          <h2 class='text-center' id="error-text" style={color:red;}> This ${searchedDish} dish is not Found. </h2>
        `;
        uniqueDishes = {};
    }

}

dishItems.addEventListener('click', (event)=>{
    let dishName = event.target.parentNode.innerText;
    let dishId = uniqueDishes[dishName];
    uniqueDishes = {};
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`;
    fetch(url)
    .then(response => response.json())
    .then(dish => displayDishDetail(dish))
})

function displayDishDetail(dish){
    searchBox.style.display = "none";
    dishItems.style.display = "none";
    dishDetail.innerHTML = `
    <div class="offset-2 col-8 col-sm-6 col-md-5 mt-5" >
      <div class="card">
        <img src="${dish.meals[0].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h3 class="card-title">${dish.meals[0].strMeal}</h3>
          <h6>Ingredients</h6>
          <ul id="ingredients"></ul>
        </div>
      </div>  
    </div>
    `
    let totalIngredient = 50;
    let ul = document.getElementById('ingredients');
    for(let i = 1; i <= totalIngredient; i++){
        let ingredient = "strIngredient"+i;
        li = document.createElement('li');
        if( dish.meals[0][ingredient] !== "" ){
            li.innerText = dish.meals[0][ingredient];
            ul.appendChild(li);
        }
        else{
            break;
        }

    }
}