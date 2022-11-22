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
        // eslint-disable-next-line no-undef
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
    // const mediaHeader = document.createElement('section');
    const mediasBlock = document.createElement('section');

    mediasBlock.className = 'photograph-media';
    main.appendChild(mediasBlock);

    try {
        let dataSetIndex = 0;
        medias.forEach((media) => {
            // eslint-disable-next-line no-undef
            const mediaModel = mediaFactory(media, photograph, dataSetIndex);
            const userMedias = mediaModel.getUserMedia();
            mediasBlock.appendChild(userMedias);
            dataSetIndex++;
        });
    } catch (error) {
        console.error(`An error occured : ${error}`);
    }
}

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getInfos();
    let photograph = photographers.find(photographer => photographer.id == photographerId);
    let medias = media.filter(media => media.photographerId == photographerId);
    displayPhotographerInfos(photograph, medias);
    displayPhothographerMedias(medias, photograph);
}

function getLikes(medias) {
    let likes = 0;
    medias.forEach(media => {
        likes += media.likes
    });
    return likes;
}

function addLike(event){
    let likes = event.target;
    const parent = likes.parentNode;
    if(likes.className != "numberLikes"){
        likes = parent.querySelector('.numberLikes');
    }
    if( !likes.hasAttribute('liked') ){
        likes.setAttribute('liked', '');
        const likeImg = parent.querySelector('i');
        likeImg.style.color = '#525252';
        let numberOfLikes = likes.innerHTML;
        numberOfLikes = parseInt(numberOfLikes);
        numberOfLikes ++;
        likes.innerHTML = `${numberOfLikes}`;
        updateTotalLikes();
    }
}

function updateTotalLikes(){
    const articleTotalLikes = document.querySelector('.likesAndPrice-article');
    let totalLikes = articleTotalLikes.querySelector('.totalLikes');
    totalLikes.innerHTML = parseInt(totalLikes.innerHTML) + 1;
}

function isEnterPressed(event){
    if(event.key == 'Enter'){
        openLightbox(event);
    }
}

function openDropdown(event){
    const parent = event.target.parentNode;
    parent.classList.toggle('wrapper-dropdown-open');
    event.target.focus();
}

function dropdownMenu(event){
    const orderOption = event.target.textContent;
    const ulDropdown = event.target.parentNode;
    const fullDropdown = ulDropdown.parentNode;
    const button =  fullDropdown.querySelector('button');
    
    
    // Récupérer la cible de l'event => stocker la valeur => faire disparaître la li de la cible => la faire apparaître dans le bouton
    // Avec la valeur stockée appeler une fonction de tri
    // Ne pas oublier de refermer le dropdown + focus 
    // 
}

function orderMedias(orderOption){
    //Switch case avec les 3 types d'options => A l'intérieur des switchs on appele la méthode sort où l'on tri tous les figures
    // On ajoute toutes les figures dans le block photograph-media
}


init();
