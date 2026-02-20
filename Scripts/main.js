const videos = [
  "src/pokemon/z.mp4",
  "src/pokemon/g.mp4",
  "src/pokemon/a.mp4",
  "src/pokemon/c.mp4"
];

const X = videos[Math.floor(Math.random() * videos.length)];

const videoElement = document.getElementById("pokemonVideo");


  videoElement.style.display = "block";
  videoElement.src = X;


const text1 = "Wanna peek into my world of creations? Tap the button below!";
  let i1 = 0;
  let isDeleting1 = false;
  let speed1 = 60;

  function typeWriter1() {
    const display1 = document.getElementById("typewriter");

    if (!isDeleting1) {
      display1.innerHTML = text1.substring(0, i1 + 1);
      i1++;
      if (i1 === text1.length) {
        isDeleting1 = true;
        setTimeout(typeWriter1, 1500);
        return;
      }
    } else {
      display1.innerHTML = text1.substring(0, i1 - 1);
      i1--;
      if (i1 === 0) {
        isDeleting1 = false;
      }
    }

    setTimeout(typeWriter1, isDeleting1 ? speed1 / 2 : speed1);
  }

  
  const text2 = "Click The Icons To Know More";
  let i2 = 0;
  let isDeleting2 = false;
  let speed2 = 70;

  function typeWriter2() {
    const display2 = document.querySelector(".highlight-text");

    if (!isDeleting2) {
      display2.innerHTML = text2.substring(0, i2 + 1);
      i2++;
      if (i2 === text2.length) {
        isDeleting2 = true;
        setTimeout(typeWriter2, 1500);
        return;
      }
    } else {
      display2.innerHTML = text2.substring(0, i2 - 1);
      i2--;
      if (i2 === 0) {
        isDeleting2 = false;
      }
    }

    setTimeout(typeWriter2, isDeleting2 ? speed2 / 2 : speed2);
  }

  window.onload = () => {
    typeWriter1();
    typeWriter2();
  };

const tooltip    = document.getElementById('tooltip');
  const overlay    = document.getElementById('overlay');
  const iconImg    = tooltip.querySelector('.tooltip-icon');
  const langEl     = tooltip.querySelector('.tooltip-lang');
  const verEl      = tooltip.querySelector('.tooltip-version');
  const usageEl    = tooltip.querySelector('.tooltip-usage');
  const descEl     = tooltip.querySelector('.tooltip-desc');
  const closeBtn   = tooltip.querySelector('.tooltip-close');

  document.querySelectorAll('.skills-container img').forEach(img => {
    img.addEventListener('click', () => {
      iconImg.src   = img.src;
      langEl.textContent  = img.dataset.lang;
      verEl.textContent   = img.dataset.version;
      usageEl.textContent = img.dataset.usage;
      descEl.textContent  = img.dataset.desc;
      overlay.classList.add('show');
      tooltip.classList.add('show');
    });
  });

  function hideAll() {
    overlay.classList.remove('show');
    tooltip.classList.remove('show');
  }

  closeBtn.addEventListener('click', hideAll);
  overlay.addEventListener('click', hideAll);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideAll();
  });

