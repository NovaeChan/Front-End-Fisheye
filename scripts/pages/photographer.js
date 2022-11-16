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
//TODO : Mettre les infos avant le bouton et le profil après. Voir le tab index pour la tabulation sur la page d'accueil et 
//les photos d'une personne
//Gérer les évènements avec les flèches de clavier
async function displayPhotographer(photographer, medias){
    const photographersSection = document.querySelector(".photograph-header");
    const mediaSection = document.createElement( 'section' );
    mediaSection.className = 'photograph-media';
    main.appendChild(mediaSection);
    try{
        //Description photographer
        const photographerModel = photographerFactory(photographer);
        photographerModel.photographerProfile();
        // photographersSection.appendChild(userInfos);


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

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getInfos();
    let photograph = photographers.find(photographer => photographer.id == photographerId);
    let medias = media.filter(media => media.photographerId == photographerId);
    console.log(medias);
    displayPhotographer(photograph, medias);
}

init();