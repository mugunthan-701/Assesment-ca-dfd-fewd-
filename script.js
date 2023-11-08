let randomimg = document.getElementById("randomimg");
let dish = document.getElementById("dish");
let category = document.getElementById("Category1");
let ingredientslist = document.getElementById("ingredients-list");
let ingredients = document.getElementById("ingredients")
let closebtn= document.getElementById("closebtn")

function fetchData() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      appendData(data);
    });
}

function appendData(data) {
  randomimg.src = data.meals[0].strMealThumb;
  dish.innerText = data.meals[0].strMeal;
  category.innerText = data.meals[0].strCategory;

  ingredientslist.innerHTML = ''; 

  for (let i = 1; i <= 20; i++) {
    const ingredientName = data.meals[0][`strIngredient${i}`];
    const ingredientMeasure = data.meals[0][`strMeasure${i}`];

    if (ingredientName) {
      const ingredientList = document.createElement('li');
      ingredientList.classList.add('ingredient-items');
      ingredientList.innerText = `${ingredientName} - ${ingredientMeasure}`;
      ingredientslist.append(ingredientList);
    }
  }
}
fetchData();
function openIngredients(){
  ingredients.style.display="flex"
  console.log("ho")
}
    
function close(){
    console.log("Hi")
   ingredients.style.display="none"
}
closebtn.addEventListener("click",close)

const searchInput = document.getElementById("input");
const searchIcon = document.getElementById("searchicon");
const dishesContainer = document.getElementById("dishes-container");

searchIcon.addEventListener("click", performSearch);

function performSearch() {
  const searchValue = searchInput.value;
  filterDishesByCategory(searchValue);
}

function filterDishesByCategory(category) {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((res) => res.json())
    .then((data) => {console.log(data.meals[0].category)
      const dishes = data.meals;
      dishesContainer.innerHTML = ''; 

      if (dishes) {
        dishes.forEach((dish) => {
          const dishName = dish.strMeal;
          const dishImage = dish.strMealThumb;
          const dishDiv = document.createElement('div');
          dishDiv.classList.add('dish-item');
          const imageElement = document.createElement('img');
          imageElement.classList.add('dish-image')
          imageElement.src = dishImage;
          const nameElement = document.createElement('p');
          nameElement.classList.add('dish-name')
          nameElement.innerText = dishName;
          dishDiv.appendChild(imageElement);
          dishDiv.appendChild(nameElement);
          dishesContainer.appendChild(dishDiv);
          dishesContainer.style.display="grid"
        });
      } else {
        dishesContainer.innerHTML = 'No dishes found in this category.';
      }
    });
}
