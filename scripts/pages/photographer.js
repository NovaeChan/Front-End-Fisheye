const url = new URL(window.location.href);
const search_params = url.searchParams;
const main = document.querySelector('main');
let photographerId = search_params.get('id');

async function getInfos() {
    try {
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

async function displayPhotographerInfos(photographer, medias) {
    const photographHeader = document.querySelector(".photograph-header");
    const contactButton = document.querySelector(".contact_button");
    const modalTitle = document.querySelector('#contact-me');
    const likesAndPrices = document.createElement('section');

    contactButton.ariaLabel = `Contact me : ${photographer.name}`;
    modalTitle.innerHTML += ` <br>${photographer.name}`;
    likesAndPrices.className = 'likesAndPrice';

    try {
        //Description photographer
        const photographerModel = photographerFactory(photographer);
        const photographDesc = photographerModel.getUserDescription();
        const photographImg = photographerModel.getUserPortrait();
        const photographLikesAndPrice = photographerModel.getUserLikesAndPrices(getLikes(medias));

        photographHeader.insertBefore(photographDesc, contactButton);
        photographHeader.appendChild(photographImg);
        likesAndPrices.appendChild(photographLikesAndPrice);
        main.appendChild(likesAndPrices);
    }
    catch (error) {
        console.error(`An error occured : ${error}`);
    }
}

function displayPhothographerMedias(medias, photograph) {
    const mediaHeader = document.createElement('section');
    const mediasBlock = document.createElement('section');

    mediasBlock.className = 'photograph-media';
    main.appendChild(mediasBlock);

    try {
        // mediasBlock.className = 'medias';
        medias.forEach((media) => {
            const mediaModel = mediaFactory(media, photograph);
            const userMedias = mediaModel.getUserMedia();
            mediasBlock.appendChild(userMedias);
        });
    } catch (error) {
        console.error(`An error occured : ${error}`);
    }
}

function getLikes(medias) {
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
    displayPhotographerInfos(photograph, medias);
    displayPhothographerMedias(medias, photograph);
}

init();