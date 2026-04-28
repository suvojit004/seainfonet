
const sectionButtons = document.querySelectorAll(".Home");
const homeActions = document.getElementById("home-actions");
const contentArea = document.getElementById("content-area");
document.querySelector(".Carousel").addEventListener("click", loadCarousel);
sectionButtons.forEach(button => {
    button.addEventListener("click", function () {
        sectionButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");

        if (this.dataset.section === "Home") {
            homeActions.classList.remove("d-none");
        }
        else {
            homeActions.classList.add("d-none");
        }
    });
});




async function loadCarousel() {
    contentArea.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Home Carousel</h5>
        <button class="btn btn-primary btn-sm" onclick="openCarouselModal()">
          + Add New
        </button>
      </div>

      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Image URL</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody id="carousel-table">
            <tr>
              <td colspan="3" class="text-center text-muted py-4">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    try {
        const res = await fetch("/carousel");
        const items = await res.json();

        const table = document.getElementById("carousel-table");

        if (!items.length) {
            table.innerHTML = `
          <tr>
            <td colspan="3" class="text-center text-muted py-4">No carousel items found</td>
          </tr>
        `;
            return;
        }

        table.innerHTML = items.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td class="text-truncate" style="max-width: 400px;">${item.url}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="editCarousel('${item._id}', '${item.url}')">
              Edit
            </button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteCarousel('${item._id}')">
              Delete
            </button>
          </td>
        </tr>
      `).join("");

    } catch (err) {
        contentArea.innerHTML = `
        <div class="text-danger text-center py-5">Failed to load carousel items</div>
      `;
        console.error(err);
    }
}

function openCarouselModal() {
    document.getElementById("content-id").value = "";
    document.getElementById("url").value = "";
    document.querySelector(".modal-title").textContent = "Add Carousel Item";

    const modal = new bootstrap.Modal(document.getElementById("contentModal"));
    modal.show();
}

function editCarousel(id, url) {
    document.getElementById("content-id").value = id;
    document.getElementById("url").value = url;
    document.querySelector(".modal-title").textContent = "Edit Carousel Item";

    const modal = new bootstrap.Modal(document.getElementById("contentModal"));
    modal.show();
}

async function deleteCarousel(id) {
    if (!confirm("Delete this carousel item?")) return;

    try {
        await fetch(`/carousel/${id}`, { method: "DELETE" });
        loadCarousel();
    } catch (err) {
        console.error(err);
    }
}



document.getElementById("save-content").addEventListener("click", async () => {
    const id = document.getElementById("content-id").value;
    const url = document.getElementById("url").value.trim();

    if (!url) return alert("URL is required");

    try {
        if (id) {
            await fetch(`/carousel/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });
        } else {
            await fetch("/carousel", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url })
            });
        }

        bootstrap.Modal.getInstance(document.getElementById("contentModal")).hide();
        loadCarousel();
    } catch (err) {
        console.error(err);
    }
});


