async function searchCocktail() {
    const query = document.getElementById('sarch').value;
    const searchType = document.querySelector('input[name="searchType"]:checked').value;
    let url;

    // Déterminer l'URL en fonction du type de recherche
    if (chercherType === 'ingredient') {
        url = 'www.thecocktaildb.com/api/json/v1/1/filter.php?g=${query}';
    } else {
        url = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}';
    }

    const response = await fetch(url);
    const data = await response.json();
    displayResults(data.drinks);
}






function displayResults(drinks) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML
    if (drinks) {
        drinks.forEach(drink => {
            const cocktailDiv = document.createElement('div');

            cocktailDiv.classList.add('cocktail');

            const cocktailName = document.createElement('h2');
            cocktailName.textContent = drink.strDrink;
            cocktailDiv.appendChild(cocktailName);

            //Afficher les details si la recherche est par nom
            if (drink.strinstructions) {
                const instructions = document.createElement('p');
            }
        })
    }
}