document.addEventListener('DOMContentLoaded', () => {
  const highContrastBtn = document.getElementById('highContrast');
  const dyslexiaBtn = document.getElementById('dyslexia');
  const fontInc = document.getElementById('fontInc');
  const fontDec = document.getElementById('fontDec');
  const fontReset = document.getElementById('fontReset');

  if (highContrastBtn) {
    highContrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      highContrastBtn.textContent = document.body.classList.contains('high-contrast') ? 'Contraste Normal' : 'Alto Contraste';
    });
  }

  if (dyslexiaBtn) {
    dyslexiaBtn.addEventListener('click', () => {
      document.body.classList.toggle('dyslexia');
      dyslexiaBtn.textContent = document.body.classList.contains('dyslexia') ? 'Fonte Normal' : 'Fonte Dislexia';
    });
  }

  let currentSize = 100;
  if (fontInc) {
    fontInc.addEventListener('click', () => {
      if (currentSize < 150) {
        currentSize += 10;
        document.body.style.fontSize = currentSize + '%';
      }
    });
  }
  if (fontDec) {
    fontDec.addEventListener('click', () => {
      if (currentSize > 80) {
        currentSize -= 10;
        document.body.style.fontSize = currentSize + '%';
      }
    });
  }
  if (fontReset) {
    fontReset.addEventListener('click', () => {
      currentSize = 100;
      document.body.style.fontSize = '100%';
    });
  }

  // Simulador do Efeito Fotoelétrico
  const canvas = document.getElementById('simulatorCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 300;

    const freqSlider = document.getElementById('frequency');
    const intensitySlider = document.getElementById('intensity');
    const metalSelect = document.getElementById('metal');
    const infoDiv = document.getElementById('simInfo');

    const metals = {
      'cesio': 2.14,
      'potassio': 2.30,
      'sodio': 2.75,
      'zinco': 4.31,
      'cobre': 4.65
    };

    function updateSimulator() {
      const freq = parseFloat(freqSlider.value);
      const intensity = parseFloat(intensitySlider.value);
      const metal = metalSelect.value;
      const phi = metals[metal];
      const h = 4.135667696e-15;
      const energy = h * freq * 1e14;
      const ke = energy - phi;

      let electrons = 0;
      let message = '';

      if (ke > 0) {
        electrons = Math.floor(intensity / 10);
        message = `Energia do fóton: ${energy.toFixed(2)} eV<br>
                   Função trabalho (φ): ${phi} eV<br>
                   Energia cinética: ${ke.toFixed(2)} eV<br>
                   ✅ Elétrons ejetados! (${electrons} aprox.)`;
      } else {
        message = `Energia do fóton: ${energy.toFixed(2)} eV<br>
                   Função trabalho (φ): ${phi} eV<br>
                   ❌ Abaixo da frequência de corte. Nenhum elétron ejetado.`;
      }

      if (infoDiv) infoDiv.innerHTML = message;

      ctx.fillStyle = '#001f3f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#888';
      ctx.fillRect(50, 100, 100, 100);
      ctx.fillStyle = '#FFF';
      ctx.font = '16px Arial';
      ctx.fillText(metal.toUpperCase(), 60, 155);

      const photonCount = Math.floor(intensity / 20) + 1;
      for (let i = 0; i < photonCount; i++) {
        const y = 80 + i * 30;
        ctx.beginPath();
        ctx.arc(200 + Math.sin(Date.now()/200 + i)*10, y, 8, 0, Math.PI*2);
        ctx.fillStyle = freq > 5 ? '#FF6B6B' : '#4ECDC4';
        ctx.fill();
        ctx.strokeStyle = '#FFF';
        ctx.stroke();
      }

      if (ke > 0) {
        for (let i = 0; i < electrons; i++) {
          const ex = 160 + i * 15;
          const ey = 120 + Math.sin(Date.now()/100 + i)*20;
          ctx.beginPath();
          ctx.arc(ex, ey, 6, 0, Math.PI*2);
          ctx.fillStyle = '#FFD700';
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(ex + 10, ey);
          ctx.lineTo(ex + 30, ey);
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      requestAnimationFrame(updateSimulator);
    }

    if (freqSlider && intensitySlider && metalSelect) {
      freqSlider.addEventListener('input', updateSimulator);
      intensitySlider.addEventListener('input', updateSimulator);
      metalSelect.addEventListener('change', updateSimulator);
      updateSimulator();
    }
  }

  // Calculadora de energia do fóton
  const calcBtn = document.getElementById('calcEnergy');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const freq = parseFloat(document.getElementById('photonFreq').value);
      const h = 6.626e-34;
      const energyJ = h * freq;
      const energyEV = energyJ / 1.6e-19;
      document.getElementById('energyResult').innerHTML = 
        `Energia = ${energyJ.toExponential(2)} J<br>ou ${energyEV.toFixed(2)} eV`;
    });
  }
});
