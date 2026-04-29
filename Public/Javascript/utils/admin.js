
const sectionButtons = document.querySelectorAll(".Home");
const homeActions = document.getElementById("home-actions");
const contentArea = document.getElementById("content-area");
const CarouselButton = document.querySelector(".Carousel")
const ProductsButton = document.querySelector(".Products")
const UseCasesButton = document.querySelector(".Use-Cases")
const formButton = document.querySelector('[data-section="Forms"]');
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

async function openModal(modalId, url) {
  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();

  document
    .getElementById(modalId)
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      await createData(url, data)
      modal.hide();
    });

}
contentArea.addEventListener("click", async (e) => {
  const target = e.target;
  if (target.classList.contains("new-btn")) {
    const url = target.dataset.url;
    // open bootstrap modal
    await openModal("createCarouselModal", url)
  }
  if (target.classList.contains("delete-btn")) {
    const id = target.dataset.id;
    const url = target.dataset.url

    await deleteData(url, id)
    await loadUi(url)
  }

})

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


async function loadUi(url) {
  const data = await loadData(url);
  const hiddenColumns = ["createdAt", "updatedAt", "__v"];

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
                  <button class="btn btn-sm btn-primary edit-btn" data-id="${row._id}" data-url="${url}">Edit</button>
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









