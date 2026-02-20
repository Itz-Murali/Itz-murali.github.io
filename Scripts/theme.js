const toggle = document.getElementById('toggle');
const gradient = document.getElementById('gradient');


function loadThemeScript(src) {
  try {
    const existing = document.getElementById('theme-script');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = src;
    script.id = 'theme-script';
    document.body.appendChild(script);
  } catch (error) {
    console.error("Error loading theme script:", error);
  }
}


function detectSystemThemeSafely() {
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'night';
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'day';
    } else {
      return 'night';
    }
  } catch (error) {
    console.error("Error detecting system theme:", error);
    return 'night'; 
  }
}


function applyTheme(theme) {
  try {
    gradient.style.opacity = 0;

    setTimeout(() => {
      try {
        const existing = document.getElementById('theme-script');
        if (existing) existing.remove();
        loadThemeScript(`Scripts/${theme}.js`);
      } catch (innerError) {
        console.error("Error during script replacement:", innerError);
      }

      setTimeout(() => {
        try {
          gradient.style.opacity = 1;
        } catch (opacityError) {
          console.error("Error setting gradient opacity back:", opacityError);
        }
      }, 150);
    }, 400);
  } catch (error) {
    console.error("Error applying theme:", error);
  }
}


(function () {
  try {
    const systemTheme = detectSystemThemeSafely();
    applyTheme(systemTheme);
    toggle.checked = systemTheme === 'night';
    } catch (error) {
    console.error("Error during initial theme setup:", error);
    applyTheme('night');
    toggle.checked = true;
  }
})();


toggle.addEventListener('change', () => {
  try {
    const selectedTheme = toggle.checked ? 'night' : 'day';
    applyTheme(selectedTheme);
    } catch (error) {
    console.error("Error handling toggle event:", error);
  }
});