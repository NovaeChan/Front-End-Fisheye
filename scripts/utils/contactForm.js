const button = document.querySelector(".contact_button");
const contactModal = document.getElementById("contact_modal");
const modal = document.querySelector('.modal');
const form = document.querySelector('form');

//Faire un tabindex + sur échap ajouter la fermeture de la modal
button.addEventListener("click", () => {
    contactModal.style.display = "block";
    main.setAttribute('aria-hidden', 'true');
    main.className = 'no-scroll';
    contactModal.setAttribute('aria-hidden', 'false');
    modal.querySelector('img').focus();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(getFormInput());
})

function closeModal() {
    contactModal.style.display = "none";
    main.style.filter = 'none';
}

function getFormInput(){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let yourMessage = document.getElementById('yourMessage').value;

    return {firstName, lastName, email, yourMessage};
}