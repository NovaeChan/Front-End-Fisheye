/* eslint-disable no-undef */
//TODO : AJOUTER LES TABINDEX + ROLE + ARIA : VOIR LA MAQUETTE FIGMA
const nextButton = document.querySelector('[aria-label="Next image"]');
const previousButton = document.querySelector('[aria-label="Previous image"]');
const lightbox = document.getElementById('lightbox_modal');
const closeButtonLightbox = document.getElementById('close_button');
const mainPhotographer = document.querySelector('main');
let lightboxOpened = false;

nextButton.addEventListener("click", (event) => {
    newFigure(event.target);
});

previousButton.addEventListener("click", (event) => {
    newFigure(event.target);
});

closeButtonLightbox.addEventListener("keypress", (event) => {
    if(lightboxOpened == true){
        switch(event.key){
            case "Enter":
            case "Escape":
                closeLightbox();
                break;
            default:
                break;
        }
    }
});

document.addEventListener("keydown", (event) => {
    if(lightboxOpened == true){
        switch(event.key){
            case "ArrowLeft":
                newFigure(previousButton);
                break;
            case "ArrowRight":
                newFigure(nextButton);
                break;
            case "Escape":
                closeLightbox();
                break;
            default:
                break;
        }
    }
});

// eslint-disable-next-line no-unused-vars
function openLightbox(event){
    lightbox.style.display = "block";
    header.style.display ='none';
    mainPhotographer.style.display = 'none';

    mainPhotographer.className = 'no-scroll';

    mainPhotographer.setAttribute('aria-hidden', 'true');
    header.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('aria-hidden', 'false');

    showLightbox(event.target);
    lightboxOpened = true;
    lightbox.focus();
}

function closeLightbox(){
    const imgFigure = lightbox.querySelector('.thumbnail');
    const imgMain = mainPhotographer.querySelector(`[data-index="${imgFigure.dataset.index}"]`);
    document.getElementById("lightbox_modal").style.display = "none";
    lightbox.style.display = "none";
    mainPhotographer.style.display = 'block';
    header.style.display = 'flex';

    mainPhotographer.className = 'scroll';

    mainPhotographer.setAttribute('aria-hidden', 'false');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxOpened = false;
    imgMain.focus();
    removeLightbox();
}

function showLightbox(target){
    const figureCaption = target.parentNode;
    const description = figureCaption.querySelector(".figure-description");
    const lightboxThumbnail = document.querySelector(".lightbox-thumbnail");
    let figures = document.querySelectorAll('figure');
    figures = Array.from(figures);

    const indexTarget = figures.indexOf(figureCaption);
    lightboxThumbnail.appendChild(target.cloneNode());
    lightboxThumbnail.appendChild(description.cloneNode(true));
    
    const thumbnail = lightboxThumbnail.querySelector('.thumbnail');
    const desc = lightboxThumbnail.querySelector('p');
    lightbox.tabIndex = "0";
    thumbnail.tabIndex = "0";
    desc.tabIndex = "0";

    lightbox.dataset.index = indexTarget;

    lightboxThumbnail.focus();

    thumbnail.removeAttribute("onclick");
    if(thumbnail.tagName.toLocaleLowerCase() === "video"){
        thumbnail.setAttribute("controls", "");
    }
}

function removeLightbox(){
    const lightbox = document.getElementById('lightbox_modal');
    const thumbnail = lightbox.querySelector(".thumbnail");
    const description = lightbox.querySelector('.figure-description');
    thumbnail.remove();
    description.remove();
}

function newFigure(event){
    let dataIndex = lightbox.dataset.index;
    const figures = document.querySelectorAll('figure');
    switch(event.ariaLabel){
        case "Previous image":
            dataIndex--;
            if(dataIndex < 0){
                dataIndex = figures.length-1;
            }
            break;
        case "Next image": 
            dataIndex++;
            if(dataIndex >= figures.length){
                dataIndex = 0;
            }
    }
    lightbox.dataset.index = dataIndex;
    let nextMedia = figures[dataIndex].querySelector('img');
    if(nextMedia == undefined){
        nextMedia = figures[dataIndex].querySelector('video');
    }
    removeLightbox();
    showLightbox(nextMedia);
}