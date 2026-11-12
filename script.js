document.addEventListener('DOMContentLoaded', () => {
  const highContrastBtn = document.getElementById('highContrast');
  const dyslexiaBtn = document.getElementById('dyslexia');
  const fontInc = document.getElementById('fontInc');
  const fontDec = document.getElementById('fontDec');
  const fontReset = document.getElementById('fontReset');

  highContrastBtn?.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
    highContrastBtn.textContent = document.body.classList.contains('high-contrast') ? 'Contraste Normal' : 'Alto Contraste';
  });
  dyslexiaBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dyslexia');
    dyslexiaBtn.textContent = document.body.classList.contains('dyslexia') ? 'Fonte Normal' : 'Fonte Dislexia';
  });

  let size = 100;
  fontInc?.addEventListener('click', () => { if (size < 160) { size += 10; document.body.style.fontSize = size + '%'; } });
  fontDec?.addEventListener('click', () => { if (size > 80) { size -= 10; document.body.style.fontSize = size + '%'; } });
  fontReset?.addEventListener('click', () => { size = 100; document.body.style.fontSize = '100%'; });

  document.getElementById('calcEnergy')?.addEventListener('click', () => {
    const freq = parseFloat(document.getElementById('photonFreq').value);
    const h = 6.626e-34;
    const eJ = h * freq;
    const eV = eJ / 1.602e-19;
    document.getElementById('energyResult').innerHTML =
      `<strong>${eJ.toExponential(2)} J</strong><br>ou <strong>${eV.toFixed(2)} eV</strong>`;
  });

  const canvas = document.getElementById('simulatorCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 320;
    const metals = { cesio: 2.14, potassio: 2.30, sodio: 2.75, zinco: 4.31, cobre: 4.65 };

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

      let msg = `Energia do fóton: <strong>${energy.toFixed(2)} eV</strong><br>Função trabalho: <strong>${phi} eV</strong><br>`;
      msg += ke > 0
        ? `Energia cinética: <strong>${ke.toFixed(2)} eV</strong><br>✅ Elétrons ejetados!`
        : `❌ Abaixo da frequência de corte. Nenhum elétron ejetado.`;
      document.getElementById('simInfo').innerHTML = msg;

      ctx.fillStyle = document.body.classList.contains('high-contrast') ? '#000' : '#001f3f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#777';
      ctx.fillRect(40, 90, 120, 140);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(metal.toUpperCase(), 55, 165);

      const count = Math.floor(intensity / 15) + 1;
      for (let i = 0; i < count; i++) {
        const y = 70 + i * 35;
        ctx.beginPath();
        ctx.arc(220 + Math.sin(Date.now()/180 + i) * 12, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = freq > 6 ? '#ff6b6b' : '#4ecdc4';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      if (ke > 0) {
        const eCount = Math.min(8, Math.floor(intensity / 12));
        for (let i = 0; i < eCount; i++) {
          const x = 170 + i * 18;
          const y = 130 + Math.sin(Date.now()/90 + i) * 25;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#ffd700';
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(x + 12, y);
          ctx.lineTo(x + 35, y);
          ctx.strokeStyle = '#ffd700';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
      requestAnimationFrame(draw);
    }
    ['frequency', 'intensity', 'metal'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', draw);
      document.getElementById(id)?.addEventListener('change', draw);
    });
    draw();
  }
});
