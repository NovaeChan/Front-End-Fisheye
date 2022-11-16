function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        //Image link
        const link = document.createElement( 'a' );
        link.href = `photographer.html?id=${id}`;
        link.ariaLabel = `Lien vers le photographe ${name}`;
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.alt = `Photo de profil de ${name}`;
        link.appendChild(img);

        //Photographer's name
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        h2.ariaLabel = `${name}`;

        //Description block
        const blockDescription = document.createElement( 'div' );

        const locations = document.createElement( 'h3' );
        locations.textContent = `${city}, ${country}`;
        locations.classList.add('country');
        locations.ariaLabel = `${city}, ${country}`;

        const tag = document.createElement( 'p' );
        tag.classList.add('tagline');
        tag.textContent = `${tagline}`;
        tag.ariaLabel = `${tagline}`;

        const cost = document.createElement( 'p' );
        cost.classList.add('pricing');
        cost.classList.add('price');
        cost.textContent = `${price}€/jour`;
        cost.ariaLabel = `${price}€/jour`;

        article.appendChild(link);
        article.appendChild(h2);

        blockDescription.appendChild(locations);
        blockDescription.appendChild(tag);
        blockDescription.appendChild(cost);
        article.appendChild(blockDescription);
        
        return (article);
    }

    //Rename method + create new method for profile pic
    function photographerProfile(){
        const button = document.querySelector('.contact_button');

        const header = document.querySelector(".photograph-header");
        
        const titleName = document.createElement( 'h1' );
        titleName.textContent = name;

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

        const portrait = document.createElement( 'img' );
        portrait.setAttribute("src", picture);
        portrait.alt = `Photo de profil de ${name}`;

        header.insertBefore(info, button);
        header.insertBefore(portrait, button);

        const locations = document.createElement( 'h3' );
        locations.textContent = `${city}, ${country}`;
        locations.classList.add('country');
        locations.ariaLabel = `${city}, ${country}`;

        return (header);
    }

    function getUserPortrait(){

    }

    return { getUserCardDOM, photographerProfile, getUserPortrait };
}

