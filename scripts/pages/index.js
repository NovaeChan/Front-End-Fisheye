    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        try {
            const response = await fetch('./data/photographers.json');
            const photographers = await response.json();
            const onlyPhotographers = photographers.photographers;
            return onlyPhotographers;
        } catch (error) {
            //Afficher une erreur sur la page en cas d'une erreur
            console.error(`An error occured : ${error}`);
            const errorElement = document.createElement('h2');
            errorElement.classList.add('photographers_error');
            errorElement.textContent = 'Erreur lors de la récupération des données des photographes.';
            errorElement.style.textAlign = 'center';
            const main = document.querySelector('main');
            main.appendChild(errorElement);
            return { photographers: [] };
        }
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        try{
            photographers.forEach((photographer) => {
                const photographerModel = photographerFactory(photographer);
                const userCardDOM = photographerModel.getUserCardDOM();
                photographersSection.appendChild(userCardDOM);
            });
        }
        catch(error){
            console.error(`An error occured : ${error}`);
        }
    }

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    }
    
    init();