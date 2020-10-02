export class Modal {
  constructor() {}
  public assignEventListeners(): void {

    const modalContainer = document.getElementById("modal-container");
    const closeButton = document.getElementsByClassName("close")[0];
    const modalSubmitButton = document.getElementById("modalSubmit");
/*
    function checkDimension (, password, full_name, email){
      return fetch(apiUrl + 'users/', {
        const fd = new FormData();
        fd.append('title', "Reply");
        fd.append('description', this.state.file.description);
        fd.append('file', this.state.file.filedata);
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password, full_name, email}),
      }).then(response => response.json()).then(json => {
        return json;
      });
    };*/

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
