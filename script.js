/**
 * Calculadora de Tamaño de Muestra para Poblaciones Finitas
 * Lógica matemática pura, interactividad accesible y persistencia local.
 */

(function () {
  'use strict';

  // --- Elementos DOM ---
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

  // Estado del último cálculo realizado
  let ultimoCalculo = null;

  // Claves de almacenamiento local
  const STORAGE_THEME_KEY = 'calculadora_muestral_theme';
  const STORAGE_HISTORY_KEY = 'calculadora_muestral_history';

  // --- Función Matemática Central ---
  /**
   * Calcula el tamaño de muestra según la fórmula de población finita:
   * n = [ N · Z² · p(1-p) ] / [ e²(N-1) + Z² · p(1-p) ]
   *
   * @param {number} N - Tamaño de la población (entero >= 1)
   * @param {number} Z - Coeficiente de la distribución normal estándar
   * @param {number} p - Proporción esperada (decimal entre 0 y 1)
   * @param {number} e - Margen de error admisible (decimal entre 0 y 1)
   * @returns {Object} Desglose completo de valores y resultado final
   */
  function calcularMuestra(N, Z, p, e) {
    const Z2 = Z ** 2;
    const pq = p * (1 - p);
    const numerador = N * Z2 * pq;

    const errorTerm = (e ** 2) * (N - 1);
    const varianzaTerm = Z2 * pq;
    const denominador = errorTerm + varianzaTerm;

    const cociente = numerador / denominador;
    // Redondeo por exceso estricto, sin sobrepasar la población N
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

  // --- Validaciones ---
  function validarFormulario() {
    let valido = true;

    // Validación de N
    const NVal = parseInt(inputN.value, 10);
    if (isNaN(NVal) || NVal < 1) {
      errorN.textContent = 'Ingresa un número entero positivo mayor o igual a 1.';
      inputN.classList.add('input-invalid');
      valido = false;
    } else {
      errorN.textContent = '';
      inputN.classList.remove('input-invalid');
    }

    // Validación de p
    const pVal = parseFloat(inputProporcion.value);
    if (isNaN(pVal) || pVal <= 0 || pVal >= 100) {
      errorP.textContent = 'La proporción debe estar estrictamente entre 1% y 99%.';
      inputProporcion.classList.add('input-invalid');
      valido = false;
    } else {
      errorP.textContent = '';
      inputProporcion.classList.remove('input-invalid');
    }

    return valido;
  }

  // --- Actualización de la Interfaz ---
  function actualizarUI(resultado) {
    ultimoCalculo = resultado;

    // 1. Métrica principal
    resultadoNumero.textContent = resultado.n.toLocaleString('es');
    resultadoDetalle.innerHTML = 
      `Para una población finita de <strong>${resultado.N.toLocaleString('es')}</strong> elementos, ` +
      `con un margen de error de <strong>±${(resultado.e * 100).toFixed(0)}%</strong>, ` +
      `un nivel de confianza del <strong>${obtenerTextoConfianza(resultado.Z)}</strong> ` +
      `y una proporción esperada del <strong>${(resultado.p * 100).toFixed(0)}%</strong>.`;

    metaFraccion.textContent = `${resultado.fraccionMuestral.toFixed(2)}%`;
    metaExacto.textContent = resultado.cociente.toFixed(4);

    // 2. Desglose matemático paso a paso
    renderizarDesglose(resultado);

    // 3. Tabla de sensibilidad dinámica
    renderizarTablaSensibilidad(resultado.N, resultado.p, resultado.e, resultado.Z);

    // 4. Guardar en historial
    guardarEnHistorial(resultado);
  }

  function obtenerTextoConfianza(Z) {
    if (Math.abs(Z - 1.645) < 0.01) return '90% (Z = 1.645)';
    if (Math.abs(Z - 1.96) < 0.01) return '95% (Z = 1.960)';
    if (Math.abs(Z - 2.576) < 0.01) return '99% (Z = 2.576)';
    return `Z = ${Z.toFixed(3)}`;
  }

  function renderizarDesglose(res) {
    stepsContainer.innerHTML = `
      <div class="step-card">
        <div class="step-title">Paso 1: Variables y constantes identificadas</div>
        <div class="step-calc">
          • Población (N) = ${res.N.toLocaleString('es')}<br>
          • Nivel de confianza Z = ${res.Z} → Z² = ${res.Z2.toFixed(4)}<br>
          • Proporción (p) = ${res.p.toFixed(2)}, (1 - p) = ${res.q.toFixed(2)} → Varianza p·(1-p) = ${res.pq.toFixed(4)}<br>
          • Margen de error (e) = ${res.e.toFixed(2)} → e² = ${res.e2.toFixed(4)}, (N - 1) = ${(res.N - 1).toLocaleString('es')}
        </div>
      </div>

      <div class="step-card">
        <div class="step-title">Paso 2: Cálculo del numerador</div>
        <div class="step-calc">
          Numerador = N · Z² · p · (1 - p)<br>
          Numerador = ${res.N.toLocaleString('es')} · ${res.Z2.toFixed(4)} · ${res.pq.toFixed(4)}<br>
          <strong>Numerador = ${res.numerador.toLocaleString('es', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</strong>
        </div>
      </div>

      <div class="step-card">
        <div class="step-title">Paso 3: Cálculo del denominador (con corrección de población)</div>
        <div class="step-calc">
          Denominador = [ e² · (N - 1) ] + [ Z² · p · (1 - p) ]<br>
          Denominador = [ ${res.e2.toFixed(4)} · ${(res.N - 1).toLocaleString('es')} ] + [ ${res.Z2.toFixed(4)} · ${res.pq.toFixed(4)} ]<br>
          Denominador = ${res.errorTerm.toFixed(4)} + ${res.varianzaTerm.toFixed(4)}<br>
          <strong>Denominador = ${res.denominador.toLocaleString('es', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}</strong>
        </div>
      </div>

      <div class="step-card">
        <div class="step-title">Paso 4: Cociente y redondeo por exceso</div>
        <div class="step-calc">
          n = Numerador / Denominador = ${res.numerador.toFixed(4)} / ${res.denominador.toFixed(4)}<br>
          n (decimal continuo) = <strong>${res.cociente.toFixed(6)}</strong><br>
          Aplicando techo formal ⌈n⌉: ⌈${res.cociente.toFixed(4)}⌉ = <strong>${res.n.toLocaleString('es')} personas</strong>
        </div>
      </div>
    `;
  }

  function renderizarTablaSensibilidad(N, p, eActivo, zActivo) {
    tablaPoblacionLabel.textContent = `N = ${N.toLocaleString('es')}`;
    const errores = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10];
    const nivelesZ = [
      { z: 1.645, label: '90%' },
      { z: 1.96, label: '95%' },
      { z: 2.576, label: '99%' }
    ];

    let html = '';

    errores.forEach(err => {
      const pctError = (err * 100).toFixed(0);
      const isCurrentError = Math.abs(err - eActivo) < 0.001;

      html += `<tr>`;
      html += `<td><strong>±${pctError}%</strong></td>`;

      nivelesZ.forEach(conf => {
        const calc = calcularMuestra(N, conf.z, p, err);
        const isCurrentZ = Math.abs(conf.z - zActivo) < 0.01;
        const isActiveCell = isCurrentError && isCurrentZ;
        const cellClass = isActiveCell ? 'class="cell-active" title="Combinación actualmente seleccionada"' : '';

        html += `<td ${cellClass}>${calc.n.toLocaleString('es')}</td>`;
      });

      html += `</tr>`;
    });

    tablaBody.innerHTML = html;
  }

  // --- Historial Local ---
  function cargarHistorial() {
    try {
      const data = localStorage.getItem(STORAGE_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('No se pudo acceder al historial local', e);
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

      // Evitar duplicados inmediatos idénticos
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
      console.warn('Error al guardar historial:', e);
    }
  }

  function renderizarHistorial() {
    const historial = cargarHistorial();
    if (historial.length === 0) {
      historialLista.innerHTML = '<p class="history-empty">No hay cálculos recientes registrados.</p>';
      return;
    }

    let html = '';
    historial.forEach(item => {
      const confianzaPct = item.Z === 1.645 ? '90%' : item.Z === 1.96 ? '95%' : '99%';
      html += `
        <div class="history-item">
          <div class="history-params">
            N = <strong>${item.N.toLocaleString('es')}</strong> | 
            e = ±${(item.e * 100).toFixed(0)}% | 
            Conf = ${confianzaPct} | 
            p = ${(item.p * 100).toFixed(0)}%
            <span style="opacity: 0.6; margin-left: 6px;">(${item.fecha})</span>
          </div>
          <div class="history-result">
            <span class="history-badge">n = ${item.n.toLocaleString('es')}</span>
            <button type="button" class="btn-history-load" data-id="${item.id}" title="Cargar estos parámetros en el formulario">Cargar</button>
          </div>
        </div>
      `;
    });

    historialLista.innerHTML = html;

    // Asignar listeners a los botones de carga
    historialLista.querySelectorAll('.btn-history-load').forEach(btn => {
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

  // --- Modo Oscuro / Claro ---
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
    const icon = btnTheme.querySelector('.theme-icon');
    const label = btnTheme.querySelector('.theme-text');
    if (tema === 'dark') {
      icon.textContent = '☀️';
      label.textContent = 'Cambiar a modo claro';
    } else {
      icon.textContent = '🌙';
      label.textContent = 'Cambiar a modo oscuro';
    }
  }

  // --- Notificación Toast ---
  let toastTimer = null;
  function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add('toast-show');
    toast.setAttribute('aria-hidden', 'false');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('toast-show');
      toast.setAttribute('aria-hidden', 'true');
    }, 2800);
  }

  // --- Copiar Resumen al Portapapeles ---
  function copiarResumen() {
    if (!ultimoCalculo) return;

    const texto = 
`--- RESUMEN DE CÁLCULO DE TAMAÑO DE MUESTRA ---
Población total (N): ${ultimoCalculo.N.toLocaleString('es')}
Nivel de confianza: ${obtenerTextoConfianza(ultimoCalculo.Z)}
Margen de error (e): ±${(ultimoCalculo.e * 100).toFixed(0)}%
Proporción esperada (p): ${(ultimoCalculo.p * 100).toFixed(0)}%

RESULTADO FINAL:
Tamaño de muestra requerido (n): ${ultimoCalculo.n.toLocaleString('es')} personas/elementos
Valor exacto sin redondear: ${ultimoCalculo.cociente.toFixed(4)}
Fracción muestral (n/N): ${ultimoCalculo.fraccionMuestral.toFixed(2)}%

Fórmula: n = [ N · Z² · p(1-p) ] / [ e²(N-1) + Z² · p(1-p) ]
Criterio: Redondeo formal hacia arriba (Techo: ⌈n⌉)
Calculado mediante Calculadora de Tamaño de Muestra.`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(() => {
        mostrarToast('✓ Resumen copiado al portapapeles');
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
      mostrarToast('✓ Resumen copiado al portapapeles');
    } catch (e) {
      mostrarToast('No se pudo copiar automáticamente');
    }
    document.body.removeChild(textarea);
  }

  // --- Ejecución del Cálculo ---
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

  // --- Event Listeners ---
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    ejecutarCalculo();
  });

  // Limpiar errores mientras el usuario teclea
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

  // Recalcular al cambiar selects de forma inmediata para mayor fluidez
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
      console.warn('Error al limpiar historial:', e);
    }
  });

  // --- Inicialización al Cargar ---
  inicializarTema();
  renderizarHistorial();
  ejecutarCalculo(); // Realiza el cálculo del caso de referencia por defecto al iniciar
})();
