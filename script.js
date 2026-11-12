document.addEventListener('DOMContentLoaded', () => {

  // ====================== ACESSIBILIDADE ======================
  const highContrastBtn = document.getElementById('highContrast');
  const dyslexiaBtn = document.getElementById('dyslexia');
  const fontInc = document.getElementById('fontInc');
  const fontDec = document.getElementById('fontDec');
  const fontReset = document.getElementById('fontReset');

  if (highContrastBtn) {
    highContrastBtn.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      highContrastBtn.textContent = document.body.classList.contains('high-contrast')
        ? 'Contraste Normal'
        : 'Alto Contraste';
    });
  }

  if (dyslexiaBtn) {
    dyslexiaBtn.addEventListener('click', () => {
      document.body.classList.toggle('dyslexia');
      dyslexiaBtn.textContent = document.body.classList.contains('dyslexia')
        ? 'Fonte Normal'
        : 'Fonte Dislexia';
    });
  }

  let currentSize = 100;
  if (fontInc) {
    fontInc.addEventListener('click', () => {
      if (currentSize < 160) {
        currentSize += 10;
        document.body.style.fontSize = currentSize + '%';
      }
    });
  }
  if (fontDec) {
    fontDec.addEventListener('click', () => {
      if (currentSize > 85) {
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

  // ====================== CALCULADORA DE FÓTON ======================
  const calcBtn = document.getElementById('calcEnergy');
  if (calcBtn) {
    calcBtn.addEventListener('click', () => {
      const freq = parseFloat(document.getElementById('photonFreq').value);
      const result = document.getElementById('energyResult');

      if (isNaN(freq) || freq <= 0) {
        result.innerHTML = '<span style="color:#d32f2f; font-weight:600;">Digite uma frequência válida.</span>';
        return;
      }

      const h = 6.626e-34;
      const energyJ = h * freq;
      const energyEV = energyJ / 1.602e-19;

      result.innerHTML = `
        <div style="font-size:1.4rem; font-weight:700; color:#0d47a1;">
          ${energyJ.toExponential(2)} J
        </div>
        <div style="font-size:1.2rem; margin-top:6px;">
          ou <strong>${energyEV.toFixed(2)} eV</strong>
        </div>
      `;
    });
  }

  // ====================== SIMULADOR DO EFEITO FOTOELÉTRICO ======================
  const canvas = document.getElementById('simulatorCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 720;
    canvas.height = 360;

    const metals = {
      cesio: 2.14,
      potassio: 2.30,
      sodio: 2.75,
      zinco: 4.31,
      cobre: 4.65
    };

    function draw() {
      const freq = parseFloat(document.getElementById('frequency').value);
      const intensity = parseFloat(document.getElementById('intensity').value);
      const metal = document.getElementById('metal').value;
      const phi = metals[metal];

      const h = 4.135667696e-15;
      const energy = h * freq * 1e14;
      const ke = energy - phi;

      document.getElementById('freqValue').textContent = freq.toFixed(1);
      document.getElementById('intValue').textContent = intensity;

      let msg = `<strong>Energia do fóton:</strong> ${energy.toFixed(2)} eV<br>`;
      msg += `<strong>Função trabalho:</strong> ${phi} eV<br>`;

      if (ke > 0) {
        msg += `<strong>Energia cinética:</strong> ${ke.toFixed(2)} eV<br>`;
        msg += `<span style="color:#2e7d32; font-weight:700; font-size:1.1rem;">✅ Elétrons sendo ejetados</span>`;
      } else {
        msg += `<span style="color:#c62828; font-weight:700; font-size:1.1rem;">❌ Abaixo da frequência de corte</span>`;
      }
      document.getElementById('simInfo').innerHTML = msg;

      // Fundo
      const dark = document.body.classList.contains('high-contrast');
      ctx.fillStyle = dark ? '#000' : '#001f3f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Placa de metal
      ctx.fillStyle = '#616161';
      ctx.fillRect(60, 110, 150, 160);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 20px Poppins, Arial';
      ctx.fillText(metal.toUpperCase(), 85, 200);

      // Fótons
      const photonCount = Math.floor(intensity / 10) + 1;
      for (let i = 0; i < photonCount; i++) {
        const y = 70 + i * 45;
        const x = 260 + Math.sin(Date.now() / 160 + i) * 20;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = freq > 6.5 ? '#ff5252' : '#29b6f6';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Elétrons
      if (ke > 0) {
        const eCount = Math.min(8, Math.floor(intensity / 12));
        for (let i = 0; i < eCount; i++) {
          const x = 220 + i * 24;
          const y = 150 + Math.sin(Date.now() / 90 + i) * 35;
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#ffd700';
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(x + 16, y);
          ctx.lineTo(x + 48, y);
          ctx.strokeStyle = '#ffd700';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }

      requestAnimationFrame(draw);
    }

    document.getElementById('frequency')?.addEventListener('input', draw);
    document.getElementById('intensity')?.addEventListener('input', draw);
    document.getElementById('metal')?.addEventListener('change', draw);

    draw();
  }
});
