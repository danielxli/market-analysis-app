var productNames = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can', 'wine_glass'];
var products = [];
var voteCounter = 0;
var barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Appearances - Votes",
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "Votes",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(151,187,205,0.75)",
            highlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
var doughnutData = [];

function Product (name) {
  this.productName = name;
  this.votes = 0;
  this.appearances = 0;
  products.push(this);
}

var tracker = {
  pickThreeRandomFrom: function(array) {
    array.sort(function(a,b) {
      return a.appearances - b.appearances;
    })
    var randomPositionInArray = 0;
    var tempArray = [];
    tempArray.push(array.splice(randomPositionInArray,1)[0]);
    for (i = 0; i < 2; i++ ) {
      randomPositionInArray = Math.floor(Math.random() * array.length) - 1;
      tempArray.push(array.splice(randomPositionInArray,1)[0]);
    }
    for (i = 0; i < tempArray.length; i++) {
      array.push(tempArray[i]);
    }
    return tempArray;
  },

  incrementVotes: function(targetObject) {
    for (prod in products) {
      if (products[prod].productName === targetObject) {
        products[prod].votes += 1
      }
    }
    voteCounter++
  },

  incrementAppearances: function(targetObject) {
    for (prod in products) {
      if (products[prod].productName === targetObject) {
        products[prod].appearances += 1
      }
    }
  },

  createTextElAndAppend: function(type, content, whereToAppend) {
    var el = document.createElement(type);
    el.innerHTML = content;
    whereToAppend.appendChild(el);
  },

  updateMessageBox: function(message) {
    var messageEl = document.getElementById('message-box');
    messageEl.innerHTML = ''
    this.createTextElAndAppend('h2', message, messageEl);
  },

  createImgAndAppend: function(path, id, whereToAppend) {
    var image = document.createElement('img');
    image.src = path;
    image.id = id;
    whereToAppend.appendChild(image);
  },

  displayThreeImages: function(products) {
    var imgArray = this.pickThreeRandomFrom(products);
    for (i = 0; i < imgArray.length; i++) {
      this.createTextElAndAppend('h3', imgArray[i].productName, document.getElementById('photo'+(i+1)));
      this.createImgAndAppend('assets/' + imgArray[i].productName +'.jpg', imgArray[i].productName, document.getElementById('photo'+(i+1)));
      this.incrementAppearances(imgArray[i].productName);
    }
  },

  displayResults: function() {
    document.getElementById('results-section').innerHTML = '';
    products.sort(function(a,b) {
      return b.votes - a.votes;
    })
    var tableEl = document.createElement('table');
    var trEl = document.createElement('tr');
    this.createTextElAndAppend('th', '', trEl);
    this.createTextElAndAppend('th', 'Votes', trEl);
    this.createTextElAndAppend('th', 'Appearances', trEl);
    this.createTextElAndAppend('th', 'Votes / Appearances', trEl);
    this.createTextElAndAppend('th', 'Votes / Total Votes', trEl);
    tableEl.appendChild(trEl);
    for (prod in products) {
      var trEl = document.createElement('tr');
      this.createTextElAndAppend('th', products[prod].productName, trEl);
      this.createTextElAndAppend('td', products[prod].votes, trEl);
      this.createTextElAndAppend('td', products[prod].appearances, trEl);
      this.createTextElAndAppend('td', Math.round(products[prod].votes/products[prod].appearances*100) + "%", trEl);
      this.createTextElAndAppend('td', Math.round(products[prod].votes/voteCounter*100) + "%", trEl);
      tableEl.appendChild(trEl);
    }
    document.getElementById('results-section').appendChild(tableEl);
  },

  hideSection: function(sectionId) {
    document.getElementById(sectionId).style.display = 'none';
  },

  unhideSection: function(sectionId, displayType) {
    document.getElementById(sectionId).style.display = displayType;
  },

  clearPhotos: function() {
    var photoBoxEls = document.getElementsByClassName('photoBoxes');
    for (i = 0; i < photoBoxEls.length; i++) {
      photoBoxEls[i].innerHTML = '';
    }
  },

  prepData: function() {
    barData.labels = [];
    barData.datasets[0].data = [];
    barData.datasets[1].data = [];
    doughnutData = [];
    products.sort(function(a,b) {
      return b.votes - a.votes;
    })

    for (prod in products) {
      barData.labels.push(products[prod].productName);
      barData.datasets[0].data.push(products[prod].appearances - products[prod].votes);
      barData.datasets[1].data.push(products[prod].votes);

      var doughnutObj = {};
      doughnutObj.value = products[prod].votes;
      doughnutObj.label = products[prod].productName;
      doughnutData.push(doughnutObj);
    }
  },

  createChart: function(chartId) {
    document.getElementById('chart-section').innerHTML= '';
    tracker.prepData();

    tracker.createTextElAndAppend('h3', 'Voting Results (Bar)', document.getElementById('chart-section'));
    var can = document.createElement('canvas');
    can.width = '800';
    can.height = '500';
    can.id = chartId;
    document.getElementById('chart-section').appendChild(can);
    var ctx = document.getElementById(chartId).getContext("2d");
    var myNewChart = new Chart(ctx).StackedBar(barData);
    tracker.createTextElAndAppend('p', 'The blue bar is number of votes, height of blue + gray bar is total appearances.', document.getElementById('chart-section'));

    tracker.createTextElAndAppend('h3', 'Voting Results (Doughnut)', document.getElementById('chart-section'));
    var can2 = document.createElement('canvas');
    can2.width = '800';
    can2.height = '500';
    can2.id = 'pieChart';
    document.getElementById('chart-section').appendChild(can2);
    var ctx = document.getElementById('pieChart').getContext("2d");
    var myNewChart = new Chart(ctx).Doughnut(doughnutData);
  },

  onClick: function() {
    if(String(event.target).indexOf('Image') > 0) {
      tracker.incrementVotes(event.target.id);
      tracker.clearPhotos();
      tracker.displayThreeImages(products);
      tracker.updateMessageBox('Please vote ' + (15 - voteCounter % 15) + ' more times');
      tracker.saveData()
      if (voteCounter % 15 === 0) {
        tracker.updateMessageBox("Click to see your results!");
        tracker.createTextElAndAppend('button', 'Show Results', document.getElementById('message-box'));
        document.getElementsByTagName('button')[0].addEventListener('click', tracker.resultsClick);
        tracker.hideSection('photoBoxParent')
      }
    } else {
      // tracker.updateMessageBox('Click an image, dummy!');
    }
  },

  resultsClick: function() {
    // tracker.displayResults();
    tracker.createChart('myChart');
    tracker.unhideSection('chart-section', 'block');
    tracker.updateMessageBox("Here are your results!");
    tracker.createTextElAndAppend('button', 'Keep Voting!', document.getElementById('message-box'));
    document.getElementsByTagName('button')[0].addEventListener('click', tracker.startVoting);
    tracker.createTextElAndAppend('button', 'Reset Data', document.getElementById('message-box'));
    document.getElementsByTagName('button')[1].addEventListener('click', tracker.resetData);
    document.getElementsByTagName('button')[1].addEventListener('click', tracker.startVoting);
  },

  startVoting: function() {
    tracker.unhideSection('photoBoxParent', 'flex');
    tracker.hideSection('chart-section');
    tracker.clearPhotos();
    tracker.updateMessageBox('Please click the item you are most likely to buy!');
    tracker.displayThreeImages(products);
  },

  saveData: function() {
    localStorage.setItem('data', JSON.stringify(products));
  },

  loadData: function() {
    products = JSON.parse(localStorage.getItem('data'));
  },

  resetData: function() {
    localStorage.removeItem('data');
    window.location.reload();
  }

}

window.onload = function() {
  if (!localStorage.getItem('data')) {
    for (name in productNames) {
      new Product(productNames[name]);
    }
  } else {
    tracker.loadData();
  }
  tracker.updateMessageBox('Please click the item you are most likely to buy!');
  tracker.displayThreeImages(products);
  document.addEventListener('click', tracker.onClick);
};
