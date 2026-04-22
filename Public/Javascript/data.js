class Product {
    constructor(title, description, url, buttonText) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.btntxt = buttonText

    }
}
class ResellProduct{
    constructor(name,url){
        this.name = name;
        this.url = url
    }
}

class HeroCrousel {
    constructor(imgUrl) {
        this.url = imgUrl;
    }
}

const OfferPorduct = [new ResellProduct("Kaspersky", "/product"),new ResellProduct("Acronis", "/product"),new ResellProduct("Bytescreen", "/product")];

const heroCrouselImg = [new HeroCrousel("../Images/herocrousal/image1.jpg"), new HeroCrousel("../Images/herocrousal/image2.jpg")];

const data = [new Product("Kaspersky", "Antivirus", "../Images/ProductImage/product1.jpg", "Talk To Our Expert"),
new Product("Acronis", "Back Up Software", "../Images/ProductImage/product2.jpg", "Talk To Our Expert"),
new Product("Bytescreen", "Firewall and Sd Wan", "../Images/ProductImage/product3.jpg", "Talk To Our Expert")
];

const productCard = [[new Product("Kaspersky", "Antivirus", "../Images/ProductImage/product1.jpg", "Talk To Our Expert"),
new Product("Acronis", "Back Up Software", "../Images/ProductImage/product2.jpg", "Talk To Our Expert"),
new Product("Bytescreen", "Firewall and Sd Wan", "../Images/ProductImage/product3.jpg", "Talk To Our Expert")],
[new Product("Kaspersky", "Antivirus", "../Images/ProductImage/product1.jpg", "Talk To Our Expert"),
new Product("Acronis", "Back Up Software", "../Images/ProductImage/product2.jpg", "Talk To Our Expert"),
new Product("TeraMind", "Firewall and Sd Wan", "../Images/ProductImage/product3.jpg", "Talk To Our Expert")],
[new Product("Kaspersky", "Antivirus", "../Images/ProductImage/product1.jpg", "Talk To Our Expert"),
new Product("Acronis", "Back Up Software", "../Images/ProductImage/product2.jpg", "Talk To Our Expert"),
new Product("Bytescreen", "Firewall and Sd Wan", "../Images/ProductImage/product3.jpg", "Talk To Our Expert")]
];

module.exports = { data, heroCrouselImg, productCard, OfferPorduct};