const url = new URL(window.location.href);
const search_params = url.searchParams; 

let photographerId = search_params.get('id');
console.log(photographerId);

async function getInfos() {
    try{
        //Request to json file
        const response = await fetch('./data/photographers.json');
        const data = await response.json();

        
        let photographer = data.photographers.find(photographer => photographer.id == photographerId);
        //find all media with the same photographer's id
        let medias = data.media.filter(media => media.photographerId == photographerId);
        console.log(photographer);
        console.log(medias);
        displayPhotographer(photographer);
    }
    catch (error) {
		console.error(error);
		const errorElement = document.createElement('h2');
		errorElement.classList.add('photographers_error');
        errorElement.style.textAlign = 'center';
		errorElement.textContent = 'Erreur lors de la récupération des données du photographe';
		main.appendChild(errorElement);
	}
}

async function displayPhotographer(photographer){
    const photographersSection = document.querySelector(".photographer-header");
    console.log(photographersSection);
    try{
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    }
    catch(error){
        console.error(`An error occured : ${error}`);
    }
}

getInfos();