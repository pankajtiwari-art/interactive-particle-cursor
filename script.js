import AttractionCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.26/build/cursors/attraction1.min.js";

try {
  // Initialize the particle system
  const app = AttractionCursor(document.getElementById('canvas'), {
    particles: {
      attractionIntensity: 0.8,
      size: 1.5,  
    },
  });

  // DOM Elements
  const colorBtn = document.getElementById('colors-btn');
  const autoBtn = document.getElementById('auto-btn');
  const sizeSlider = document.getElementById('size-slider');

  let autoInterval = null;

  // Feature 1: Randomize Colors safely
  const randomizeColors = () => {
    if (app.particles && app.particles.light1 && app.particles.light2) {
       app.particles.light1.color.set(Math.random() * 0xffffff);
       app.particles.light2.color.set(Math.random() * 0xffffff);
    }
  };

  colorBtn.addEventListener('click', randomizeColors);

  // Feature 2: Auto-Color Mode
  autoBtn.addEventListener('click', () => {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
      autoBtn.innerText = '🔄 Auto: OFF';
      autoBtn.classList.remove('active');
    } else {
      autoInterval = setInterval(randomizeColors, 1500);
      autoBtn.innerText = '🔄 Auto: ON';
      autoBtn.classList.add('active');
    }
  });

  // Feature 3: Particle Size adjustment
  sizeSlider.addEventListener('input', (e) => {
    const newSize = parseFloat(e.target.value);
    if (app.particles && app.particles.material) {
      app.particles.material.size = newSize;
    }
  });

} catch (error) {
  console.error("Oops! Something went wrong loading the cursor:", error);
}
