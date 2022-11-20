function mediaFactory(data, figureCaptiongrapher) {
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

        figureCaption.className = "image-info";
        figureCaption.alt = `${title}`;

        imageTitle.textContent = `${title}`;
        imageTitle.ariaLabel = `${title}`;
        imageTitle.className = 'title-img';

        like.innerHTML = `${likes} <i class="fa-solid fa-heart" aria-label=${likes}></i>`;
        like.className = 'likes ';

        figure.appendChild(media);

        figureCaption.appendChild(imageTitle);
        figureCaption.appendChild(like);

        figure.appendChild(figureCaption);

        return (figure);
    }

    return { getUserMedia };
}

