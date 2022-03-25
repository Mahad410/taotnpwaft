function handleBtnClick(event) {
  toggleButton(event.target);
  //resetFontSize(event.target);
}

function toggleButton(element) {
  var pressed = (element.getAttribute("aria-pressed") === "true");

  // Check to see if the button is pressed
  // case (element.getAttribute(id))
  switch (element.getAttribute("id")) {
    case "small":
      document.getElementById("small").setAttribute("aria-pressed", !pressed);
      document.getElementById("medium").setAttribute("aria-pressed", false);
      document.getElementById("large").setAttribute("aria-pressed", false);
      break;

    case "medium":
      document.getElementById("small").setAttribute("aria-pressed", false);
      document.getElementById("medium").setAttribute("aria-pressed", !pressed);
      document.getElementById("large").setAttribute("aria-pressed", false);
      break;

    case "large":
      document.getElementById("small").setAttribute("aria-pressed", false);
      document.getElementById("medium").setAttribute("aria-pressed", false);
      document.getElementById("large").setAttribute("aria-pressed", !pressed);
      break;
  }
  // Change aria-pressed to the opposite state
  //   		element.setAttribute("aria-pressed", !pressed);
  // if(element.getAttribute("aria-pressed") === "false") {
  // 	document.getElementById("resetButton").click();
  // }

}



function resizeText(multiplier) {
  if (document.body.style.fontSize == "") {
    document.body.style.fontSize = "1.0em";
  }
  document.body.style.fontSize = parseFloat(document.body.style.fontSize) + (multiplier * 0.2) + "em";