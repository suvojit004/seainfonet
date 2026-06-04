const talkToExpertForm = document.getElementById("talkToExpertForm");
const demoForm = document.getElementById("demoForm");
const contactForm = document.getElementById('contactForm');

/* ═══════════════════════════════════════════
   HAMBURGER
═══════════════════════════════════════════ */
const hamburger = document.getElementById('seaHamburger');
const mobileMenu = document.getElementById('sea-mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

/* ═══════════════════════════════════════════
   MOBILE ACCORDIONS
═══════════════════════════════════════════ */
document.querySelectorAll('.sea-mob-acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const list = btn.nextElementSibling;
    const isOpen = list.classList.contains('open');

    document.querySelectorAll('.sea-mob-acc-list').forEach(l => l.classList.remove('open'));
    document.querySelectorAll('.sea-mob-acc-btn').forEach(b => b.classList.remove('open'));

    if (!isOpen) {
      list.classList.add('open');
      btn.classList.add('open');
    }
  });
});

/* ═══════════════════════════════════════════
   CLOSE MENU ON LINK TAP
═══════════════════════════════════════════ */
document.querySelectorAll('#sea-mobile-menu > a').forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  });
});

/* ═══════════════════════════════════════════
   FORM SUBMISSIONS
═══════════════════════════════════════════ */
if (talkToExpertForm) {
  talkToExpertForm.addEventListener("submit", async function (e) {
    FormSubMition(e, talkToExpertForm, "/submit", "successToast", "talkToExpert");
  });
}

if (demoForm) {
  demoForm.addEventListener('submit', async function (e) {
    FormSubMition(e, demoForm, '/leads', "successToast");
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    FormSubMition(e, contactForm, '/leads', "successToast");
  });
}

async function FormSubMition(event, form, submitUrl, tostId, modalId = null) {
  if ((typeof submitUrl === 'string') && (typeof tostId === 'string')) {
    event.preventDefault();
    const formData = new FormData(form);
    const toastElement = document.getElementById(tostId);
    const toast = new bootstrap.Toast(toastElement);

    const data = Object.fromEntries(formData.entries());

    if (typeof modalId === 'string') {
      bootstrap.Modal.getInstance(document.getElementById(modalId)).hide();
    }

    try {
      const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
        ,
        body: JSON.stringify(data),

      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
        setTimeout(() => {
          toast.show();
          form.reset();
        }, 300);
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
      form.reset();
    }
  }
}

/* ═══════════════════════════════════════════
   FLOATING MENU POPOVER
═══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector('[data-bs-toggle="popover"]');
  if (!trigger) return;

  const popover = new bootstrap.Popover(trigger, {
    trigger: 'manual',
    html: true,
  });

  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    popover.toggle();
  });

  document.addEventListener('click', function (e) {
    const pop = document.querySelector('.popover');
    if (!trigger.contains(e.target) && !pop?.contains(e.target)) {
      popover.hide();
    }
  });
});

/* ═══════════════════════════════════════════
   FAQ ACCORDION
═══════════════════════════════════════════ */
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // open clicked one if it was closed
    if (!isOpen) item.classList.add('open');
  });
});