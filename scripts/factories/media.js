function mediaFactory(data, photographer) {
    const { date, id, image, likes, price, title, video } = data;
    const picture = `assets/images/${photographer.name}/${image}`;
    console.log(picture);
    function getUserMedia(){
        const article = document.createElement( 'article' );

        const link = document.createElement( 'a' );
        link.href= `#`;
        link.ariaLabel = 'Lorem ipsum dolor sit amet.';
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        link.appendChild(img);

        const imageInfo = document.createElement( 'div' );
        imageInfo.className = "image-info";

        const titleImg = document.createElement( 'p' );
        titleImg.textContent = `${title}`;
        titleImg.ariaLabel = `${title}`;
        titleImg.className = 'title-img';

        const like = document.createElement( 'p' );
        like.textContent = `${likes}`;
        like.className = 'likes';

        imageInfo.appendChild(titleImg);
        imageInfo.appendChild(like);

        article.appendChild(link);
        article.appendChild(imageInfo);

        return (article);
    }

    return { getUserMedia };
}

