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
    return { getUserCardDOM };
}

