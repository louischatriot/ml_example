var xdims = ['Visa', 'MasterCard']
  , ydims = ['FR', 'ES', 'IT']   // y axis within every x axis element
  , world1 = [[0, 1, 0], [0, 0, 1]]   // ES Visa and IT MasterCard is always fraudulent
  , world2 = [[0.7, 0, 0.8], [0, 0, 0]]
  , world3 = [[0, 0, 0], [0.9, 0.8, 0.8]]
  , algoView = []
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

function simulateMultipleEvents (n) {
  for (var i = 0; i < n; i += 1) { simulateOneEvent(); }
}





// Drawing functions, very dirty ...
function drawTable (table) {
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

  document.getElementById("container").innerHTML = tableHtml;
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


// TEST
currentWorld = world1;
