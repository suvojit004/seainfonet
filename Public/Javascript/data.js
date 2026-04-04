class Product {
  constructor(title, description, url) {
    this.title = title;
    this.description = description;
    this.url = url;
  }
}


const data = [new Product(
  "Kaspersky",
  "Antivirus",
  "../Images/ProductImage/product1.jpg"
),
new Product("Acronis","Back Up Software","../Images/ProductImage/product1.jpg"),
new Product("Bytescreen","Firewall and Sd Wan", "../Images/ProductImage/product1.jpg")
];

module.exports = data;