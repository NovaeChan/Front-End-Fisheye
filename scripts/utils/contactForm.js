//TODO : AJOUTER LES TABINDEX + ROLE + ARIA : VOIR LA MAQUETTE FIGMA
const button = document.querySelector(".contact_button");
const contactModal = document.getElementById("contact_modal");
const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('img');
const form = document.querySelector('form');
const mainWrapper = document.querySelector('main');
const body = document.querySelector('body');
let contactModalOpened = false;

button.addEventListener('click', () => {
    openModal();
});

closeButton.addEventListener('keypress', (event) => {
    if(event.key == 'Enter'){
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if(contactModalOpened){
        if(event.key == 'Escape'){
            closeModal();
        }
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(getFormInput());
    closeModal();
})

function openModal(){
    contactModal.style.display = "block";
    mainWrapper.setAttribute('aria-hidden', 'true');
    body.className = 'no-scroll';
    contactModal.setAttribute('aria-hidden', 'false');
    closeButton.focus();
    contactModalOpened = true;
}

function closeModal() {
    contactModal.style.display = "none";
    mainWrapper.style.filter = 'none';
    mainWrapper.setAttribute('aria-hidden', 'false');
    body.className = 'scroll';
    contactModal.setAttribute('aria-hidden', 'true');
    contactModalOpened = false;
    button.focus();
}

function getFormInput(){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let yourMessage = document.getElementById('yourMessage').value;

    return {firstName, lastName, email, yourMessage};
}