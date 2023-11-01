let myFrame = [];

//page load
window.addEventListener("load", function () {

  document.getElementById("selecFrame").addEventListener("change", chooseFrame);

  //big long string to parse
  let frameData = "Silver with Gold Wood Picture Frame,N116,1.10|Dark Brown Wood Picture Frame,AT3335,0.90|Dark Brown Wood Picture Frame,AT3332,0.90|Espresso Wood Picture Frame,97341,2.50|Beaded Black Wood Picture Frame,16344,1.20|Black with Gold Leaf Wood Picture Frame,44541,2.50";

  //parse/split the data first on the # delimiter
  let frameDataLines = frameData.split("|");

  //loop over results of above splitting
  frameDataLines.forEach((el, i) => {
    //second parsing on | delimiter
    let subdata = el.split(",");
    //instantiate an object (an element of an array of objects)
    myFrame[i] = new framesClass(...subdata);
    //alert(myFrame[i].Title);
  });

  //load up Songs into select
  let mySelect = document.getElementById("selecFrame");
  for (let i = 0; i < myFrame.length; i++) {
    let myOption = document.createElement("option");
    myOption.text = myFrame[i].Desc;
    myOption.value = i;
    mySelect.appendChild(myOption);
  }

  // trigger a change event for the drop-down select
  let event = new Event('change');
  mySelect.dispatchEvent(event);

});

function chooseFrame() {
  let myIndex = document.getElementById("selecFrame").value;
  let userFrame = myFrame[myIndex];
  document.getElementById("imgPlace").src = userFrame.Code + ".jpg";
}

document.getElementById("calculatePrice").addEventListener("click", calculate)
function calculate() {
  let myIndex = document.getElementById("selecFrame").value;
  let userFrame = myFrame[myIndex];
  let Width = parseFloat(document.getElementById("width").value);
  if (isNaN(Width)) {
    alert("Problem with value entered for Width");
    return;
  }
  let Height = parseFloat(document.getElementById("height").value);
  if (isNaN(Height)) {
    alert("Problem with value entered for Height");
    return;
  }
  let factor = userFrame.Factor;

  let price = 10.40 + factor * (Width + Height)
  document.getElementById("Calculation").value = "A(n) " + Width + " by " + Height + " " + userFrame.Code + " would be" + " $" + Math.round(price) + ".";
}
let total = 0;
document.getElementById("AddToCart").addEventListener("click", AddCart)
function AddCart() {
  let myIndex = document.getElementById("selecFrame").value;
  let userFrame = myFrame[myIndex];
  let Width = parseFloat(document.getElementById("width").value);
  if (isNaN(Width)) {
    alert("Problem with value entered for Width");
    return;
  }
  let Height = parseFloat(document.getElementById("height").value);
  if (isNaN(Height)) {
    alert("Problem with value entered for Height");
    return;
  }
  let factor = userFrame.Factor;

  let price = 10.40 + factor * (Width + Height)

  total = total + price;
  document.getElementById("total").value = Math.round(total);
  document.getElementById("solution").value = "A(n) " + Width + " by " + Height + " " + userFrame.Code + " would be" + " $" + Math.round(price) + ".";;
}