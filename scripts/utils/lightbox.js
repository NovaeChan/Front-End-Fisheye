function openLightbox(event){
    document.getElementById("lightbox_modal").style.display = "block";
    showLightbox(event);
}

function closeLightbox(){
    document.getElementById("lightbox_modal").style.display = "none";
}

let thumbnailIndex = 1;

function showLightbox(event){
    const target = event.target;
    const figureCaption = target.parentNode;
    const description = figureCaption.querySelector(".figure-description");
    const thumbnails = document.getElementsByClassName("ligthbox");
    const lightboxThumbnail = document.querySelector(".lightbox-thumbnail");

    lightboxThumbnail.appendChild(target.cloneNode());
    lightboxThumbnail.appendChild(description.cloneNode(true));
}