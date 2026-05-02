
const sectionButtons = document.querySelectorAll(".Home");
const homeActions = document.getElementById("home-actions");
const contentArea = document.getElementById("content-area");
const CarouselButton = document.querySelector(".Carousel")
const ProductsButton = document.querySelector(".Products")
const UseCasesButton = document.querySelector(".Use-Cases")
const porductPageButton = document.querySelector('[data-section="Products"]');
const formButton = document.querySelector('[data-section="Forms"]');
const demoFormButton = document.querySelector('[data-section="Demo-Forms"]');
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


CarouselButton.addEventListener("click", async () => {
  await loadUi('/carousel')
})
ProductsButton.addEventListener("click", async () => {
  await loadUi('/homeproduct')
})
UseCasesButton.addEventListener("click", async () => {
  await loadUi('/productscenario')
})
formButton.addEventListener("click", async () => {
  await loadUi('/form/contactform')
})
demoFormButton.addEventListener("click", async () => {
  await loadUi('/form/demoform')
})
porductPageButton.addEventListener("click",async ()=>{
  console.log('clicked')
})


contentArea.addEventListener("click", async (e) => {
  const target = e.target;
  if (target.classList.contains("new-btn")) {
    const url = target.dataset.url;
    // open bootstrap modal
    if (url === "/carousel") {
      await openModal("createCarouselModal", url)
    }
    else if (url === "/homeproduct" || url === "/productscenario") {
      await openModal("createProductModal", url)
    }
    else if (url === "/productpage") {
      console.log(url);
    }

  }
  else if (target.classList.contains("edit-btn")) {
    openEditModal(JSON.parse(target.dataset.data), target.dataset.url)

  }

  else if (target.classList.contains("delete-btn")) {
    const id = target.dataset.id;
    const url = target.dataset.url

    await deleteData(url, id)
    await loadUi(url)
  }

})





async function openModal(modalId, url) {
  const modalElement = document.getElementById(modalId);
  const modal = new bootstrap.Modal(modalElement);
  const form = modalElement.querySelector("form");

  if (!form) return;

  modal.show();

  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    await createData(url, data);
    await loadUi(url);

    modal.hide();
    form.reset();
  };
}

async function openEditModal(data, url) {
  const modalElement = document.getElementById("editModal");
  const modal = new bootstrap.Modal(modalElement);
  const form = modalElement.querySelector("#editForm");
  const fieldsContainer = modalElement.querySelector("#editFormFields");

  if (!form || !fieldsContainer) return;

  const hiddenFields = ["_id", "__v", "createdAt", "updatedAt"];

  fieldsContainer.innerHTML = Object.keys(data)
    .filter((key) => !hiddenFields.includes(key))
    .map((key) => {
      const value = data[key] ?? "";

      return `
        <div class="mb-3">
          <label class="form-label text-capitalize">${key}</label>
          <input 
            type="text" 
            name="${key}" 
            class="form-control" 
            value="${value}"
          />
        </div>
      `;
    })
    .join("");

  modal.show();

  form.onsubmit = async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const updatedData = Object.fromEntries(formData.entries());

    await editData(url, data._id, updatedData);
    await loadUi(url)


    modal.hide();
    form.reset();
  };
}






async function loadUi(url) {
  const data = await loadData(url);
  const hiddenColumns = ["_id", "createdAt", "updatedAt", "__v"];

  if (!data.success || data.data.length === 0) {
    contentArea.innerHTML = `<p>No data found</p>
    `;
    return;
  } else {
    const dataArray = data.data;
    const headers = Object.keys(dataArray[0]).filter(
      key => !hiddenColumns.includes(key)
    );

    const ui = `
    <button class="btn btn-sm btn-primary new-btn" data-url="${url}">New Add ${url}</button>
      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            ${headers.map(key => `<th>${key}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${dataArray
        .map(
          row => `
                <tr>
                  ${headers.map(key => `<td>${row[key] ?? ""}</td>`).join("")}
                  <td>
                  <button class="btn btn-sm btn-primary edit-btn" data-id="${row._id}" data-url="${url}" data-data='${JSON.stringify(row)}'>Edit</button>
                  <button class="btn btn-sm btn-danger delete-btn" data-id="${row._id}" data-url="${url}">Delete</button>
                  </td>
                </tr>
              `
        )
        .join("")}
        </tbody>
      </table>
    `;

    contentArea.innerHTML = ui;
  }
}

/* Start*/

/* end */



async function loadData(url) {
  try {
    const response = await fetch(url);

    // Try parsing response as JSON
    const data = await response.json().catch(() => null);

    // Handle HTTP errors
    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: response.statusText || "Request failed",
        data: data || null,
      };
    }

    // Success response
    return {
      success: true,
      status: response.status,
      data: data,
    };
  } catch (error) {
    // Handle network / unexpected errors
    return {
      success: false,
      status: 500,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
}

async function createData(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: response.statusText || "Request failed",
        data: result || null,
      };
    }

    return {
      success: true,
      status: response.status,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
}

async function editData(url, id, data) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: response.statusText || "Update failed",
        data: result || null,
      };
    }

    return {
      success: true,
      status: response.status,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
}

async function deleteData(url, id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: response.statusText || "Delete failed",
        data: data || null,
      };
    }

    return {
      success: true,
      status: response.status,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
}









