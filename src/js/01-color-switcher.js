//

const startBttn = document.querySelector("[data-start]");
const stopBttn = document.querySelector("[data-stop]");
const bodyColor = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timeId = null;
startBttn.disabled = false;

startBttn.addEventListener("click", () => {
timeId = setInterval(() => {
    startBttn.disabled = true;

  bodyColor.style.backgroundColor = getRandomHexColor();
}, 1000);

});

stopBttn.addEventListener("click", () => {
clearInterval(timeId);
startBttn.disabled = false;
});

// function centerButton(element) {
//   element.style.position = "relative";
//   element.style.left = "47%";
// }

// centerButton(startBtn);
// centerButton(stopBtn);