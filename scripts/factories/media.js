function mediaFactory(data, photoBlockgrapher) {
    const { date, id, image, likes, price, title, video } = data;
    const pathMedia = `assets/images/${photoBlockgrapher.name}/`;

    function getUserMedia(){
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        const photoBlock = document.createElement( 'div' );
        const media = image ? document.createElement( 'img' ) : document.createElement( 'video' );
        const titleImg = document.createElement( 'p' );
        const like = document.createElement( 'p' );

        link.href= `#`;
        link.ariaLabel = `${title}`;
        media.setAttribute("src", pathMedia + (image ? image : video));
        media.alt = `${title}`;

        photoBlock.className = "image-info";
        photoBlock.alt = `${title}`;

        titleImg.textContent = `${title}`;
        titleImg.ariaLabel = `${title}`;
        titleImg.className = 'title-img';

        like.innerHTML = `${likes} <i class="fa-solid fa-heart" aria-label=${likes}></i>`;
        like.className = 'likes ';

        link.appendChild(media);

        photoBlock.appendChild(titleImg);
        photoBlock.appendChild(like);

        article.appendChild(link);
        article.appendChild(photoBlock);

        return (article);
    }

    return { getUserMedia };
}

