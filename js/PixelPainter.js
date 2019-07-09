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
  for (let i = 0; i < 100; i++) {
    // creates a table row
    let row = document.createElement("tr");

    for (let j = 0; j < 200; j++) {
      // Create a <td> element and put the <td> at
      // the end of the table row
      let cell = document.createElement("td");
      cell.className = "canvasCells";
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  canvas.appendChild(tbl);

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

  let mouseDown = 0;

  document.body.onmouseup = function() {
    mouseDown = 0;
  };

  let colorStored = "ffffff";

  let colorPicked = document.querySelectorAll(".paletteCells");
  colorPicked.forEach(cell => {
    cell.addEventListener("click", () => {
      colorStored = cell.style.backgroundColor;
    });
  });

  let erasePicked = document.querySelector("#erase");
  erasePicked.addEventListener("click", fillCell);
  function fillCell() {
    colorStored = "ffffff";
  }

  let clearPicked = document.querySelector("#clear");
  clearPicked.addEventListener("click", fillCells);

  function fillCells() {
    let canvasCells = document.getElementsByClassName("canvasCells");
    for (let i = 0; i < canvasCells.length; i++) {
      canvasCells[i].style.backgroundColor = "ffffff";
    }
  }

  let clickPix = document.querySelectorAll("td");
  for (let i = 0; i < clickPix.length; i++) {
    clickPix[i].addEventListener("mousedown", function() {
      mouseDown = 1;
    });

    clickPix[i].addEventListener("click", fillCell);
    function fillCell(e) {
      this.style.backgroundColor = colorStored;
    }

    clickPix[i].addEventListener("mouseover", fillCellDrag);
    function fillCellDrag() {
      if (mouseDown === 1) {
        this.style.backgroundColor = colorStored;
      }
    }
  }
}
draw();
