const button = document.querySelector(".contact_button");
const contactModal = document.getElementById("contact_modal");
const modal = document.querySelector('.modal');
const closeButton = modal.querySelector('img');
const form = document.querySelector('form');
const mainWrapper = document.querySelector('main');

button.addEventListener("click", () => {
    contactModal.style.display = "block";
    mainWrapper.setAttribute('aria-hidden', 'true');
    mainWrapper.className = 'no-scroll';
    contactModal.setAttribute('aria-hidden', 'false');
    closeButton.focus();
    closeButton.addEventListener('keydown', (event) => {
        switch(event.key){
            case "Escape":
            case "Enter":
                closeModal();
                break;
            default :
                break;
        }
    });
    document.addEventListener("keypress", (event) => {
        if(event.key === 'Escape'){
            closeModal();
        }
    })
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(getFormInput());
})

function closeModal() {
    contactModal.style.display = "none";
    mainWrapper.style.filter = 'none';
    mainWrapper.setAttribute('aria-hidden', 'false');
    mainWrapper.className = 'scroll';
    contactModal.setAttribute('aria-hidden', 'true');
    button.focus();
}

function getFormInput(){
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let yourMessage = document.getElementById('yourMessage').value;

    return {firstName, lastName, email, yourMessage};
}