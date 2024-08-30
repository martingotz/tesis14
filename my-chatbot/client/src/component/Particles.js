import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.1.0/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.1.0/+esm";

export async function loadParticles(options) {
  await loadAll(tsParticles);
  await tsParticles.load({ id: "tsparticles", options });
}

export const Particles = {
    particles: {
      number: {
        value: 150,  // Aumentar el número de partículas para crear un efecto más denso
      },
      color: {
        value: "#A5FF00"  // Verde brillante similar al que aparece en la imagen
      },
      links: {
        enable: true,
        distance: 150,  // Reduce la distancia entre partículas para crear un efecto de red más denso
        color: "#A5FF00",  // Color de las líneas de conexión
        opacity: 0.4  // Ajusta la opacidad para que las líneas no sean demasiado brillantes
      },
      shape: {
        type: "circle",  // Partículas en forma de círculo
      },
      opacity: {
        value: 0.5,  // Opacidad ajustada para que las partículas no sean demasiado brillantes
      },
      size: {
        value: {
          min: 3,
          max: 5,  // Tamaño de las partículas
        },
      },
      move: {
        enable: true,
        speed: 1.5,  // Velocidad de movimiento para un efecto suave
      }
    },
    background: {
      color: {
        value: "radial-gradient(circle at center, #001005 0%, #020f05 50%, #010703 50%, #010b03 100%)"
      }
    }
  };
  
  
  
  