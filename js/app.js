var productNames = ['bag', 'banana', 'boots', 'chair', 'cthulhu', 'dragon', 'pen', 'scissors', 'shark', 'sweep', 'unicorn', 'usb', 'water_can', 'wine_glass'];
var products = [];

function Product (name) {
  this.productName = name;
  this.votes = 0;
  this.appearances = 0;
  products.push(this);
}

for (name in productNames) {
  new Product(productNames[name]);
}

var Tracker = {

}
