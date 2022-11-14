const url = new URL(window.location.href);
const search_params = url.searchParams; 

let photographerId = search_params.get('id');

async function getInfos() {
    try{
        //Request to json file
        const response = await fetch('./data/photographers.json');
        const data = await response.json();
        let photographer = data.photographers.find(photographer => photographer.id == photographerId);
        //find all media with the same photographer's id
        let medias = data.media.filter(media => media.photographerId == photographerId);
        displayPhotographer(photographer, medias);
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

async function displayPhotographer(photographer, medias){
    const photographersSection = document.querySelector(".photograph-header");
    const mediaSection = document.createElement( 'section' );
    mediaSection.className = 'photograph-media';
    main.appendChild(mediaSection);
    try{
        //Description photographer
        const photographerModel = photographerDisplay(photographer);
        photographerModel.getUserHeader();

        //Medias 
        const mediasBlock = document.createElement( 'section' );
        mediasBlock.className = 'medias';
        medias.forEach((media) => {
            const mediaModel = mediaFactory(media, photographer);
            const userMedias = mediaModel.getUserMedia();
            mediaSection.appendChild(userMedias);
        });
    }
    catch(error){
        console.error(`An error occured : ${error}`);
    }
}

function photographerDisplay(data){
    const { name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    const button = document.querySelector('.contact_button');

    function getUserHeader(){
        const header = document.querySelector(".photograph-header");
        
        const titleName = document.createElement( 'h1' );
        titleName.textContent = name;

        const description = document.createElement( 'div' );
        description.className = 'description';
        description.className = 'photographer_description';

        const location = document.createElement( 'h3' );
        location.textContent = `${city}, ${country}`;

        const tag = document.createElement( 'p' );
        tag.textContent = `${tagline}`;

        description.appendChild(location);
        description.appendChild(tag);

        const info = document.createElement( 'section' );
        info.appendChild(titleName);
        info.appendChild(description);

        const portrait = document.createElement( 'img' );
        portrait.setAttribute("src", picture);
        portrait.alt = `Photo de profil de ${name}`;

        header.insertBefore(info, button);
        header.insertBefore(portrait, button);

        const locations = document.createElement( 'h3' );
        locations.textContent = `${city}, ${country}`;
        locations.classList.add('country');
        locations.ariaLabel = `${city}, ${country}`;

        return (header);
    }
    return {getUserHeader};
}

getInfos();