const buttons = document.querySelectorAll('.senarioButton');
const form = document.getElementById("contactForm");
const container = document.getElementById("formContainer");

buttons.forEach(button => {
  button.addEventListener('click', () => {

    if (!button.classList.contains("active")) {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add("active")
    }
  });
});



form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const modalElement = document.getElementById("exampleModal");
  const toastElement = document.getElementById("successToast");
  const modal = bootstrap.Modal.getInstance(modalElement);
  const toast = new bootstrap.Toast(toastElement);
  try {
    const response = await fetch("/submit", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response:", data);

      if (modal) {
        modal.hide();
      }

      setTimeout(() => {
        toast.show();
      }, 300);

    }

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
    form.reset();
  }
  form.reset();
});