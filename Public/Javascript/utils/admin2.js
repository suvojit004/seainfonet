function reindexHighlights() {
    const items = document.querySelectorAll("#highlightsWrapper .highlight-item");

    items.forEach((item, index) => {
        const input = item.querySelector("input");
        if (input) input.name = `highlights[${index}]`;
    });
}

function removeHighlight(btn) {
    btn.closest(".highlight-item").remove();
    reindexHighlights();
}

function addHighlight() {
    const wrapper = document.getElementById("highlightsWrapper");
    const index = wrapper.querySelectorAll(".highlight-item").length;

    wrapper.insertAdjacentHTML("beforeend", `
    <div class="input-group mb-2 highlight-item">
      <input type="text" class="form-control" name="highlights[${index}]">
      <button type="button" class="btn btn-outline-danger" onclick="removeHighlight(this)">Remove</button>
    </div>
  `);
}

function reindexHeroButtons() {
    const items = document.querySelectorAll("#heroButtonsWrapper .hero-btn-item");

    items.forEach((item, index) => {
        const textInput = item.querySelector('input[name*="[text]"]');
        const linkInput = item.querySelector('input[name*="[link]"]');

        if (textInput) textInput.name = `buttons[${index}][text]`;
        if (linkInput) linkInput.name = `buttons[${index}][link]`;
    });
}

function removeHeroButton(btn) {
    btn.closest(".hero-btn-item").remove();
    reindexHeroButtons();
}

function addHeroButton() {
    const wrapper = document.getElementById("heroButtonsWrapper");
    const index = wrapper.querySelectorAll(".hero-btn-item").length;

    wrapper.insertAdjacentHTML("beforeend", `
    <div class="border rounded-3 p-3 mb-3 hero-btn-item">
      <div class="mb-2">
        <label class="form-label">Button Text</label>
        <input type="text" class="form-control" name="buttons[${index}][text]">
      </div>
      <div class="mb-2">
        <label class="form-label">Button Link</label>
        <input type="text" class="form-control" name="buttons[${index}][link]">
      </div>
      <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeHeroButton(this)">Remove</button>
    </div>
  `);
}

document.getElementById("heroForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const preview = this.querySelector('[name="imagePreview"]');
    const hidden = this.querySelector('[name="image"]');

    if (preview.value.trim()) {
        hidden.value = preview.value.trim();
    }

    // final safety reindex before submit
    reindexHighlights();
    reindexHeroButtons();

    const formData = new FormData(this);
    const heroData = {};

    for (const [key, value] of formData.entries()) {
        if (key === "imagePreview") continue;
        setDeep(heroData, key, value);
    }

    await fetch("/productpage/kaspersky", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            hero: heroData
        })
    });
});

function setDeep(obj, path, value) {
    const keys = path.replace(/\]/g, "").split(/\.|\[/);
    let current = obj;

    keys.forEach((key, index) => {
        const nextKey = keys[index + 1];
        const isLast = index === keys.length - 1;

        if (isLast) {
            current[key] = value;
            return;
        }

        if (!current[key]) {
            current[key] = isNaN(nextKey) ? {} : [];
        }

        current = current[key];
    });
}



function reindexWhyPoints() {
    const items = document.querySelectorAll("#whyPointsWrapper .why-point-item");

    items.forEach((item, index) => {
        const titleInput = item.querySelector('input[name*="[title]"]');
        const descInput = item.querySelector('textarea[name*="[description]"]');

        if (titleInput) titleInput.name = `points[${index}][title]`;
        if (descInput) descInput.name = `points[${index}][description]`;
    });
}

function removeWhyPoint(btn) {
    btn.closest(".why-point-item").remove();
    reindexWhyPoints();
}

function addWhyPoint() {
    const wrapper = document.getElementById("whyPointsWrapper");
    const index = wrapper.querySelectorAll(".why-point-item").length;

    wrapper.insertAdjacentHTML("beforeend", `
      <div class="border rounded-3 p-3 mb-3 why-point-item">
        <div class="mb-2">
          <label class="form-label">Point Title</label>
          <input type="text" class="form-control" name="points[${index}][title]">
        </div>

        <div class="mb-2">
          <label class="form-label">Point Description</label>
          <textarea class="form-control" name="points[${index}][description]" rows="3"></textarea>
        </div>

        <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeWhyPoint(this)">Remove</button>
      </div>
    `);
}

