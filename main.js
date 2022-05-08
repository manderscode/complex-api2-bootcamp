const input = document.querySelector('input')
const button = document.querySelector('button')
const breweriesList = document.querySelector('.breweryList')

button.addEventListener('click', fetchBreweries)

function fetchBreweries() {
    const zipCode = input.value
    const zipCodeApiKey = 'bc2f0480-ce30-11ec-b524-3fa166a38f55'
    const url = `https://app.zipcodebase.com/api/v1/search?codes=${zipCode}&country=US&apikey=${zipCodeApiKey}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let city = data.results[zipCode][0].city
            console.log(data) 
            fetch(`https://api.openbrewerydb.org/breweries?by_city=${city}`)
                .then((res) => res.json())
                .then((breweries) => {
                    breweriesList.innerHTML = ""

                    // I had a mentor help me with this portion 
                    // "for of loop":
                    for (let brewery of breweries) {
                    // for, let element, of array
                    // where element is any variable that we choose and holds a reference to the individual elements of the array in that current iteration
                    // array is the array that we want to loop over
                        const listItem = document.createElement('li') // just creating an HTML element in JS
                        listItem.innerText = brewery.name
                        breweriesList.appendChild(listItem)
                    }
                })
        })
}
