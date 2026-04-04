class Product {
    constructor(title, description, url) {
        this.title = title;
        this.description = description;
        this.url = url;
    }
}

class HeroCrousel {
    constructor (imgUrl){
        this.url = imgUrl;
    }
}

const heroCrouselImg = [new HeroCrousel("../Images/herocrousal/image1.jpg"), new HeroCrousel("../Images/herocrousal/image2.jpg")];

const data = [new Product("Kaspersky", "Antivirus", "../Images/ProductImage/product1.jpg"),
new Product("Acronis", "Back Up Software", "../Images/ProductImage/product2.jpg"),
new Product("Bytescreen", "Firewall and Sd Wan", "../Images/ProductImage/product3.jpg")
];

module.exports = {data,heroCrouselImg};