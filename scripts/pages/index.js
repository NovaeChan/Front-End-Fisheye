    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        try {
            const response = await fetch('./data/photographers.json');
            const photographers = await response.json();
            const onlyPhotographers = photographers.photographers;
            console.log(onlyPhotographers);
            return onlyPhotographers;
        } catch (error) {
            console.error(`An error occured : ${error}`);
        }
        
        // return ({
        //     photographers: [...onlyPhotographers]
        // });
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        console.log(photographers);
        displayData(photographers);
    }
    
    init();