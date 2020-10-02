export class Modal {
  constructor() {}
  public assignEventListeners(): void {

    const modalContainer = document.getElementById("modal-container");
    const closeButton = document.getElementsByClassName("close")[0];
    const modalSubmitButton = document.getElementById("modalSubmit");

    function modalSubmit(event) {
      event.preventDefault();

      const wf = document.getElementById("WidthForm").value;
      const hf = document.getElementById("HeightForm").value;
      const lf = document.getElementById("LengthForm").value;

      console.log("submit modal form");

      //send options data to backend
      const options = {
        method: 'POST',
        body: JSON.stringify({wf, hf, lf}),
        headers: {
          'Content-Type': 'application/json',
          }
        };
        console.log(options.body);
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
