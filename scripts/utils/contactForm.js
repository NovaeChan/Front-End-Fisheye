const buttons = document.querySelectorAll(".contact_button");
const main = document.querySelector('main');
const contactModal = document.getElementById("contact_modal");
const modal = document.querySelector('.modal');

//Faire un tabindex + sur échap ajouter la fermeture de la modal
buttons.forEach(button => {
    button.addEventListener("click", () => {
        contactModal.style.display = "block";
        main.style.filter = 'blur(1px)';
        main.setAttribute('aria-hidden', 'true');
        main.className = 'no-scroll';
        contactModal.setAttribute('aria-hidden', 'false');
        modal.focus();
    });
});

function closeModal() {
    contactModal.style.display = "none";
    main.style.filter = 'none';
}
