const button = document.querySelector(".contact_button");
// const main = document.querySelector('main');
const contactModal = document.getElementById("contact_modal");
const modal = document.querySelector('.modal');
const form = document.querySelector('form');

//Faire un tabindex + sur échap ajouter la fermeture de la modal
button.addEventListener("click", () => {
    contactModal.style.display = "block";
    main.setAttribute('aria-hidden', 'true');
    main.className = 'no-scroll';
    contactModal.setAttribute('aria-hidden', 'false');
    console.log(modal.querySelector('img'));
    // .focus();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(event);
})

function closeModal() {
    contactModal.style.display = "none";
    main.style.filter = 'none';
}
