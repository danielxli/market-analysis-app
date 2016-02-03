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

function pickThreeRandomFrom(array) {
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
}

function incrementVotes(targetObject) {
  for (prod in products) {
    if (products[prod].productName === targetObject) {
      products[prod].votes += 1
    }
  }
  voteCounter++
}

function incrementAppearances(targetObject) {
  for (prod in products) {
    if (products[prod].productName === targetObject) {
      products[prod].appearances += 1
    }
  }
}

function updateMessageBox(message) {
  var messageEl = document.getElementById('message-box');
  messageEl.innerHTML = ''
  createTextElAndAppend('h2', message, messageEl);
}

function createTextElAndAppend(type, content, whereToAppend) {
  var el = document.createElement(type);
  el.innerHTML = content;
  whereToAppend.appendChild(el);
}

function createImgAndAppend(path, id, whereToAppend) {
  var image = document.createElement('img');
  image.src = path;
  image.id = id;
  whereToAppend.appendChild(image);
}

function displayThreeImages(products) {
  var imgArray = pickThreeRandomFrom(products);
  for (i = 0; i < imgArray.length; i++) {
    createTextElAndAppend('h3', imgArray[i].productName, document.getElementById('photo'+(i+1)));
    createImgAndAppend('assets/' + imgArray[i].productName +'.jpg', imgArray[i].productName, document.getElementById('photo'+(i+1)));
    incrementAppearances(imgArray[i].productName);
  }
}

document.addEventListener('click', function() {
  incrementVotes(event.target.id);
  var photoBoxEls = document.getElementsByClassName('photoBoxes');
  for (i = 0; i < photoBoxEls.length; i++) {
    photoBoxEls[i].innerHTML = '';
  }
  displayThreeImages(products);
  updateMessageBox('Please vote ' + (15-voteCounter) + ' more times');

  if (voteCounter > 14) {
    displayResults();
    voteCounter = 0;
  }
});

function displayResults () {
  products.sort(function(a,b) {
    return b.votes - a.votes;
  })
  for (prod in products) {
    console.log(products[prod].productName + " Appearances: " + products[prod].appearances);
    console.log(products[prod].productName + " Votes: " + products[prod].votes);
  }
}


updateMessageBox('click an image!');
displayThreeImages(products);
