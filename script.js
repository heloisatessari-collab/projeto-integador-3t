/* style.css - Projeto Integrador - Versão Profissional */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

:root {
  --blue-dark: #0a2540;
  --blue: #1b6ca8;
  --cyan: #4fc3f7;
  --yellow: #ffca28;
  --orange: #ff9800;
  --bg: #f5f9fc;
  --card: #ffffff;
  --text: #0a2540;
  --shadow: 0 8px 30px rgba(10, 37, 64, 0.1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Poppins', 'Segoe UI', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.7;
}

body.high-contrast {
  background: #000 !important;
  color: #ffff00 !important;
}
body.high-contrast .card,
body.high-contrast .simulator,
body.high-contrast .calc-box,
body.high-contrast header,
body.high-contrast footer,
body.high-contrast .sitemap {
  background: #111 !important;
  color: #ffff00 !important;
  border-color: #ffff00 !important;
}
body.high-contrast a { color: #00ffff !important; }
body.high-contrast .btn { background: #ffff00 !important; color: #000 !important; border: 2px solid #fff; }

body.dyslexia {
  font-family: 'OpenDyslexic', 'Comic Sans MS', sans-serif;
  letter-spacing: 0.05em;
  line-height: 1.95;
}

@font-face {
  font-family: 'OpenDyslexic';
  src: url('https://cdn.jsdelivr.net/fontsource/fonts/opendyslexic@5.3.0/latin-400-normal.woff2') format('woff2');
  font-display: swap;
}

.a11y-controls {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  background: white;
  padding: 12px;
  border-radius: 16px;
  box-shadow: var(--shadow);
}
body.high-contrast .a11y-controls { background: #222; border: 2px solid #ff0; }
.a11y-controls button {
  padding: 8px 14px;
  border: none;
  border-radius: 10px;
  background: var(--blue);
  color: white;
  font-weight: 600;
  cursor: pointer;
}

header {
  background: linear-gradient(90deg, var(--blue-dark), var(--blue));
  color: white;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 99;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
nav ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: center;
}
nav a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  transition: 0.2s;
}
nav a:hover, nav a:focus {
  background: var(--yellow);
  color: var(--blue-dark);
}

.hero {
  text-align: center;
  padding: 5.5rem 1.5rem 4.5rem;
  background: linear-gradient(135deg, #0a2540 0%, #1b6ca8 45%, #ff9800 100%);
  color: white;
}
.hero h1 {
  font-size: 2.7rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}
.hero p {
  font-size: 1.3rem;
  max-width: 850px;
  margin: 0 auto;
  opacity: 0.95;
}

main {
  max-width: 1150px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

h2 {
  font-size: 2rem;
  margin: 3.2rem 0 1.3rem;
  color: var(--blue-dark);
  position: relative;
  display: inline-block;
}
h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 70px;
  height: 4px;
  background: var(--orange);
  border-radius: 2px;
}
body.high-contrast h2 { color: #ff0; }
body.high-contrast h2::after { background: #ff0; }

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.8rem;
  margin: 2rem 0;
}
.card {
  background: var(--card);
  padding: 1.8rem;
  border-radius: 20px;
  box-shadow: var(--shadow);
  border-top: 5px solid var(--orange);
  transition: transform 0.3s ease;
}
.card:hover { transform: translateY(-8px); }
.card h3 { margin-bottom: 0.8rem; color: var(--blue); font-size: 1.3rem; }

.simulator, .calc-box, .sitemap {
  background: var(--card);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: var(--shadow);
  margin: 2rem 0;
  text-align: center;
}
.sitemap { text-align: left; }

.equation {
  font-size: 1.55rem;
  font-weight: 700;
  text-align: center;
  background: #fff8e1;
  padding: 1.1rem;
  border-radius: 12px;
  margin: 1.3rem 0;
  border-left: 5px solid var(--orange);
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 1.5rem 0;
}
.controls label {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  min-width: 190px;
}
input[type="range"] { width: 200px; margin: 8px 0; }
select, input[type="number"] {
  padding: 10px 14px;
  border-radius: 10px;
  border: 2px solid #ddd;
  font-size: 1rem;
  font-family: inherit;
}

canvas {
  border: 3px solid var(--blue);
  border-radius: 16px;
  background: #001f3f;
  max-width: 100%;
  margin: 1.5rem auto;
  display: block;
}

.btn {
  display: inline-block;
  padding: 0.85rem 1.7rem;
  background: var(--orange);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  margin: 0.5rem;
  font-size: 1rem;
}
.btn:hover, .btn:focus {
  background: var(--yellow);
  color: var(--blue-dark);
}

footer {
  background: var(--blue-dark);
  color: white;
  text-align: center;
  padding: 2.8rem 1rem;
  margin-top: 4rem;
  font-size: 0.95rem;
}

.skip-link {
  position: absolute;
  top: -50px;
  left: 10px;
  background: var(--yellow);
  color: #000;
  padding: 10px 16px;
  z-index: 9999;
  font-weight: 700;
  border-radius: 8px;
}
.skip-link:focus { top: 10px; }

*:focus-visible {
  outline: 3px solid var(--yellow);
  outline-offset: 3px;
}

@media (max-width: 768px) {
  .hero h1 { font-size: 1.9rem; }
  .hero p { font-size: 1.1rem; }
  nav ul { flex-direction: column; align-items: center; gap: 0.4rem; }
  .a11y-controls {
    top: auto;
    bottom: 12px;
    left: 12px;
    right: 12px;
    justify-content: center;
  }
  h2 { font-size: 1.7rem; }
}
