var ctx;
var myNewChart;

var barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First Dataset",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second Dataset",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

var lineData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First Dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second Dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

function randomizeData() {
  for (i = 0; i < barData.datasets.data.length; i++) {
    barData.datasets.data[i] = Math.floor(Math.random() * 100);
  }
  myNewChart.update()
}

function clearCanvas() {
  var parentEl = document.getElementById('chart-section');
  while (parentEl.getElementsByTagName('canvas')[0]) {
    parentEl.removeChild(parentEl.getElementsByTagName('canvas')[0]);
  }
  var canvasEl = document.createElement('canvas');
  canvasEl.id = "myChart";
  canvasEl.width = "800";
  canvasEl.height = "500";
  parentEl.appendChild(canvasEl);
}

function loadBarChart() {
  clearCanvas();
  ctx = document.getElementById("myChart").getContext("2d");
  myNewChart = new Chart(ctx).Bar(barData);
}

function loadStackedBar() {
  clearCanvas();
  ctx = document.getElementById("myChart").getContext("2d");
  myNewChart = new Chart(ctx).StackedBar(barData);
}

function loadLineChart() {
  clearCanvas();
  document.getElementById("myChart").innerHTML = '';
  ctx = document.getElementById("myChart").getContext("2d");
  myNewChart = new Chart(ctx).Line(lineData);
}

window.onload = function() {
  loadBarChart();
};

document.addEventListener('click', function() {
  var selection = event.target.id;
  console.log(event.target.id);

  if (String(selection).indexOf("stacked") >= 0 ) {
    loadStackedBar();
  } else if (String(selection).indexOf("bar") >= 0 ) {
    loadBarChart();
  } else if (selection.indexOf("line") >= 0 ) {
    loadLineChart();
  } else if (selection.indexOf("randomize") >= 0 ) {
    randomizeData();
  }


});
