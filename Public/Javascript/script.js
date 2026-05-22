const productSenario_Button = document.querySelectorAll('.senarioButton');
const talkToExpertForm = document.getElementById("talkToExpertForm");
const demoForm = document.getElementById("demoForm");
const contactForm = document.getElementById('contactForm');
const container = document.getElementById("formContainer");
const productSenario_title = document.querySelector('.productSenario-title')
const productSenario_description= document.querySelector('.productSenario-description')
const productSenario_img= document.querySelector('.productSenario-image')
const productSenario_inside_button = document.querySelector('.productSenario-btn');

/*Hero Carousel*/
{const slides = document.querySelectorAll('.herocarousel-slide');
  const dotsContainer = document.getElementById('dots');
  const total = slides.length;
  document.getElementById('totalSlides').textContent = total;
  let current = 0, timer;

  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'herocarousel-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    document.querySelectorAll('.herocarousel-dot')[current].classList.remove('active');
    current = (n + total) % total;
    slides[current].classList.add('active');
    document.querySelectorAll('.herocarousel-dot')[current].classList.add('active');
    document.getElementById('curSlide').textContent = current + 1;
    resetTimer();
  }

  function resetTimer() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5000); }

  document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
  document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));
  resetTimer();}

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



productSenario_Button.forEach(button => {
  button.addEventListener('click', () => {
    if (!button.classList.contains("active")) {
      productSenario_Button.forEach(btn => btn.classList.remove('active'));
      button.classList.add("active")
      productSenario_title.textContent = DATA[Number(button.dataset.index)].name; // DATA array is available in the page
      productSenario_description.textContent = DATA[Number(button.dataset.index)].description;
      productSenario_img.src = DATA[Number(button.dataset.index)].url;
      productSenario_inside_button.textContent = DATA[Number(button.dataset.index)].btntxt;
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


/*floating menu*/



document.addEventListener("DOMContentLoaded", function () {

  // Select your popover trigger
  const trigger = document.querySelector('[data-bs-toggle="popover"]');

  // Initialize popover
  const popover = new bootstrap.Popover(trigger, {
    trigger: 'manual',
    html: true,
    
  });

  // Toggle on click
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    popover.toggle();
  });

  // Close when clicking outside
  document.addEventListener('click', function (e) {
    const pop = document.querySelector('.popover');

    if (!trigger.contains(e.target) && !pop?.contains(e.target)) {
      popover.hide();
    }
  });

});

/*End*/