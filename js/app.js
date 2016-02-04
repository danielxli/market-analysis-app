var productNames = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can', 'wine_glass'];
var products = [];
var voteCounter = 0;

function Product (name) {
  this.productName = name;
  this.votes = 0;
  this.appearances = 0;
  products.push(this);
}

for (name in productNames) {
  new Product(productNames[name]);
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

  updateMessageBox: function(message) {
    var messageEl = document.getElementById('message-box');
    messageEl.innerHTML = ''
    this.createTextElAndAppend('h2', message, messageEl);
  },

  createTextElAndAppend: function(type, content, whereToAppend) {
    var el = document.createElement(type);
    el.innerHTML = content;
    whereToAppend.appendChild(el);
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
    this.createTextElAndAppend('th','',trEl);
    this.createTextElAndAppend('th','Votes',trEl);
    this.createTextElAndAppend('th','Appearances',trEl);
    this.createTextElAndAppend('th','Votes / Appearances',trEl);
    this.createTextElAndAppend('th','Votes / Total Votes',trEl);
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
  }

}

window.addEventListener('load', function() {
  tracker.updateMessageBox('click the item you are most likely to buy!');
  tracker.displayThreeImages(products);
});

document.addEventListener('click', function() {
  tracker.hideResults();
  tracker.incrementVotes(event.target.id);
  tracker.clearPhotos();
  tracker.displayThreeImages(products);
  tracker.updateMessageBox('Please vote ' + (15-voteCounter%15) + ' more times');
  if (voteCounter % 15 === 0) {
    tracker.displayResults();
  }
});