/* Product */

  async function loadProducts() {
    contentArea.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Products</h5>
        <button class="btn btn-primary btn-sm" onclick="openProductModal()">
          + Add New
        </button>
      </div>

      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>URL</th>
              <th>Button Text</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody id="product-table">
            <tr>
              <td colspan="6" class="text-center text-muted py-4">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    try {
      const res = await fetch("/homeproduct");
      const items = await res.json();

      const table = document.getElementById("product-table");

      if (!items.length) {
        table.innerHTML = `
          <tr>
            <td colspan="6" class="text-center text-muted py-4">No products found</td>
          </tr>
        `;
        return;
      }

      table.innerHTML = items.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td class="text-truncate" style="max-width: 250px;">${item.description}</td>
          <td class="text-truncate" style="max-width: 200px;">${item.url}</td>
          <td>${item.btntxt}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary me-2"
              onclick='editProduct(${JSON.stringify(item)})'>
              Edit
            </button>
            <button class="btn btn-sm btn-outline-danger"
              onclick="deleteProduct('${item._id}')">
              Delete
            </button>
          </td>
        </tr>
      `).join("");

    } catch (err) {
      contentArea.innerHTML = `
        <div class="text-danger text-center py-5">Failed to load products</div>
      `;
      console.error(err);
    }
  }

  function openProductModal() {
    document.getElementById("product-content-form").innerHTML = `
      <input type="hidden" id="product-content-id">

      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" id="product-name" placeholder="Enter name">
      </div>

      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea class="form-control" id="product-description" rows="4" placeholder="Enter description"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">URL</label>
        <input type="text" class="form-control" id="product-url" placeholder="Enter URL">
      </div>

      <div class="mb-3">
        <label class="form-label">Button Text</label>
        <input type="text" class="form-control" id="product-btntxt" placeholder="Enter button text">
      </div>
    `;

    document.getElementById("product-contentModalLabel").textContent = "Add Product";
    new bootstrap.Modal(document.getElementById("product-contentModal")).show();
  }

  function editProduct(item) {
    openProductModal();

    document.getElementById("product-content-id").value = item._id;
    document.getElementById("product-name").value = item.name;
    document.getElementById("product-description").value = item.description;
    document.getElementById("product-url").value = item.url;
    document.getElementById("product-btntxt").value = item.btntxt;

    document.getElementById("product-contentModalLabel").textContent = "Edit Product";
  }

  async function deleteProduct(id) {
    if (!confirm("Delete this product?")) return;

    try {
      await fetch(`/homeproduct/${id}`, { method: "DELETE" });
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  }

  document.querySelector(".Products").addEventListener("click", loadProducts);

  document.getElementById("product-save-content").addEventListener("click", async () => {
    if (!document.getElementById("product-name")) return;

    const id = document.getElementById("product-content-id").value;

    const payload = {
      name: document.getElementById("product-name").value.trim(),
      description: document.getElementById("product-description").value.trim(),
      url: document.getElementById("product-url").value.trim(),
      btntxt: document.getElementById("product-btntxt").value.trim()
    };

    if (!payload.name || !payload.description || !payload.url || !payload.btntxt) {
      return alert("All fields are required");
    }

    try {
      if (id) {
        await fetch(`/homeproduct/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch("/homeproduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      bootstrap.Modal.getInstance(document.getElementById("product-contentModal")).hide();
      loadProducts();
    } catch (err) {
      console.error(err);
    }
  });

  /* Use Case*/

  
  async function loadUseCases() {
    contentArea.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Use Cases</h5>
        <button class="btn btn-primary btn-sm" onclick="openUseCaseModal()">
          + Add New
        </button>
      </div>

      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>URL</th>
              <th>Button Text</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody id="use-case-table">
            <tr>
              <td colspan="6" class="text-center text-muted py-4">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    try {
      const res = await fetch("/productscenario");
      const items = await res.json();

      const table = document.getElementById("use-case-table");

      if (!items.length) {
        table.innerHTML = `
          <tr>
            <td colspan="6" class="text-center text-muted py-4">No use cases found</td>
          </tr>
        `;
        return;
      }

      table.innerHTML = items.map((item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${item.name}</td>
          <td class="text-truncate" style="max-width: 250px;">${item.description}</td>
          <td class="text-truncate" style="max-width: 200px;">${item.url}</td>
          <td>${item.btntxt}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-outline-secondary me-2"
              onclick='editUseCase(${JSON.stringify(item)})'>
              Edit
            </button>
            <button class="btn btn-sm btn-outline-danger"
              onclick="deleteUseCase('${item._id}')">
              Delete
            </button>
          </td>
        </tr>
      `).join("");

    } catch (err) {
      contentArea.innerHTML = `
        <div class="text-danger text-center py-5">Failed to load use cases</div>
      `;
      console.error(err);
    }
  }

  function openUseCaseModal() {
    document.getElementById("use-case-content-form").innerHTML = `
      <input type="hidden" id="use-case-content-id">

      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" id="use-case-name" placeholder="Enter name">
      </div>

      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea class="form-control" id="use-case-description" rows="4" placeholder="Enter description"></textarea>
      </div>

      <div class="mb-3">
        <label class="form-label">URL</label>
        <input type="text" class="form-control" id="use-case-url" placeholder="Enter URL">
      </div>

      <div class="mb-3">
        <label class="form-label">Button Text</label>
        <input type="text" class="form-control" id="use-case-btntxt" placeholder="Enter button text">
      </div>
    `;

    document.getElementById("use-case-contentModalLabel").textContent = "Add Use Case";
    new bootstrap.Modal(document.getElementById("use-case-contentModal")).show();
  }

  function editUseCase(item) {
    openUseCaseModal();

    document.getElementById("use-case-content-id").value = item._id;
    document.getElementById("use-case-name").value = item.name;
    document.getElementById("use-case-description").value = item.description;
    document.getElementById("use-case-url").value = item.url;
    document.getElementById("use-case-btntxt").value = item.btntxt;

    document.getElementById("use-case-contentModalLabel").textContent = "Edit Use Case";
  }

  async function deleteUseCase(id) {
    if (!confirm("Delete this use case?")) return;

    try {
      await fetch(`/productscenario/${id}`, { method: "DELETE" });
      loadUseCases();
    } catch (err) {
      console.error(err);
    }
  }

  document.querySelector(".Use-Cases").addEventListener("click", loadUseCases);

  document.getElementById("use-case-save-content").addEventListener("click", async () => {
    if (!document.getElementById("use-case-name")) return;

    const id = document.getElementById("use-case-content-id").value;

    const payload = {
      name: document.getElementById("use-case-name").value.trim(),
      description: document.getElementById("use-case-description").value.trim(),
      url: document.getElementById("use-case-url").value.trim(),
      btntxt: document.getElementById("use-case-btntxt").value.trim()
    };

    if (!payload.name || !payload.description || !payload.url || !payload.btntxt) {
      return alert("All fields are required");
    }

    try {
      const method = id ? "PUT" : "POST";
      const endpoint = id ? `/productscenario/${id}` : "/productscenario";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.message || "Something went wrong");
      }

      bootstrap.Modal.getInstance(document.getElementById("use-case-contentModal")).hide();
      loadUseCases();
    } catch (err) {
      console.error(err);
    }
  });

  /* Form */





