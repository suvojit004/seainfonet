const buttons = document.querySelectorAll('.senarioButton');
const talkToExpertForm = document.getElementById("talkToExpertForm");
const demoForm = document.getElementById("demoForm");
const contactForm = document.getElementById('contactForm');
const container = document.getElementById("formContainer");

buttons.forEach(button => {
  button.addEventListener('click', () => {

    if (!button.classList.contains("active")) {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add("active")
    }
  });
});


if(talkToExpertForm){
  talkToExpertForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(talkToExpertForm);
  const modalElement = document.getElementById("talkToExpert");
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
    talkToExpertForm.reset();
  }
  talkToExpertForm.reset();
});
};

if(demoForm){
  demoForm.addEventListener('submit', async function (e) {

  e.preventDefault();
  const formData = new FormData(demoForm);
  const toastElement = document.getElementById("successToast");
  const toast = new bootstrap.Toast(toastElement);

  try {
    const response = await fetch("/submit", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response:", data);
      setTimeout(() => {
        toast.show();
      }, 300);

    }

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
    demoForm.reset();
  }
  demoForm.reset();

});
};

if(contactForm){

  contactForm.addEventListener('submit', async function (e) {

  e.preventDefault();
  const formData = new FormData(contactForm);
  const toastElement = document.getElementById("successToast");
  const toast = new bootstrap.Toast(toastElement);

  try {
    const response = await fetch("/submit", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response:", data);
      setTimeout(() => {
        toast.show();
      }, 300);

    }

  } catch (error) {
    console.error(error);
    alert("Server error ❌");
    contactForm.reset();
  }
  contactForm.reset();
  })
}