document.getElementById("whyProductForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const preview = this.querySelector('[name="imagePreview"]');
    const hidden = this.querySelector('[name="image"]');

    if (preview.value.trim()) {
        hidden.value = preview.value.trim();
    }

    reindexWhyPoints();

    const formData = new FormData(this);
    const whyData = {};

    for (const [key, value] of formData.entries()) {
        if (key === "imagePreview") continue;
        setDeep(whyData, key, value);
    }

    await fetch(`/productpage/${this.dataset.productkey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            whyThisProduct: whyData
        })
    });


});

function setDeep(obj, path, value) {
    const keys = path.replace(/\]/g, "").split(/\.|\[/);
    let current = obj;

    keys.forEach((key, index) => {
        const nextKey = keys[index + 1];
        const isLast = index === keys.length - 1;

        if (isLast) {
            current[key] = value;
            return;
        }

        if (!current[key]) {
            current[key] = isNaN(nextKey) ? {} : [];
        }

        current = current[key];
    });
}





function reindexProductCards() {
    const items = document.querySelectorAll("#productsWrapper .product-card-item");

    items.forEach((item, index) => {
        const titleInput = item.querySelector('input[name*="[title]"]');
        const descInput = item.querySelector('textarea[name*="[description]"]');

        if (titleInput) titleInput.name = `products[${index}][title]`;
        if (descInput) descInput.name = `products[${index}][description]`;
    });
}

function removeProductCard(btn) {
    btn.closest(".product-card-item").remove();
    reindexProductCards();
}

function addProductCard() {
    const wrapper = document.getElementById("productsWrapper");
    const index = wrapper.querySelectorAll(".product-card-item").length;

    wrapper.insertAdjacentHTML("beforeend", `
      <div class="col-md-3 product-card-item">
        <div class="card custom-hover h-100">
          <div class="card-body">
            <div class="mb-2">
              <label class="form-label">Title</label>
              <input type="text" class="form-control" name="products[${index}][title]">
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" name="products[${index}][description]" rows="4"></textarea>
            </div>

            <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeProductCard(this)">Remove</button>
          </div>
        </div>
      </div>
    `);
}

document.getElementById("productsForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    reindexProductCards();

    const formData = new FormData(this);
    const productsData = [];

    for (const [key, value] of formData.entries()) {
        setDeep(productsData, key, value);
    }

    await fetch(`/productpage/${this.dataset.productkey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            products: productsData.products
        })
    });

});

function setDeep(obj, path, value) {
    const keys = path.replace(/\]/g, "").split(/\.|\[/);
    let current = obj;

    keys.forEach((key, index) => {
        const nextKey = keys[index + 1];
        const isLast = index === keys.length - 1;

        if (isLast) {
            current[key] = value;
            return;
        }

        if (!current[key]) {
            current[key] = isNaN(nextKey) ? {} : [];
        }

        current = current[key];
    });
}



function reindexFeatureItems() {
    const items = document.querySelectorAll("#featuresWrapper .feature-item");

    items.forEach((item, index) => {
      const titleInput = item.querySelector('input[name*="[title]"]');
      const descInput = item.querySelector('textarea[name*="[description]"]');

      if (titleInput) titleInput.name = `features[${index}][title]`;
      if (descInput) descInput.name = `features[${index}][description]`;
    });
  }

  function removeFeatureItem(btn) {
    btn.closest(".feature-item").remove();
    reindexFeatureItems();
  }

  function addFeatureItem() {
    const wrapper = document.getElementById("featuresWrapper");
    const index = wrapper.querySelectorAll(".feature-item").length;

    wrapper.insertAdjacentHTML("beforeend", `
      <div class="border rounded-3 p-3 mb-3 feature-item">
        <div class="mb-2">
          <label class="form-label">Feature Title</label>
          <input type="text" class="form-control" name="features[${index}][title]">
        </div>

        <div class="mb-2">
          <label class="form-label">Feature Description</label>
          <textarea class="form-control" name="features[${index}][description]" rows="3"></textarea>
        </div>

        <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeFeatureItem(this)">Remove</button>
      </div>
    `);
  }

  document.getElementById("keyFeaturesForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const preview = this.querySelector('[name="imagePreview"]');
    const hidden = this.querySelector('[name="image"]');

    if (preview.value.trim()) {
      hidden.value = preview.value.trim();
    }

    reindexFeatureItems();

    const formData = new FormData(this);
    const keyFeaturesData = {};

    for (const [key, value] of formData.entries()) {
      if (key === "imagePreview") continue;
      setDeep(keyFeaturesData, key, value);
    }
   
    await fetch(`/productpage/${this.dataset.productkey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keyFeatures: keyFeaturesData
      })
    });

  
  });

  function setDeep(obj, path, value) {
    const keys = path.replace(/\]/g, "").split(/\.|\[/);
    let current = obj;

    keys.forEach((key, index) => {
      const nextKey = keys[index + 1];
      const isLast = index === keys.length - 1;

      if (isLast) {
        current[key] = value;
        return;
      }

      if (!current[key]) {
        current[key] = isNaN(nextKey) ? {} : [];
      }

      current = current[key];
    });
  }