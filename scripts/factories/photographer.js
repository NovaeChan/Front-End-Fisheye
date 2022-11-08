function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;
    
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.id = id;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.style.borderRadius = "50%";
        img.alt = `Photo de profil de ${name}`;

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        //Creer div + ajouter les p à la div
        const blockDescription = document.createElement( 'div' );
        blockDescription.style.textAlign = 'center';
        blockDescription.style.margin = '-10px';

        const locations = document.createElement( 'p' );
        locations.textContent = `${city}, ${country}`;
        locations.style.color = "#901C1C";
        locations.classList.add('country');

        const tag = document.createElement( 'p' );
        tag.classList.add('tagline');
        tag.textContent = `${tagline}`;

        const cost = document.createElement( 'p' );
        cost.classList.add('price');
        cost.style.fontStyle = "italic";
        cost.style.color = "#525252";
        cost.textContent = `${price}€/jour`;

        article.appendChild(img);
        article.appendChild(h2);
        blockDescription.appendChild(locations);
        blockDescription.appendChild(tag);
        blockDescription.appendChild(cost);

        article.appendChild(blockDescription);
        return (article);
    }
    return { getUserCardDOM }
}