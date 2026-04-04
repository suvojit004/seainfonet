const productSenario_Button = document.querySelectorAll('.senarioButton');
const talkToExpertForm = document.getElementById("talkToExpertForm");
const demoForm = document.getElementById("demoForm");
const contactForm = document.getElementById('contactForm');
const container = document.getElementById("formContainer");
const productSenario_title = document.querySelector('.productSenario-title')
const productSenario_description= document.querySelector('.productSenario-description')
const productSenario_img= document.querySelector('.productSenario-image')

productSenario_Button.forEach(button => {
  button.addEventListener('click', () => {
    if (!button.classList.contains("active")) {
      productSenario_Button.forEach(btn => btn.classList.remove('active'));
      button.classList.add("active")
      productSenario_title.textContent = DATA[Number(button.dataset.index)].title;
      productSenario_description.textContent = DATA[Number(button.dataset.index)].description;
      productSenario_img.src = DATA[Number(button.dataset.index)].url;
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



async function FormSubMition(event, form, submitUrl, tostId, modalId = null) {  // The Funtion handle the form submition logic 
  if ((typeof submitUrl === 'string') && (typeof tostId === 'string')) {        //if the submit url and toast if not string it wont go further.
    event.preventDefault();
    const formData = new FormData(form);
    const toastElement = document.getElementById(tostId);
    const toast = new bootstrap.Toast(toastElement);

    if (typeof modalId === 'string') {
      bootstrap.Modal.getInstance(document.getElementById(modalId)).hide(); // If the modal not present it wont perform modal close
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
