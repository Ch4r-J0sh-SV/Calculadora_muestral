/**
 * Calculadora de Tamaño de Muestra para Poblaciones Finitas
 * Sistema de Diseño Apple (macOS & iOS) — V0.3
 * Cero emojis, interactividad nativa y rigor estadístico.
 */

(function () {
  'use strict';

  // Referencias a elementos del DOM
  const form = document.getElementById('form-muestra');
  const inputN = document.getElementById('poblacion');
  const selectError = document.getElementById('error');
  const selectConfianza = document.getElementById('confianza');
  const inputProporcion = document.getElementById('proporcion');
  const btnReset = document.getElementById('btn-reset');
  const btnCopiar = document.getElementById('btn-copiar');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyIcon = document.getElementById('copy-icon');
  const btnTheme = document.getElementById('theme-toggle');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  // Segmented Control de Nivel de Confianza
  const segmentedConfianza = document.getElementById('segmented-confianza');
  const segmentBtns = segmentedConfianza ? segmentedConfianza.querySelectorAll('.segment-btn') : [];

  // Mensajes de error de validación
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
  let toastTimer = null;

  const STORAGE_THEME_KEY = 'calc_muestra_theme';
  const STORAGE_HISTORY_KEY = 'calc_muestra_historial';

  /**
   * Fórmula para población finita:
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

  // Validación de campos del formulario
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
      errorP.textContent = 'La proporción debe situarse entre 1% y 99%.';
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

  // Sincronización del Segmented Control
  function sincronizarSegmentedControl(valorZ) {
    segmentBtns.forEach(btn => {
      const btnVal = parseFloat(btn.getAttribute('data-value'));
      const esActivo = Math.abs(btnVal - valorZ) < 0.01;
      if (esActivo) {
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-checked', 'false');
      }
    });
  }

  function actualizarUI(resultado) {
    ultimoCalculo = resultado;

    resultadoNumero.textContent = resultado.n.toLocaleString('es');
    resultadoDetalle.innerHTML = 
      `Para una población de <strong>${resultado.N.toLocaleString('es')}</strong>, con un margen de error ` +
      `de <strong>±${(resultado.e * 100).toFixed(0)}%</strong>, un nivel de confianza del ` +
      `<strong>${obtenerTextoConfianza(resultado.Z).split(' ')[0]}</strong> y una proporción esperada del <strong>${(resultado.p * 100).toFixed(0)}%</strong>.`;

    metaFraccion.textContent = `${resultado.fraccionMuestral.toFixed(2)}%`;
    metaExacto.textContent = resultado.cociente.toFixed(4);

    sincronizarSegmentedControl(resultado.Z);
    renderizarDesglose(resultado);
    renderizarTablaSensibilidad(resultado.N, resultado.p, resultado.e, resultado.Z);
    guardarEnHistorial(resultado);
  }

  function renderizarDesglose(res) {
    stepsContainer.innerHTML = `
      <div class="apple-step-card">
        <div class="step-card-header">Paso 1: Variables Identificadas</div>
        <div class="step-card-math">
          Población (N) = ${res.N.toLocaleString('es')}<br>
          Z = ${res.Z} → Z² = ${res.Z2.toFixed(4)}<br>
          p = ${res.p.toFixed(2)}, (1 - p) = ${res.q.toFixed(2)} → p(1 - p) = ${res.pq.toFixed(4)}<br>
          e = ${res.e.toFixed(2)} → e² = ${res.e2.toFixed(4)}, (N - 1) = ${(res.N - 1).toLocaleString('es')}
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Paso 2: Cálculo del Numerador</div>
        <div class="step-card-math">
          Numerador = N · Z² · p(1 - p)<br>
          Numerador = ${res.N.toLocaleString('es')} · ${res.Z2.toFixed(4)} · ${res.pq.toFixed(4)} = <strong>${res.numerador.toLocaleString('es', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Paso 3: Cálculo del Denominador</div>
        <div class="step-card-math">
          Denominador = [ e²(N - 1) ] + [ Z² · p(1 - p) ]<br>
          Denominador = [ ${res.e2.toFixed(4)} · ${(res.N - 1).toLocaleString('es')} ] + [ ${res.Z2.toFixed(4)} · ${res.pq.toFixed(4)} ]<br>
          Denominador = ${res.errorTerm.toFixed(4)} + ${res.varianzaTerm.toFixed(4)} = <strong>${res.denominador.toLocaleString('es', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Paso 4: Cociente y Ajuste Final</div>
        <div class="step-card-math">
          n = ${res.numerador.toFixed(4)} / ${res.denominador.toFixed(4)} = ${res.cociente.toFixed(6)}<br>
          Redondeo al entero superior: <strong>${res.n.toLocaleString('es')} elementos</strong>
        </div>
      </div>
    `;
  }

  function renderizarTablaSensibilidad(N, p, eActivo, zActivo) {
    if (tablaPoblacionLabel) {
      tablaPoblacionLabel.textContent = `N = ${N.toLocaleString('es')}`;
    }

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

  // Gestión de Almacenamiento Local (Historial)
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
      // Ignorar si el almacenamiento local está desactivado
    }
  }

  function renderizarHistorial() {
    const historial = cargarHistorial();
    if (historial.length === 0) {
      historialLista.innerHTML = '<p class="history-empty">No hay registros recientes.</p>';
      return;
    }

    let html = '';
    historial.forEach(item => {
      const confianzaPct = item.Z === 1.645 ? '90%' : item.Z === 1.96 ? '95%' : '99%';
      html += `
        <div class="apple-history-item">
          <div class="history-details">
            N = <strong>${item.N.toLocaleString('es')}</strong>, 
            e = ±${(item.e * 100).toFixed(0)}%, 
            Z = ${confianzaPct}, 
            p = ${(item.p * 100).toFixed(0)}%
            <span class="history-time">(${item.fecha})</span>
          </div>
          <div class="history-actions">
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
          sincronizarSegmentedControl(item.Z);
          inputProporcion.value = (item.p * 100).toString();
          ejecutarCalculo();
          mostrarToast('Parámetros restaurados desde el historial');
        }
      });
    });
  }

  // Modo Oscuro / Claro estilo Apple
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
    const esOscuro = tema === 'dark';
    btnTheme.setAttribute('aria-checked', esOscuro ? 'true' : 'false');
  }

  // Notificación HUD estilo Dynamic Island
  function mostrarToast(mensaje) {
    toastMessage.textContent = mensaje;
    toast.classList.add('toast-show');
    toast.setAttribute('aria-hidden', 'false');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('toast-show');
      toast.setAttribute('aria-hidden', 'true');
    }, 2400);
  }

  // Copiar resumen al portapapeles
  function copiarResumen() {
    if (!ultimoCalculo) return;

    const texto = 
`Resumen de cálculo de tamaño de muestra (macOS Edition)
------------------------------------------------------
Población (N): ${ultimoCalculo.N.toLocaleString('es')}
Nivel de confianza: ${obtenerTextoConfianza(ultimoCalculo.Z)}
Margen de error (e): ±${(ultimoCalculo.e * 100).toFixed(0)}%
Proporción esperada (p): ${(ultimoCalculo.p * 100).toFixed(0)}%

Resultado:
Tamaño de muestra (n): ${ultimoCalculo.n.toLocaleString('es')} elementos
Valor sin redondear: ${ultimoCalculo.cociente.toFixed(4)}
Fracción de muestreo: ${ultimoCalculo.fraccionMuestral.toFixed(2)}%

Fórmula: n = [ N · Z² · p(1-p) ] / [ e²(N-1) + Z² · p(1-p) ]
Criterio: Redondeo hacia arriba al entero superior inmediato.`;

    const restaurarBoton = () => {
      copyBtnText.textContent = 'Copiado';
      copyIcon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
      setTimeout(() => {
        copyBtnText.textContent = 'Copiar';
        copyIcon.innerHTML = `
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        `;
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(() => {
        mostrarToast('Resumen copiado al portapapeles');
        restaurarBoton();
      }).catch(() => {
        copiarAlternativo(texto, restaurarBoton);
      });
    } else {
      copiarAlternativo(texto, restaurarBoton);
    }
  }

  function copiarAlternativo(texto, callback) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      mostrarToast('Resumen copiado al portapapeles');
      if (callback) callback();
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

  // Escuchadores de eventos
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
    sincronizarSegmentedControl(parseFloat(selectConfianza.value));
    if (validarFormulario()) ejecutarCalculo();
  });

  // Eventos de los botones del Segmented Control
  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-value');
      selectConfianza.value = val;
      sincronizarSegmentedControl(parseFloat(val));
      if (validarFormulario()) ejecutarCalculo();
    });
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
    sincronizarSegmentedControl(1.96);
    ejecutarCalculo();
    mostrarToast('Parámetros restablecidos');
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

  // Inicialización
  inicializarTema();
  renderizarHistorial();
  ejecutarCalculo();
})();
