

const modalInstructions = document.getElementById('modalInstructions');
const modalIngredients = document.getElementById('modalIngredients');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";

let send = document.getElementById("send");
let searchInput = document.getElementById("search");
let searchByName = document.getElementById("byName");



send.addEventListener("click", function(event) {
  event.preventDefault();
  console.log("Clicked");
});

searchInput.addEventListener("change", function(event) {
  event.preventDefault();
  console.log("Changed");
});

send.addEventListener("click", function() {
  const query = searchInput.value.trim();
  const searchType = searchByName.checked ? 'name' : 'ingredient';
  if (!query) return alert("Veuillez entrer un terme de recherche.");  
  const endpoint =
    searchType === 'name'
      ? `${API_BASE}search.php?s=${query}`
      : `${API_BASE}filter.php?i=${query}`;  
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => displayResults(data.drinks))
      .catch(console.error);

  
});

function displayResults(drinks) {
  const resultsDiv = document.getElementById("resultats");
  resultsDiv.innerHTML = "";
  if (drinks) {
    drinks.forEach(drink => {
      // Pour la consigne, pour chaque cocktail: une image, le nom et un bouton

      const cocktailDiv = document.createElement("div");
      cocktailDiv.classList.add("cocktail");
      


      const cocktailName = document.createElement("h2");
      cocktailName.innerHTML = drink.strDrink;
      cocktailDiv.appendChild(cocktailName);

      const cocktailImage = document.createElement("img");
      cocktailImage.src = drink.strDrinkThumb;
      cocktailImage.alt = drink.strDrink;

      cocktailDiv.appendChild(cocktailImage);

      const detailsButton = document.createElement("button");
      detailsButton.innerHTML = '<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"> Voir les détails</button>';

      detailsButton.addEventListener("click", () => {
        
        displayIngredients(drinks);
        // alert(drink.strInstructions);
      });

      cocktailDiv.appendChild(detailsButton);

      resultsDiv.appendChild(cocktailDiv);

      
    });
  } else {
    resultsDiv.textContent = "Aucun cocktail trouvé.";
  }
}
function displayIngredients(drink){

  const infosDiv = document.getElementById("infos");
  infosDiv.innerHTML =""; // Afficher les details

  const ingredientsTitle = document.createElement("h3");
  ingredientsTitle.textContent = "Ingrédients";

  infosDiv.appendChild(ingredientsTitle);
}
