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
    orderMedias("");
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
    parent.setAttribute('aria-expanded', 'true');
    event.target.focus();
}

function dropdownMenu(event){
    const orderOption = event.target.textContent;
    const ulDropdown = event.target.parentNode;
    const fullDropdown = ulDropdown.parentNode;
    const button =  fullDropdown.querySelector('button');
    const hiddenOption = ulDropdown.querySelector('.dropdown-hide');

    hiddenOption.classList.remove('dropdown-hide');
    hiddenOption.setAttribute('aria-selected', 'false');

    //On cache l'option sélectionnée
    event.target.classList.add('dropdown-hide');
    event.target.setAttribute('aria-selected', 'true');

    //On change l'affichage du bouton pour que la bonne valeur soit affichée 
    button.textContent = orderOption;

    fullDropdown.classList.toggle('wrapper-dropdown-open');
    fullDropdown.setAttribute('aria-expanded', 'false');
    orderMedias(orderOption);
}

function orderMedias(orderOption){
    if(orderOption.length < 1){
        orderOption = "popularité";
    }
    let figures = document.querySelectorAll('figure');
    //On convertit l'objet figures en tableau
    figures = Array.from(figures);

    const mediasBlock = document.querySelector('.photograph-media');
    let firstItem ="";
    let secondItem ="";

    switch(orderOption.toLowerCase()){
        case "popularité":
            figures.sort(function(item, nextItem){
                firstItem = parseInt(item.querySelector('.numberLikes').textContent);
                secondItem = parseInt(nextItem.querySelector('.numberLikes').textContent);
                return secondItem - firstItem;
            })
            console.log("on tri par popularité");
            break;
        case "date":
            figures.sort(function(item, nextItem){
                firstItem = Date.parse(item.querySelector('[data-date]').dataset.date);
                secondItem = Date.parse(nextItem.querySelector('[data-date]').dataset.date);
                return firstItem - secondItem;
            })
            console.log("on tri par date");
            break;
        case "titre":
            figures.sort(function(item, nextItem){
                firstItem = item.querySelector('.figure-description').textContent;
                secondItem = nextItem.querySelector('.figure-description').textContent;
                return firstItem.localeCompare(secondItem);
            })
            break;
        default:
            console.log("On tri par défaut par titre");
            break;
    }
    console.log("tri terminé");
    console.log(figures);

    mediasBlock.innerHTML = "";
    figures.forEach(elt => mediasBlock.appendChild(elt));
}


init();
