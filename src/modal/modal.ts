export class Modal {
  constructor() {}
  public assignEventListeners(): void {

    const modalContainer = document.getElementById("modal-container");
    const closeButton = document.getElementsByClassName("close")[0];
    const modalSubmitButton = document.getElementById("modalSubmit");

    function modalSubmit(event) {
      event.preventDefault();
      console.log("submit modal form");
    }

    modalSubmitButton.addEventListener("click", function(event){
    modalSubmit(event)
    });

    closeButton.addEventListener("click", function () {
      console.log("asds");
      modalContainer.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    });
  }
}
