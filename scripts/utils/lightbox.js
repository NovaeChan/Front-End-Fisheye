const nextButton = document.querySelector('[aria-label="Next image"]');
const previousButton = document.querySelector('[aria-label="Previous image"]');
const lightbox = document.getElementById('lightbox_modal');
const closeButtonLightbox = document.getElementById('close_button');
const header = document.querySelector('header');
const mainPhotographer = document.querySelector('main');
let lightboxOpened = false;

nextButton.addEventListener("click", (event) => {
    newFigure(event.target);
});

previousButton.addEventListener("click", (event) => {
    newFigure(event.target);
});

closeButtonLightbox.addEventListener("keydown", (event) => {
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
                console.log('oui');
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
    mainPhotographer.setAttribute('aria-hidden', 'true');
    mainPhotographer.className = 'no-scroll';
    header.className = 'no-scroll';
    header.style.display ='none';
    mainPhotographer.style.display = 'none';
    header.setAttribute('aria-hidden', 'true');
    lightbox.setAttribute('aria-hidden', 'false');
    showLightbox(event.target);
    lightboxOpened = true;
    closeButtonLightbox.focus();
}

function closeLightbox(){
    const imgFigure = lightbox.querySelector('.thumbnail');
    const imgMain = mainPhotographer.querySelector(`[data-index="${imgFigure.dataset.index}"]`);
    document.getElementById("lightbox_modal").style.display = "none";
    lightbox.style.display = "none";
    mainPhotographer.setAttribute('aria-hidden', 'false');
    mainPhotographer.className = 'scroll';
    mainPhotographer.style.display = 'block';
    header.style.display = 'flex';
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxOpened = false;
    imgMain.focus();
    removeLightbox();
}

function showLightbox(target){
    const figureCaption = target.parentNode;
    const description = figureCaption.querySelector(".figure-description");
    const lightboxThumbnail = document.querySelector(".lightbox-thumbnail");
    
    lightboxThumbnail.appendChild(target.cloneNode());
    lightboxThumbnail.appendChild(description.cloneNode(true));
    
    const thumbnail = lightboxThumbnail.querySelector('.thumbnail');

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
    const lightbox = document.querySelector('.lightbox');
    const image = lightbox.querySelector('.thumbnail');
    let dataIndex = image.dataset.index;
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
    let nextMedia = figures[dataIndex].querySelector('img');
    if(nextMedia == undefined){
        nextMedia = figures[dataIndex].querySelector('video');
    }
    removeLightbox();
    showLightbox(nextMedia);
}