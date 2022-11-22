function mediaFactory(data, figureCaptiongrapher, dataSetIndex) {
    const { date, id, image, likes, price, title, video } = data;
    const pathMedia = `assets/images/${figureCaptiongrapher.name}/`;

    function getUserMedia(){
        const figure = document.createElement( 'figure' );
        const figureCaption = document.createElement( 'figurecaption' );
        const media = image ? document.createElement( 'img' ) : document.createElement( 'video' );
        const imageTitle = document.createElement( 'p' );
        const like = document.createElement( 'div' );

        media.setAttribute("src", pathMedia + (image ? image : video));
        media.alt = `${title}`;
        media.className = "thumbnail";
        media.setAttribute("onclick", "openLightbox(event)");
        media.setAttribute("onkeypress", "isEnterPressed(event)");
        media.dataset.index = dataSetIndex;
        media.setAttribute('loading', 'lazy');
        media.tabIndex = "0";
        //Ajouter un écouteur pour le keypress pour ouvrir la lightbox


        figureCaption.className = "image-info";
        figureCaption.alt = `${title}`;

        imageTitle.textContent = `${title}`;
        imageTitle.ariaLabel = `${title}`;
        imageTitle.className = 'figure-description';

        like.innerHTML = `<span class="numberLikes">${likes}</span> <i class="fa-solid fa-heart" aria-label=${likes}></i>`;
        like.className = 'likes ';
        like.setAttribute("onclick", "addLike(event)");

        figureCaption.appendChild(imageTitle);
        figureCaption.appendChild(like);

        figure.appendChild(media);
        figure.appendChild(figureCaption);

        return (figure);
    }

    return { getUserMedia };
}

