const url = new URL(window.location.href);
const search_params = url.searchParams; 

let photographerId = search_params.get('id');

async function getInfos() {
    try{
        //Request to json file
        const response = await fetch('./data/photographers.json');
        const data = await response.json();
        return data;
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
//TODO : Gérer les évènements avec les flèches de clavier
async function displayPhotographer(photographer, medias){
    const photographersSection = document.querySelector(".photograph-header");
    const button = document.querySelector(".contact_button");
    const mediaSection = document.createElement( 'section' );
    const likesAndPrices = document.createElement( 'section' );
    const modalTitle = document.querySelector('#contact-me');

    mediaSection.className = 'photograph-media';
    likesAndPrices.className = 'likesAndPrice';
    button.ariaLabel = `Contact me : ${photographer.name}`;
    modalTitle.innerHTML += ` <br>${photographer.name}`;

    main.appendChild(mediaSection);
    main.appendChild(likesAndPrices);
    // main.insertBefore(picture, button);
    try{
        //Description photographer
        const photographerModel = photographerFactory(photographer);
        const photographDesc = photographerModel.getUserDescription();
        const photographImg = photographerModel.getUserPortrait();
        const photographLikesAndPrice = photographerModel.getUserLikesAndPrices(getLikes(medias));

        photographersSection.insertBefore(photographDesc, button);
        photographersSection.appendChild(photographImg);
        likesAndPrices.appendChild(photographLikesAndPrice);
        
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

function getLikes(medias){
    let likes = 0;
    medias.forEach(media => {
        likes += media.likes
    });
    return likes;
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getInfos();
    let photograph = photographers.find(photographer => photographer.id == photographerId);
    let medias = media.filter(media => media.photographerId == photographerId);
    displayPhotographer(photograph, medias);
}

init();