import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import style from "./styles/homePopup.scss"

export default (() => {
  const HomePopup: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div class={`home-popup-overlay ${displayClass ?? ""}`} id="home-popup-overlay">
        <div class="home-popup-container">
          <div class="home-popup-header">
            <span class="home-popup-title">SOLE Voltaje - Voltaje sin electrocutarte</span>
            <button type="button" class="home-popup-close-btn" id="home-popup-close" aria-label="Cerrar">
              &times;
            </button>
          </div>
          <div class="home-popup-content">
            <iframe 
              src="https://embed.figma.com/proto/dujHuX75jOX5FBbUltzUap/SOLE-Voltaje-V1?node-id=1-1681&embed-host=share" 
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            const overlay = document.getElementById('home-popup-overlay');
            const closeBtn = document.getElementById('home-popup-close');
            
            if (!overlay || !closeBtn) return;

            // Mostrar el popup al cargar
            setTimeout(() => {
              overlay.classList.add('visible');
              document.body.style.overflow = 'hidden'; // Prevenir scroll del fondo
            }, 1000);

            const closePopup = () => {
              overlay.classList.remove('visible');
              document.body.style.overflow = '';
              // Opcional: remover del DOM después de la transición
              setTimeout(() => {
                overlay.style.display = 'none';
              }, 300);
            };

            closeBtn.addEventListener('click', closePopup);
            
            // Cerrar al hacer clic fuera del contenedor
            overlay.addEventListener('click', (e) => {
              if (e.target === overlay) {
                closePopup();
              }
            });

            // Cerrar con Escape
            document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape' && overlay.classList.contains('visible')) {
                closePopup();
              }
            });
          })();
        ` }} />
      </div>
    )
  }

  HomePopup.css = style
  return HomePopup
}) satisfies QuartzComponentConstructor
