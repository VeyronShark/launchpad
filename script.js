for (let i = 0; i < 100; i++){
  const btn = document.createElement("div");
  btn.classList.add("button");
  const btnContent = document.createElement("div");
  btnContent.classList.add("button-content");
  btn.appendChild(btnContent);
  btn.id = i;
  document.querySelector(".grid-container").appendChild(btn);
}




const buttons = document.querySelectorAll(".button");
const gridLength = Math.sqrt(buttons.length);

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    let outerSquare = getOuterSquare([button]);
    const randomColor = getRandomNeonColor()

    for (let i = 0; i < gridLength / 2; i++){
      setTimeout(() => {
        outerSquare.forEach((square) => {
          square.style.borderColor = randomColor;
          setTimeout(() => {
            square.style.borderColor = "black";
          }, 90);
        })

        outerSquare = getOuterSquare(outerSquare);
      }, 100 * i);
    }
  })
})

function getOuterSquare(squareArray) {
  const indices = squareArray.map(btn => parseInt(btn.id));
  const positions = indices.map(i => ({
    row: Math.floor(i / gridLength),
    col: i % gridLength
  }));

  const rows = positions.map(p => p.row);
  const cols = positions.map(p => p.col);

  const minRow = Math.max(0, Math.min(...rows) - 1);
  const maxRow = Math.min(gridLength - 1, Math.max(...rows) + 1);
  const minCol = Math.max(0, Math.min(...cols) - 1);
  const maxCol = Math.min(gridLength - 1, Math.max(...cols) + 1);

  const outerSquareArray = [];

  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      // Skip if inside the original square
      const isInner =
        r > Math.min(...rows) - 1 &&
        r < Math.max(...rows) + 1 &&
        c > Math.min(...cols) - 1 &&
        c < Math.max(...cols) + 1;
      if (!isInner) {
        const idx = r * gridLength + c;
        outerSquareArray.push(document.getElementById(idx));
      }
    }
  }

  return outerSquareArray;
}

function getRandomNeonColor() {
  const neonColors = [
    "#39FF14", // Neon Green
    "#00FFFF", // Neon Blue
    "#FF00FF", // Neon Magenta
    "#FFFF33", // Electric Yellow
    "#FF5F1F", // Neon Orange
    "#00E7FF", // Bright Cyan
    "#9D00FF", // Neon Purple
    "#FF1493", // Electric Pink
    "#FF073A", // Radiant Red
    "#BFFF00"  // Acid Lime
  ];

  const randomIndex = Math.floor(Math.random() * neonColors.length);
  return neonColors[randomIndex];
}

