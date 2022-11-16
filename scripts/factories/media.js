function mediaFactory(data, photographer) {
    const { date, id, image, likes, price, title, video } = data;
    const pathMedia = `assets/images/${photographer.name}/`;

    function getUserMedia(){
        const article = document.createElement( 'article' );

        const link = document.createElement( 'a' );
        link.href= `#`;
        link.ariaLabel = 'Lorem ipsum dolor sit amet.';
        const media = image ? document.createElement( 'img' ) : document.createElement( 'video' );
        media.setAttribute("src", pathMedia + (image ? image : video));
        console.log(media);
        link.appendChild(media);

        const imageInfo = document.createElement( 'div' );
        imageInfo.className = "image-info";

        const titleImg = document.createElement( 'p' );
        titleImg.textContent = `${title}`;
        titleImg.ariaLabel = `${title}`;
        titleImg.className = 'title-img';

        const like = document.createElement( 'p' );
        like.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;
        like.className = 'likes ';

        imageInfo.appendChild(titleImg);
        imageInfo.appendChild(like);

        article.appendChild(link);
        article.appendChild(imageInfo);

        return (article);
    }

    return { getUserMedia };
}

