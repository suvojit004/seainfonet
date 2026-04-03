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


if (talkToExpertForm) {
  talkToExpertForm.addEventListener("submit", async function (e) {
    FormSubMition(e, talkToExpertForm, "/submit", "successToast","talkToExpert");
  });
};

if (demoForm) {
  demoForm.addEventListener('submit', async function (e) {
    FormSubMition(e,demoForm,'/submit',"successToast");
  });
};

if (contactForm) {

  contactForm.addEventListener('submit', async function (e) {
    FormSubMition(e,contactForm,'/submit', "successToast")
  })
}



async function FormSubMition(event, form, submitUrl, tostId, modalId = null) {
  if ((typeof submitUrl === 'string') && (typeof tostId === 'string')) {
    event.preventDefault();
    const formData = new FormData(form);
    const toastElement = document.getElementById(tostId);
    const toast = new bootstrap.Toast(toastElement);

    if (typeof modalId === 'string') {
      bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();
    }

    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        setTimeout(() => {
          toast.show();
          form.reset()
        }, 300);

      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
      form.reset();
    }
  }
}
