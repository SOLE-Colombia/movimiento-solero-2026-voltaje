---
title: SOLE Voltaje
---

<div class="language-selector-home">
  <div class="selector-container">
    <img src="/static/sole-logo.png" alt="SOLE Voltaje" class="sole-logo" onerror="this.style.display='none'">
    
    <h1>Bienvenidos | Welcome</h1>
    <p class="subtitle">Selecciona tu idioma | Select your language</p>
    
    <div class="language-buttons">
      <a href="/es/" class="lang-button lang-es">
        <span class="flag">🇪🇸</span>
        <span class="lang-name">Español</span>
        <span class="lang-desc">Contenido en español</span>
      </a>
      
      <a href="/en/" class="lang-button lang-en">
        <span class="flag">🇬🇧</span>
        <span class="lang-name">English</span>
        <span class="lang-desc">Content in English</span>
      </a>
    </div>
    
    <p class="auto-redirect" id="auto-redirect-message"></p>
  </div>
</div>

<style>
.language-selector-home {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.selector-container {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.sole-logo {
  max-width: 200px;
  margin-bottom: 2rem;
}

.language-selector-home h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--darkgray);
}

.subtitle {
  font-size: 1.2rem;
  color: var(--gray);
  margin-bottom: 3rem;
}

.language-buttons {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.lang-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 3rem;
  background: var(--lightgray);
  border: 2px solid var(--gray);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 200px;
}

.lang-button:hover {
  background: var(--highlight);
  border-color: var(--secondary);
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.lang-button .flag {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.lang-button .lang-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--darkgray);
  margin-bottom: 0.5rem;
}

.lang-button .lang-desc {
  font-size: 0.9rem;
  color: var(--gray);
}

.auto-redirect {
  font-size: 0.9rem;
  color: var(--gray);
  font-style: italic;
  min-height: 1.5rem;
}

@media (max-width: 600px) {
  .language-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .lang-button {
    width: 100%;
  }
}
</style>

<script>
// Detección automática del idioma del navegador
(function() {
  const userLang = navigator.language || navigator.userLanguage;
  const isSpanish = userLang.toLowerCase().startsWith('es');
  const message = document.getElementById('auto-redirect-message');
  
  if (isSpanish) {
    message.textContent = '🌐 Idioma detectado: Español. Haz clic arriba para continuar.';
  } else {
    message.textContent = '🌐 Language detected: English. Click above to continue.';
  }
})();
</script>

