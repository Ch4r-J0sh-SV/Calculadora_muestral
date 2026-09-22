/**
 * Calculadora de Tamaño de Muestra para Poblaciones Finitas
 * Lógica matemática pura, interfaz sobria y accesible.
 */

(function () {
  'use strict';

  // Elementos DOM
  const form = document.getElementById('form-muestra');
  const inputN = document.getElementById('poblacion');
  const selectError = document.getElementById('error');
  const selectConfianza = document.getElementById('confianza');
  const inputProporcion = document.getElementById('proporcion');
  const btnReset = document.getElementById('btn-reset');
  const btnCopiar = document.getElementById('btn-copiar');
  const btnTheme = document.getElementById('theme-toggle');
  const toast = document.getElementById('toast');

  // Mensajes de error
  const errorN = document.getElementById('poblacion-error');
  const errorP = document.getElementById('proporcion-error');

  // Elementos de resultados
  const resultadoNumero = document.getElementById('resultado-numero');
  const resultadoDetalle = document.getElementById('resultado-detalle');
  const metaFraccion = document.getElementById('meta-fraccion');
  const metaExacto = document.getElementById('meta-exacto');
  const stepsContainer = document.getElementById('math-steps-container');
  const tablaBody = document.getElementById('tabla-sensibilidad-body');
  const tablaPoblacionLabel = document.getElementById('tabla-poblacion-label');
  const historialLista = document.getElementById('historial-lista');
  const btnLimpiarHistorial = document.getElementById('btn-limpiar-historial');

  let ultimoCalculo = null;

  const STORAGE_THEME_KEY = 'calc_muestra_theme';
  const STORAGE_HISTORY_KEY = 'calc_muestra_historial';

  /**
   * Cálculo para población finita:
   * n = [ N · Z² · p(1-p) ] / [ e²(N-1) + Z² · p(1-p) ]
   */
  function calcularMuestra(N, Z, p, e) {
    const Z2 = Z ** 2;
    const pq = p * (1 - p);
    const numerador = N * Z2 * pq;

    const errorTerm = (e ** 2) * (N - 1);
    const varianzaTerm = Z2 * pq;
    const denominador = errorTerm + varianzaTerm;

    const cociente = numerador / denominador;
    let nFinal = Math.ceil(cociente);
    if (nFinal > N) {
      nFinal = N;
    }

    return {
      N,
      Z,
      Z2,
      p,
      q: 1 - p,
      pq,
      e,
      e2: e ** 2,
      errorTerm,
      varianzaTerm,
      numerador,
      denominador,
      cociente,
      n: nFinal,
      fraccionMuestral: (nFinal / N) * 100
    };
  }

  // Validaciones de formulario
  function validarFormulario() {
    let valido = true;

    const NVal = parseInt(inputN.value, 10);
    if (isNaN(NVal) || NVal < 1) {
      errorN.textContent = 'Ingresa un número entero positivo mayor o igual a 1.';
      inputN.classList.add('input-invalid');
      valido = false;
    } else {
      errorN.textContent = '';
      inputN.classList.remove('input-invalid');
    }

    const pVal = parseFloat(inputProporcion.value);
    if (isNaN(pVal) || pVal <= 0 || pVal >= 100) {
      errorP.textContent = 'La proporción debe estar entre 1% y 99%.';
      inputProporcion.classList.add('input-invalid');
      valido = false;
    } else {
      errorP.textContent = '';
      inputProporcion.classList.remove('input-invalid');
    }

    return valido;
  }

  function obtenerTextoConfianza(Z) {
    if (Math.abs(Z - 1.645) < 0.01) return '90% (Z = 1.645)';
    if (Math.abs(Z - 1.96) < 0.01) return '95% (Z = 1.960)';
    if (Math.abs(Z - 2.576) < 0.01) return '99% (Z = 2.576)';
    return `Z = ${Z.toFixed(3)}`;
  }

  function actualizarUI(resultado) {
    ultimoCalculo = resultado;

    resultadoNumero.textContent = resultado.n.toLocaleString('es');
    resultadoDetalle.innerHTML = 
      `Para una población de ${resultado.N.toLocaleString('es')}, con un margen de error ` +
      `de ±${(resultado.e * 100).toFixed(0)}%, un nivel de confianza del ` +
      `${obtenerTextoConfianza(resultado.Z).split(' ')[0]} y una proporción esperada del ${(resultado.p * 100).toFixed(0)}%.`;

    metaFraccion.textContent = `${resultado.fraccionMuestral.toFixed(2)}%`;
    metaExacto.textContent = resultado.cociente.toFixed(4);

    renderizarDesglose(resultado);
    renderizarTablaSensibilidad(resultado.N, resultado.p, resultado.e, resultado.Z);
    guardarEnHistorial(resultado);
  }

  function renderizarDesglose(res) {
    stepsContainer.innerHTML = `
      <div class="step-item">
        <div class="step-name">Paso 1: Variables identificadas</div>
        <div class="step-math">
          Población (N) = ${res.N.toLocaleString('es')}<br>
          Z = ${res.Z} → Z² = ${res.Z2.toFixed(4)}<br>
          p = ${res.p.toFixed(2)}, (1 - p) = ${res.q.toFixed(2)} → p(1 - p) = ${res.pq.toFixed(4)}<br>
          e = ${res.e.toFixed(2)} → e² = ${res.e2.toFixed(4)}, (N - 1) = ${(res.N - 1).toLocaleString('es')}
        </div>
      </div>

      <div class="step-item">
        <div class="step-name">Paso 2: Cálculo del numerador</div>
        <div class="step-math">
          Numerador = N · Z² · p(1 - p)<br>
          Numerador = ${res.N.toLocaleString('es')} · ${res.Z2.toFixed(4)} · ${res.pq.toFixed(4)} = <strong>${res.numerador.toLocaleString('es', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</strong>
        </div>
      </div>

      <div class="step-item">
        <div class="step-name">Paso 3: Cálculo del denominador</div>
        <div class="step-math">
          Denominador = [ e²(N - 1) ] + [ Z² · p(1 - p) ]<br>
          Denominador = [ ${res.e2.toFixed(4)} · ${(res.N - 1).toLocaleString('es')} ] + [ ${res.Z2.toFixed(4)} · ${res.pq.toFixed(4)} ]<br>
          Denominador = ${res.errorTerm.toFixed(4)} + ${res.varianzaTerm.toFixed(4)} = <strong>${res.denominador.toLocaleString('es', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</strong>
        </div>
      </div>

      <div class="step-item">
        <div class="step-name">Paso 4: Cociente y redondeo</div>
        <div class="step-math">
          n = ${res.numerador.toFixed(4)} / ${res.denominador.toFixed(4)} = ${res.cociente.toFixed(6)}<br>
          Redondeo hacia arriba: <strong>${res.n.toLocaleString('es')} personas</strong>
        </div>
      </div>
    `;
  }

  function renderizarTablaSensibilidad(N, p, eActivo, zActivo) {
    tablaPoblacionLabel.textContent = `N = ${N.toLocaleString('es')}`;
    const errores = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10];
    const nivelesZ = [
      { z: 1.645 },
      { z: 1.96 },
      { z: 2.576 }
    ];

    let html = '';
    errores.forEach(err => {
      const pctError = (err * 100).toFixed(0);
      const isCurrentError = Math.abs(err - eActivo) < 0.001;

      html += `<tr>`;
      html += `<td>±${pctError}%</td>`;

      nivelesZ.forEach(conf => {
        const calc = calcularMuestra(N, conf.z, p, err);
        const isCurrentZ = Math.abs(conf.z - zActivo) < 0.01;
        const isActiveCell = isCurrentError && isCurrentZ;
        const cellClass = isActiveCell ? 'class="cell-active"' : '';

        html += `<td ${cellClass}>${calc.n.toLocaleString('es')}</td>`;
      });

      html += `</tr>`;
    });

    tablaBody.innerHTML = html;
  }

  // Historial
  function cargarHistorial() {
    try {
      const data = localStorage.getItem(STORAGE_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function guardarEnHistorial(resultado) {
    try {
      const historial = cargarHistorial();
      const nuevoItem = {
        id: Date.now(),
        N: resultado.N,
        e: resultado.e,
        Z: resultado.Z,
        p: resultado.p,
        n: resultado.n,
        fecha: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
      };

      if (historial.length > 0) {
        const ultimo = historial[0];
        if (
          ultimo.N === nuevoItem.N &&
          Math.abs(ultimo.e - nuevoItem.e) < 0.001 &&
          Math.abs(ultimo.Z - nuevoItem.Z) < 0.01 &&
          Math.abs(ultimo.p - nuevoItem.p) < 0.001
        ) {
          return;
        }
      }

      historial.unshift(nuevoItem);
      if (historial.length > 5) {
        historial.pop();
      }

      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(historial));
      renderizarHistorial();
    } catch (e) {
      // Ignorar si el almacenamiento local está restringido
    }
  }

  function renderizarHistorial() {
    const historial = cargarHistorial();
    if (historial.length === 0) {
      historialLista.innerHTML = '<p class="history-empty">No hay cálculos recientes.</p>';
      return;
    }

    let html = '';
    historial.forEach(item => {
      const confianzaPct = item.Z === 1.645 ? '90%' : item.Z === 1.96 ? '95%' : '99%';
      html += `
        <div class="history-row">
          <div class="history-info">
            N = <strong>${item.N.toLocaleString('es')}</strong>, 
            e = ±${(item.e * 100).toFixed(0)}%, 
            conf = ${confianzaPct}, 
            p = ${(item.p * 100).toFixed(0)}%
            <span style="opacity: 0.6; margin-left: 4px;">(${item.fecha})</span>
          </div>
          <div class="history-action">
            <span class="history-badge">n = ${item.n.toLocaleString('es')}</span>
            <button type="button" class="btn-load" data-id="${item.id}">Cargar</button>
          </div>
        </div>
      `;
    });

    historialLista.innerHTML = html;

    historialLista.querySelectorAll('.btn-load').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        const item = historial.find(h => h.id === id);
        if (item) {
          inputN.value = item.N;
          selectError.value = item.e.toString();
          selectConfianza.value = item.Z.toString();
          inputProporcion.value = (item.p * 100).toString();
          ejecutarCalculo();
        }
      });
    });
  }

  // Modo Oscuro / Claro
  function inicializarTema() {
    const temaGuardado = localStorage.getItem(STORAGE_THEME_KEY);
    const prefiereOscuro = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const temaInicial = temaGuardado || (prefiereOscuro ? 'dark' : 'light');

    aplicarTema(temaInicial);

    btnTheme.addEventListener('click', () => {
      const temaActual = document.documentElement.getAttribute('data-theme') || 'light';
      const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
      aplicarTema(nuevoTema);
      localStorage.setItem(STORAGE_THEME_KEY, nuevoTema);
    });
  }

  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);
    btnTheme.textContent = tema === 'dark' ? 'Modo claro' : 'Modo oscuro';
  }

  // Notificación breve
  let toastTimer = null;
  function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add('toast-show');
    toast.setAttribute('aria-hidden', 'false');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('toast-show');
      toast.setAttribute('aria-hidden', 'true');
    }, 2500);
  }

  // Copiar resumen
  function copiarResumen() {
    if (!ultimoCalculo) return;

    const texto = 
`Resumen de cálculo de tamaño de muestra
----------------------------------------
Población (N): ${ultimoCalculo.N.toLocaleString('es')}
Nivel de confianza: ${obtenerTextoConfianza(ultimoCalculo.Z)}
Margen de error (e): ±${(ultimoCalculo.e * 100).toFixed(0)}%
Proporción esperada (p): ${(ultimoCalculo.p * 100).toFixed(0)}%

Resultado:
Tamaño de muestra (n): ${ultimoCalculo.n.toLocaleString('es')} personas
Valor sin redondear: ${ultimoCalculo.cociente.toFixed(4)}
Fracción de muestreo: ${ultimoCalculo.fraccionMuestral.toFixed(2)}%

Fórmula: n = [ N · Z² · p(1-p) ] / [ e²(N-1) + Z² · p(1-p) ]
Criterio: Redondeo hacia arriba al entero superior inmediato.`;

    const restaurarBoton = () => {
      btnCopiar.textContent = 'Copiado';
      setTimeout(() => {
        btnCopiar.textContent = 'Copiar resultado';
      }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(() => {
        mostrarToast('Resumen copiado al portapapeles');
        restaurarBoton();
      }).catch(() => {
        copiarAlternativo(texto);
      });
    } else {
      copiarAlternativo(texto);
    }
  }

  function copiarAlternativo(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      mostrarToast('Resumen copiado al portapapeles');
      btnCopiar.textContent = 'Copiado';
      setTimeout(() => {
        btnCopiar.textContent = 'Copiar resultado';
      }, 1800);
    } catch (e) {
      mostrarToast('No se pudo copiar el texto');
    }
    document.body.removeChild(textarea);
  }

  function ejecutarCalculo() {
    if (!validarFormulario()) {
      return;
    }

    const N = parseInt(inputN.value, 10);
    const e = parseFloat(selectError.value);
    const Z = parseFloat(selectConfianza.value);
    const p = parseFloat(inputProporcion.value) / 100;

    const resultado = calcularMuestra(N, Z, p, e);
    actualizarUI(resultado);
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    ejecutarCalculo();
  });

  inputN.addEventListener('input', () => {
    if (inputN.value) {
      errorN.textContent = '';
      inputN.classList.remove('input-invalid');
    }
  });

  inputProporcion.addEventListener('input', () => {
    if (inputProporcion.value) {
      errorP.textContent = '';
      inputProporcion.classList.remove('input-invalid');
    }
  });

  selectError.addEventListener('change', () => {
    if (validarFormulario()) ejecutarCalculo();
  });

  selectConfianza.addEventListener('change', () => {
    if (validarFormulario()) ejecutarCalculo();
  });

  btnReset.addEventListener('click', function () {
    inputN.value = '2800';
    selectError.value = '0.05';
    selectConfianza.value = '1.96';
    inputProporcion.value = '50';
    errorN.textContent = '';
    errorP.textContent = '';
    inputN.classList.remove('input-invalid');
    inputProporcion.classList.remove('input-invalid');
    ejecutarCalculo();
  });

  btnCopiar.addEventListener('click', copiarResumen);

  btnLimpiarHistorial.addEventListener('click', function () {
    try {
      localStorage.removeItem(STORAGE_HISTORY_KEY);
      renderizarHistorial();
      mostrarToast('Historial vaciado');
    } catch (e) {
      // Ignorar
    }
  });

  inicializarTema();
  renderizarHistorial();
  ejecutarCalculo();
})();
