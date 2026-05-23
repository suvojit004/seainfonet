
const talkToExpertForm = document.getElementById("talkToExpertForm");
const demoForm = document.getElementById("demoForm");
const contactForm = document.getElementById('contactForm');

/**Nav */

// ══ JS ══
const hamburger = document.getElementById('seaHamburger');
const mobileMenu = document.getElementById('sea-mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Generic accordion for all mobile dropdowns
document.querySelectorAll('.sea-mob-acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const list = btn.nextElementSibling;
    const isOpen = list.classList.contains('open');
    // Close all
    document.querySelectorAll('.sea-mob-acc-list').forEach(l => l.classList.remove('open'));
    document.querySelectorAll('.sea-mob-acc-btn').forEach(b => b.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) { list.classList.add('open'); btn.classList.add('open'); }
  });
});

  /**End */

  /** Product Slide and Porduct Card */
{
const track = document.getElementById('psTrack');
  const cards = Array.from(track.querySelectorAll('.productSlide-card-item'));
  const dotsEl = document.getElementById('psDots');
  const prevBtn = document.getElementById('psPrev');
  const nextBtn = document.getElementById('psNext');
  let cur = 0;

function getVisible() {
  if (window.innerWidth >= 992) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

  function totalSlides() {
      return Math.ceil(cards.length / getVisible());
  }

  function setCardWidths() {
    const visible = getVisible();
    cards.forEach(c => c.style.width = `${100 / visible}%`);
  }

  function buildDots() {
     dotsEl.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const d = document.createElement('div');
      d.className = 'productSlide-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
    }
  }

  function goTo(n) {
     const total = totalSlides();
    cur = (n + total) % total;
    const visible = getVisible();
    // Use actual card width in px instead of percentage
    const cardWidth = cards[0].getBoundingClientRect().width;
    const translatePx = cur * visible * cardWidth;
    track.style.transform = `translateX(-${translatePx}px)`;
    dotsEl.querySelectorAll('.productSlide-dot').forEach((d, i) => d.classList.toggle('active', i === cur));
    prevBtn.disabled = cur === 0;
    nextBtn.disabled = cur >= total - 1;
  }

  function init() {
    setCardWidths();
    buildDots();
    cur = 0;
    track.style.transform = 'translateX(0)';
    goTo(0);
  }

  prevBtn.addEventListener('click', () => goTo(cur - 1));
  nextBtn.addEventListener('click', () => goTo(cur + 1));
  window.addEventListener('resize', init);

  init();
  setInterval(() => goTo(cur >= totalSlides() - 1 ? 0 : cur + 1), 7000);
}


/**FeedBack */

{
  const cards = document.querySelectorAll('.feedback-card');
  const dotsEl = document.getElementById('fbDots');
  let cur = 0;
  const total = cards.length;

  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'feedback-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });

  function goTo(n) {
    cards[cur].classList.remove('active');
    cards[cur].style.position = 'absolute';
    dotsEl.querySelectorAll('.feedback-dot')[cur].classList.remove('active');
    cur = (n + total) % total;
    cards[cur].classList.add('active');
    cards[cur].style.position = 'relative';
    dotsEl.querySelectorAll('.feedback-dot')[cur].classList.add('active');
  }

  document.getElementById('fbPrev').addEventListener('click', () => goTo(cur - 1));
  document.getElementById('fbNext').addEventListener('click', () => goTo(cur + 1));
  setInterval(() => goTo(cur + 1), 4500);
}




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


/*floating menu*/



document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.querySelector('[data-bs-toggle="popover"]');

  // ✅ Guard against missing element
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

/*End*/