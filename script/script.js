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
      detailsButton.innerHTML = 'Voir les détails';
      detailsButton.classList.add("btn", "btn-primary");
      detailsButton.setAttribute("data-bs-toggle", "modal");
      detailsButton.setAttribute("data-bs-target", "#exampleModal");
      detailsButton.addEventListener("click", () => {
        getDetails(drink.idDrink);
      });
      cocktailDiv.appendChild(detailsButton);

      resultsDiv.appendChild(cocktailDiv);
    });
  } else {
    resultsDiv.innerHTML = '<p class="text-center">No results.</p>';
  }
}

function getDetails(id) {
  fetch(`${API_BASE}lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => displayDetails(data.drinks[0]))
    .catch(console.error);
}

function displayDetails(drink) {
    modalTitle.innerHTML = `<h4>${drink.strDrink}</h4>`;
    modalIngredients.innerHTML = "";

    // Liste des ingrédients avec dosages
    Object.keys(drink)
        .filter((key) => key.startsWith('strIngredient') && drink[key])
        .forEach((key, index) => {
            const ingredient = drink[key];
            const measureKey = `strMeasure${index + 1}`;
            const measure = drink[measureKey] || "Quantité non spécifiée";
            modalIngredients.innerHTML += `<li>${ingredient} - ${measure}</li>`;
        });

    modalInstructions.textContent = drink.strInstructions;
}

// Exemple d'utilisation avec le JSON fourni
const jsonData = {
    "drinks": [
        {
            "idDrink": "11007",
            "strDrink": "Margarita",
            "strDrinkAlternate": null,
            "strTags": "IBA,ContemporaryClassic",
            "strVideo": null,
            "strCategory": "Ordinary Drink",
            "strIBA": "Contemporary Classics",
            "strAlcoholic": "Alcoholic",
            "strGlass": "Cocktail glass",
            "strInstructions": "Rub the rim of the glass with the lime slice to make the salt stick to it. Take care to moisten only the outer rim and sprinkle the salt on it. The salt should present to the lips of the imbiber and never mix into the cocktail. Shake the other ingredients with ice, then carefully pour into the glass.",
            "strInstructionsFR": "Frotter le bord du verre avec la tranche de citron vert pour faire adhérer le sel. Veillez à n'humidifier que le bord extérieur et à y saupoudrer le sel. Le sel doit se présenter aux lèvres du buveur et ne jamais se mélanger au cocktail. Secouez les autres ingrédients avec de la glace, puis versez-les délicatement dans le verre.",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
            "strIngredient1": "Tequila",
            "strIngredient2": "Triple sec",
            "strIngredient3": "Lime juice",
            "strIngredient4": "Salt",
            "strMeasure1": "1 1/2 oz ",
            "strMeasure2": "1/2 oz ",
            "strMeasure3": "1 oz ",
            "strImageSource": "https://commons.wikimedia.org/wiki/File:Klassiche_Margarita.jpg",
            "strImageAttribution": "Cocktailmarler",
            "strCreativeCommonsConfirmed": "Yes",
            "dateModified": "2015-08-18 14:42:59"
        }
    ]
};

// Afficher les détails du premier cocktail dans le JSON
displayDetails(jsonData.drinks[0]);
