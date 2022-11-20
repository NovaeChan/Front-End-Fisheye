function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        //On crée les elements
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        const img = document.createElement( 'img' );
        const h2 = document.createElement( 'h2' );
        const blockNamePhotograh = document.createElement( 'div' );
        const blockDescription = document.createElement( 'div' );
        const locations = document.createElement( 'h3' );
        const tag = document.createElement( 'p' );
        const cost = document.createElement( 'p' );


        //Lien image + photographe
        link.href = `photographer.html?id=${id}`;
        link.ariaLabel = `Lien vers le photographe ${name}`;

        img.setAttribute("src", picture);
        img.alt = `Photo de profil de ${name}`;
        h2.textContent = name;
        h2.ariaLabel = `${name}`;

        link.appendChild(img);
        link.appendChild(h2);
        link.tabIndex = 1;

        blockNamePhotograh.appendChild(link);

        //Description block

        locations.textContent = `${city}, ${country}`;
        locations.classList.add('country');
        locations.ariaLabel = `${city}, ${country}`;

        tag.classList.add('tagline');
        tag.textContent = `${tagline}`;
        tag.ariaLabel = `${tagline}`;

        cost.classList.add('pricing');
        cost.classList.add('price');
        cost.textContent = `${price}€/jour`;
        cost.ariaLabel = `${price}€/jour`;

        article.appendChild(blockNamePhotograh);

        blockDescription.appendChild(locations);
        blockDescription.appendChild(tag);
        blockDescription.appendChild(cost);
        article.appendChild(blockDescription);
        
        return (article);
    }

    //Rename method + create new method for profile pic
    function getUserDescription(){
        const photographerDescription = document.createElement( 'section' );
        
        const titleName = document.createElement( 'h1' );
        titleName.textContent = name;
        titleName.ariaLabel = `Nom du photographe : ${name}`;

        const description = document.createElement( 'div' );
        description.className = 'description';
        description.className = 'photographer_description';

        const location = document.createElement( 'h3' );
        location.textContent = `${city}, ${country}`;

        const tag = document.createElement( 'p' );
        tag.textContent = `${tagline}`;

        description.appendChild(location);
        description.appendChild(tag);

        const info = document.createElement( 'section' );
        info.appendChild(titleName);
        info.appendChild(description);


        photographerDescription.appendChild(titleName);
        photographerDescription.appendChild(description);
        return (photographerDescription);
    }

    function getUserPortrait(){
        const portrait = document.createElement( 'img' );
        portrait.setAttribute("src", picture);
        portrait.alt = `Photo de profil de ${name}`;

        return (portrait);
    }

    function getUserLikesAndPrices(likes){
        const PricesLikes = document.createElement( 'article' );
        PricesLikes.className = 'likesAndPrice-article';

        const likesP = document.createElement( 'p' ); 
        likesP.innerHTML = `${likes} <i class="fa-solid fa-heart" aria-label='nombre de likes : ${likes}'></i>`;
        likes.ariaLabel = ``;

        const priceP = document.createElement( 'p' );
        priceP.textContent = `${price}€/jour`;
        priceP.ariaLabel = `${price}€/jour`;

        PricesLikes.appendChild(likesP);
        PricesLikes.appendChild(priceP);

        return (PricesLikes);
    }

    return { getUserCardDOM, getUserDescription, getUserPortrait, getUserLikesAndPrices };
}

