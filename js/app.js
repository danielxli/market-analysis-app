var productNames = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can', 'wine_glass'];
var products = [];
var voteCounter = 0;
var data = {
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


function Product (name) {
  this.productName = name;
  this.votes = 0;
  this.appearances = 0;
  products.push(this);
}

var tracker = {
  pickThreeRandomFrom: function(array) {
    var randomPositionInArray = 0;
    var tempArray = [];
    for (i = 0; i < 3; i++ ) {
      randomPositionInArray = Math.floor(Math.random() * array.length);
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

  hideResults: function() {
    document.getElementById('results-section').innerHTML ='';
  },

  clearPhotos: function() {
    var photoBoxEls = document.getElementsByClassName('photoBoxes');
    for (i = 0; i < photoBoxEls.length; i++) {
      photoBoxEls[i].innerHTML = '';
    }
  },

  prepData: function() {
    data.labels = [];
    data.datasets[0].data = [];
    data.datasets[1].data = [];
    products.sort(function(a,b) {
      return b.votes - a.votes;
    })

    for (prod in products) {
      console.log(products[prod]);
      data.labels.push(products[prod].productName);
      data.datasets[0].data.push(products[prod].appearances - products[prod].votes);
      data.datasets[1].data.push(products[prod].votes);
    }
  },

  createChart: function() {
    tracker.prepData();
    var ctx = document.getElementById("myChart").getContext("2d");
    var myNewChart = new Chart(ctx).StackedBar(data);
  },

  onClick: function() {
    tracker.hideResults();
    tracker.incrementVotes(event.target.id);
    tracker.clearPhotos();
    tracker.displayThreeImages(products);
    tracker.updateMessageBox('Please vote ' + (15 - voteCounter % 15) + ' more times');
    if (voteCounter % 15 === 0) {
      tracker.displayResults();
      tracker.createChart();
    }
  }
}

window.onload = function() {
  for (name in productNames) {
    new Product(productNames[name]);
  }
  tracker.updateMessageBox('click the item you are most likely to buy!');
  tracker.displayThreeImages(products);
  document.addEventListener('click', tracker.onClick);
};
