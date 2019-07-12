function draw() {
  let painterWrapper = document.createElement("div");
  painterWrapper.id = "painter";
  document.body.appendChild(painterWrapper);

  let buttonsWrapper = document.createElement("div");
  buttonsWrapper.id = "buttons";
  painter.appendChild(buttonsWrapper);

  let eraseButton = document.createElement("button");
  eraseButton.id = "erase";
  eraseButton.innerHTML = "erase";
  buttons.appendChild(eraseButton);

  let clearButton = document.createElement("button");
  clearButton.id = "clear";
  clearButton.innerHTML = "clear";
  buttons.appendChild(clearButton);

  let biggerButton = document.createElement("button");
  biggerButton.id = "bigger";
  biggerButton.innerHTML = "size";
  buttons.appendChild(biggerButton);

  let undoButton = document.createElement("button");
  undoButton.id = "undo";
  undoButton.innerHTML = "undo";
  buttons.appendChild(undoButton);

  let redoButton = document.createElement("button");
  redoButton.id = "redo";
  redoButton.innerHTML = "redo";
  buttons.appendChild(redoButton);

  let saveButton = document.createElement("button");
  saveButton.id = "save";
  saveButton.innerHTML = "save";
  buttons.appendChild(saveButton);

  let loadButton = document.createElement("button");
  loadButton.id = "load";
  loadButton.innerHTML = "load";
  buttons.appendChild(loadButton);

  let canvasWrapper = document.createElement("div");
  canvasWrapper.id = "canvas";
  painter.appendChild(canvasWrapper);

  let paletteWrapper = document.createElement("div");
  paletteWrapper.id = "palette";
  painter.appendChild(paletteWrapper);

  // creates a <table> element for canvas and a <tbody> element
  let tbl = document.createElement("table");
  tbl.id = "canvasTbl";
  let tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < 200; i++) {
    // creates a table row
    let row = document.createElement("tr");
    row.className = "canvasTr";

    for (let j = 0; j < 200; j++) {
      // Create a <td> element and put the <td> at
      // the end of the table row
      let cell = document.createElement("td");
      cell.className = "canvasCells";
      cell.id = j + 1 + ", " + (i + 1);
      cell.style.backgroundColor = "ffffff";
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  canvas.appendChild(tbl);

  let xyCoords = document.createElement("div");
  xyCoords.id = "xyCoords";
  //xyCoords.innerHTML = canvasCells.innerHTML;
  canvas.appendChild(xyCoords);

  var colors = [];
  while (colors.length < 50) {
    do {
      var color = Math.floor(Math.random() * 1000000 + 1);
    } while (colors.indexOf(color) >= 0);
    colors.push("#" + ("000000" + color.toString(16)).slice(-6));
  }

  // creates a <table> element for palette and a <tbody> element
  let tbl2 = document.createElement("table");
  tbl2.id = "paletteTbl";
  let tblBody2 = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < 10; i++) {
    // creates a table row
    let row2 = document.createElement("tr");

    for (let j = 0; j < 5; j++) {
      // Create a <td> element and put the <td> at
      // the end of the table row
      let cell2 = document.createElement("td");
      cell2.className = "paletteCells";
      cell2.style.backgroundColor = colors.pop();
      row2.appendChild(cell2);
    }

    // add the row to the end of the table body
    tblBody2.appendChild(row2);
  }

  // put the <tbody> in the <table>
  tbl2.appendChild(tblBody2);
  // appends <table> into <body>
  palette.appendChild(tbl2);

  let selectedColorText = document.createElement("p");
  selectedColorText.id = "selectedColorText";
  selectedColorText.innerHTML = "selected";
  paletteWrapper.appendChild(selectedColorText);

  let selectedColorText2 = document.createElement("p");
  selectedColorText2.id = "selectedColorText2";
  selectedColorText2.innerHTML = "color";
  paletteWrapper.appendChild(selectedColorText2);

  let selectedColor = document.createElement("div");
  selectedColor.id = "selectedColor";
  paletteWrapper.appendChild(selectedColor);

  let mouseDown = 0;

  document.body.onmouseup = function() {
    mouseDown = 0;
  };

  let colorStored = "ffffff";

  let colorPicked = document.querySelectorAll(".paletteCells");
  colorPicked.forEach(cell => {
    cell.addEventListener("click", () => {
      colorStored = cell.style.backgroundColor;
      selectedColor.style.backgroundColor = colorStored;
    });
  });

  let canvasCells = document.querySelectorAll(".canvasCells");

  let erasePicked = document.querySelector("#erase");
  erasePicked.addEventListener("click", fillCell);
  function fillCell() {
    colorStored = "ffffff";
  }

  let clearPicked = document.querySelector("#clear");
  clearPicked.addEventListener("click", fillCells);
  function fillCells() {
    for (let i = 0; i < canvasCells.length; i++) {
      canvasCells[i].style.backgroundColor = "ffffff";
    }
  }

  for (let i = 0; i < canvasCells.length; i++) {
    canvasCells[i].addEventListener("mousedown", function() {
      mouseDown = 1;
    });

    canvasCells[i].addEventListener("click", fillCell);
    function fillCell() {
      canvasCells[i].style.backgroundColor = colorStored;
    }

    canvasCells[i].addEventListener("mouseover", fillCellDrag);
    function fillCellDrag() {
      if (mouseDown === 1) {
        this.style.backgroundColor = colorStored;
      }
    }
  }
}
draw();
