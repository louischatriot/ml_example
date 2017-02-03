var xdims = ['Visa', 'MasterCard']
  , ydims = ['FR', 'ES', 'IT']   // y axis within every x axis element
  , world1 = [[0, 1, 0], [0, 0, 1]]   // ES Visa and IT MasterCard is always fraudulent
  , world2 = [[0.7, 0, 0.8], [0, 0, 0]]
  , world3 = [[0, 0, 0], [0.9, 0.8, 0.8]]
  , algoView = []
  , stepTime = 2000   // In ms
  , currentWorld
  ;

// Initialize the algorithm's view of the world
// Let's say optimistic but not fine grained
for (var i = 0; i < xdims.length; i += 1) {
  algoView.push([]);
  for (var j = 0; j < ydims.length; j += 1) {
    algoView[i].push({ nf: 10, f: 2 });
  }
}


function simulateOneEvent () {
  var i = Math.floor(2 * Math.random())
    , j = Math.floor(3 * Math.random())
    , isFraud = (currentWorld[i][j] >= Math.random())
    ;

  if (isFraud) { algoView[i][j].f += 1; } else { algoView[i][j].nf += 1; }
}

// When calling this function, only use the first parameter
function simulateMultipleEvents (n, lastTimestamp, startTimestamp) {
  if (lastTimestamp === undefined) {
    lastTimestamp = Date.now();
    startTimestamp = Date.now();
  }

  var newTimestamp = Date.now()
    , steps = Math.floor(n * (newTimestamp - lastTimestamp) / stepTime);

  for (var i = 0; i < steps; i += 1) { simulateOneEvent(); }
  drawAlgo();

  // Means we can have a bit more than n steps actually
  if (newTimestamp - startTimestamp < stepTime) {
    setTimeout(function () {
      simulateMultipleEvents(n, newTimestamp, startTimestamp);
    }, 10);   // Max 10 fps
  }
}





// Drawing functions, very dirty ...
function drawTable (table, id) {
  var tableHtml = '<table>';

  tableHtml += "<tr>";
  tableHtml += "<td>";
  tableHtml += "</td>";
  for (var j = 0; j < ydims.length; j += 1) {
    tableHtml += "<td>";
    tableHtml += ydims[j];
    tableHtml += "</td>";
  }
  tableHtml += "</tr>";


  for (var i = 0; i < table.length; i += 1) {
    tableHtml += "<tr>";
    tableHtml += "<td>";
    tableHtml += xdims[i];
    tableHtml += "</td>";
    for (var j = 0; j < table[i].length; j += 1) {
      tableHtml += "<td>";
      tableHtml += Math.floor(100 * table[i][j]) + "%";
      tableHtml += "</td>";
    }
    tableHtml += "</tr>";
  }
  tableHtml += "<table>";

  document.getElementById(id).innerHTML = tableHtml;
}

function getFraudPercentageTable () {
  var res = [];

  for (var i = 0 ; i < algoView.length; i += 1) {
    res.push([]);
    for (var j = 0 ; j < algoView[i].length; j += 1) {
      res[i].push(algoView[i][j].f / (algoView[i][j].f + algoView[i][j].nf));
    }
  }

  return res;
}

function drawWorld (world) {
  drawTable(world, "world-table");
}

function drawAlgo () {
  drawTable(getFraudPercentageTable(), "algo-table");
}

function changeWorld (world) {
  currentWorld = world;
  drawWorld(world);
}


// INIT
currentWorld = world1;
drawWorld(world1);
drawAlgo();
