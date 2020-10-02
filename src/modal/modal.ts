export class Modal {
  constructor() {}
  public assignEventListeners(): void {

    const modalContainer = document.getElementById("modal-container");
    const closeButton = document.getElementsByClassName("close")[0];
    const modalSubmitButton = (<HTMLInputElement>document.getElementById("modalSubmit"));

    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };

    function checkIfDimensionsAreNumber(wf,hf,lf){

      let errorMessage = "";

      let bool = true;

      if(isNumber(wf) == false){
        errorMessage += "Width is not Number! \n";
        bool = false;
      }
      if(isNumber(hf) == false){
        errorMessage += "Height is not Number! \n";
        bool = false;
      }
      if(isNumber(lf) == false){
        errorMessage += "Lenght is not Number! \n"
        bool = false;
      }
      if(bool === false){
        alert(errorMessage);
      }  
      return bool;
    }

    function modalSubmit(event) {
      event.preventDefault();

      const wf = (<HTMLInputElement>document.getElementById("WidthForm")).value;
      const hf = (<HTMLInputElement>document.getElementById("HeightForm")).value;
      const lf = (<HTMLInputElement>document.getElementById("LengthForm")).value;

      let checkNumbers = checkIfDimensionsAreNumber(wf,hf,lf);

      if(checkNumbers === false){

        console.log("Error in numbers");

      }else{
      //send options data to backend
      const options = {
        method: 'POST',
        body: JSON.stringify({wf, hf, lf}),
        headers: {
          'Content-Type': 'application/json',
          }
        };
        console.log(options.body);
      }//else ends
    };

    modalSubmitButton.addEventListener("click", function(event){
    modalSubmit(event)
    });

    closeButton.addEventListener("click", function () {
      modalContainer.style.display = "none";
    });

    window.addEventListener("click", function (event) {
      if (event.target == modalContainer) {
        modalContainer.style.display = "none";
      }
    });
  }
}
