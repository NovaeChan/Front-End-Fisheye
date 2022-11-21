let dataIndex = 0;
const nextButton = document.querySelector('[aria-label="Next image"]');
const previousButton = document.querySelector('[aria-label="Previous image"]');

nextButton.addEventListener("click", (event) => {
    newFigure(event);
});

previousButton.addEventListener("click", (event) => {
    newFigure(event);
});

function openLightbox(event){
    document.getElementById("lightbox_modal").style.display = "block";
    showLightbox(event.target);
}

function closeLightbox(){
    document.getElementById("lightbox_modal").style.display = "none";
    removeLightbox();
}

function showLightbox(target){
    const figureCaption = target.parentNode;
    const description = figureCaption.querySelector(".figure-description");
    const lightboxThumbnail = document.querySelector(".lightbox-thumbnail");

    dataIndex = target.dataset.index;
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
    switch(event.target.ariaLabel){
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