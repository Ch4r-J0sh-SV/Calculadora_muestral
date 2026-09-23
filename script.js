/**
 * Calculadora Estadística — macOS & iOS Edition — V0.4
 * Módulo 1: Tamaño de Muestra para Poblaciones Finitas
 * Módulo 2: Desviación Estándar Poblacional y Muestral con Gráficos Interactivos
 * Cero dependencias externas, gráficos Canvas nativos Retina y rigor inferencial.
 */

(function () {
  'use strict';

  // ==========================================================================
  // Navegación de Módulos (Tabs macOS)
  // ==========================================================================
  const tabBtnMuestra = document.getElementById('tab-btn-muestra');
  const tabBtnDesviacion = document.getElementById('tab-btn-desviacion');
  const viewMuestra = document.getElementById('view-muestra');
  const viewDesviacion = document.getElementById('view-desviacion');
  const toolbarCaption = document.getElementById('toolbar-caption');
  const statusbarModo = document.getElementById('statusbar-modo');
  const statusbarTipo = document.getElementById('statusbar-tipo');

  let moduloActivo = 'muestra'; // 'muestra' | 'desviacion'

  // ==========================================================================
  // Módulo 1: Tamaño de Muestra (Elementos DOM)
  // ==========================================================================
  const formMuestra = document.getElementById('form-muestra');
  const inputN = document.getElementById('poblacion');
  const selectError = document.getElementById('error');
  const selectConfianza = document.getElementById('confianza');
  const inputProporcion = document.getElementById('proporcion');
  const btnReset = document.getElementById('btn-reset');
  const btnCopiar = document.getElementById('btn-copiar');
  const copyBtnText = document.getElementById('copy-btn-text');
  const copyIcon = document.getElementById('copy-icon');

  const segmentedConfianza = document.getElementById('segmented-confianza');
  const segmentBtns = segmentedConfianza ? segmentedConfianza.querySelectorAll('.segment-btn') : [];

  const errorN = document.getElementById('poblacion-error');
  const errorP = document.getElementById('proporcion-error');

  const resultadoNumero = document.getElementById('resultado-numero');
  const resultadoDetalle = document.getElementById('resultado-detalle');
  const metaFraccion = document.getElementById('meta-fraccion');
  const metaExacto = document.getElementById('meta-exacto');
  const stepsContainer = document.getElementById('math-steps-container');
  const tablaBody = document.getElementById('tabla-sensibilidad-body');
  const tablaPoblacionLabel = document.getElementById('tabla-poblacion-label');
  const historialLista = document.getElementById('historial-lista');
  const btnLimpiarHistorial = document.getElementById('btn-limpiar-historial');

  // ==========================================================================
  // Módulo 2: Desviación Estándar (Elementos DOM)
  // ==========================================================================
  const formDesv = document.getElementById('form-desviacion');
  const inputDatosDesv = document.getElementById('desv-input-datos');
  const errorDatosDesv = document.getElementById('desv-datos-error');
  const conteoBadgeDesv = document.getElementById('desv-conteo-badge');
  const btnResetDesv = document.getElementById('btn-reset-desv');
  const btnCopiarDesv = document.getElementById('btn-copiar-desv');
  const copyBtnTextDesv = document.getElementById('copy-btn-text-desv');
  const copyIconDesv = document.getElementById('copy-icon-desv');

  const presetChips = document.querySelectorAll('.preset-chip');

  // Resultados Desviación
  const resSVal = document.getElementById('desv-s-val');
  const resS2Val = document.getElementById('desv-s2-val');
  const resGlVal = document.getElementById('desv-gl-val');
  const resCvSVal = document.getElementById('desv-cv-s-val');

  const resSigmaVal = document.getElementById('desv-sigma-val');
  const resSigma2Val = document.getElementById('desv-sigma2-val');
  const resNVal = document.getElementById('desv-n-val');
  const resCvSigmaVal = document.getElementById('desv-cv-sigma-val');

  const besselPctDiff = document.getElementById('bessel-pct-diff');
  const besselFactorVal = document.getElementById('bessel-factor-val');

  const resMediaVal = document.getElementById('desv-media-val');
  const resSsVal = document.getElementById('desv-ss-val');
  const resSeVal = document.getElementById('desv-se-val');
  const resRangoVal = document.getElementById('desv-rango-val');

  // Gráficos Canvas
  const segmentedGrafico = document.getElementById('segmented-grafico');
  const chartSegmentBtns = segmentedGrafico ? segmentedGrafico.querySelectorAll('.segment-btn') : [];
  const chartCaption = document.getElementById('chart-caption');
  const chartPillBtns = document.querySelectorAll('.chart-pill-btn');
  const chkShowPoints = document.getElementById('chk-show-points');
  const canvasDesv = document.getElementById('canvas-desviacion');

  const legMean = document.getElementById('leg-mean');
  const legS = document.getElementById('leg-s');
  const legSigma = document.getElementById('leg-sigma');
  const legMeanSymbol = document.getElementById('leg-mean-symbol');

  // Pasos y Tabla Desviación
  const desvStepsContainer = document.getElementById('desv-steps-container');
  const tablaDesvBody = document.getElementById('tabla-desviaciones-body');
  const tablaDesvFoot = document.getElementById('tabla-desviaciones-foot');
  const desvTableSubtitle = document.getElementById('desv-table-subtitle');

  // Elementos Globales (Tema & Notificaciones)
  const btnTheme = document.getElementById('theme-toggle');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  let ultimoCalculoMuestra = null;
  let ultimoCalculoDesv = null;
  let toastTimer = null;
  let resizeTimer = null;

  // Estado del gráfico
  let tipoGrafico = 'gauss'; // 'gauss' | 'dispersion'
  let curvaResaltada = 'both'; // 'both' | 'sample' | 'pop'
  let mostrarPuntosObs = true;

  const STORAGE_THEME_KEY = 'calc_muestra_theme';
  const STORAGE_HISTORY_KEY = 'calc_muestra_historial';

  // Conjuntos de datos predefinidos
  const PRESETS = {
    calificaciones: [12, 14, 15, 15, 16, 17, 18, 18, 19, 20],
    tiempos: [120, 135, 140, 142, 145, 148, 150, 155, 160, 162, 170, 185],
    produccion: [248.5, 249.0, 249.5, 250.0, 250.2, 250.5, 250.8, 251.0, 251.5, 252.0, 252.4, 253.0, 253.5, 254.0, 255.0]
  };

  // ==========================================================================
  // Lógica de Pestañas macOS
  // ==========================================================================
  function cambiarModulo(modulo) {
    moduloActivo = modulo;

    if (modulo === 'muestra') {
      tabBtnMuestra.classList.add('active');
      tabBtnMuestra.setAttribute('aria-selected', 'true');
      tabBtnDesviacion.classList.remove('active');
      tabBtnDesviacion.setAttribute('aria-selected', 'false');

      viewMuestra.hidden = false;
      viewDesviacion.hidden = true;

      toolbarCaption.textContent = 'Estimación estadística de tamaño muestral para poblaciones finitas con desglose metodológico.';
      if (statusbarModo) statusbarModo.textContent = 'Modo: Población Finita';
      if (statusbarTipo) statusbarTipo.textContent = 'Fórmula de Proporciones';
    } else {
      tabBtnDesviacion.classList.add('active');
      tabBtnDesviacion.setAttribute('aria-selected', 'true');
      tabBtnMuestra.classList.remove('active');
      tabBtnMuestra.setAttribute('aria-selected', 'false');

      viewDesviacion.hidden = false;
      viewMuestra.hidden = true;

      toolbarCaption.textContent = 'Cálculo y comparación de dispersión poblacional (σ) y muestral (s) con visualización gráfica interactiva.';
      if (statusbarModo) statusbarModo.textContent = 'Modo: Dispersión y Desviación';
      if (statusbarTipo) statusbarTipo.textContent = 'Muestral & Poblacional';

      // Redibujar gráfico tras hacerse visible
      requestAnimationFrame(() => {
        dibujarGraficoEstadistico();
      });
    }
  }

  // ==========================================================================
  // MÓDULO 1: LÓGICA DE TAMAÑO DE MUESTRA
  // ==========================================================================
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

  function validarFormularioMuestra() {
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

  function actualizarUIMuestra(resultado) {
    ultimoCalculoMuestra = resultado;

    resultadoNumero.textContent = resultado.n.toLocaleString('es');
    resultadoDetalle.innerHTML = 
      `Para una población de <strong>${resultado.N.toLocaleString('es')}</strong>, con un margen de error ` +
      `de <strong>±${(resultado.e * 100).toFixed(0)}%</strong>, un nivel de confianza del ` +
      `<strong>${obtenerTextoConfianza(resultado.Z).split(' ')[0]}</strong> y una proporción esperada del <strong>${(resultado.p * 100).toFixed(0)}%</strong>.`;

    metaFraccion.textContent = `${resultado.fraccionMuestral.toFixed(2)}%`;
    metaExacto.textContent = resultado.cociente.toFixed(4);

    sincronizarSegmentedControl(resultado.Z);
    renderizarDesgloseMuestra(resultado);
    renderizarTablaSensibilidad(resultado.N, resultado.p, resultado.e, resultado.Z);
    guardarEnHistorial(resultado);
  }

  function renderizarDesgloseMuestra(res) {
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

  function ejecutarCalculoMuestra() {
    if (!validarFormularioMuestra()) {
      return;
    }

    const N = parseInt(inputN.value, 10);
    const e = parseFloat(selectError.value);
    const Z = parseFloat(selectConfianza.value);
    const p = parseFloat(inputProporcion.value) / 100;

    const resultado = calcularMuestra(N, Z, p, e);
    actualizarUIMuestra(resultado);
  }

  // ==========================================================================
  // MÓDULO 2: LÓGICA DE DESVIACIÓN ESTÁNDAR
  // ==========================================================================

  // Parser robusto para series numéricas
  function parsearSerieDatos(cadena) {
    if (!cadena || !cadena.trim()) {
      return { datos: [], error: 'Por favor, ingresa al menos dos valores numéricos.' };
    }

    // Reemplazar saltos de línea y punto y coma por espacios o comas
    const textoLimpio = cadena.replace(/[;\n\r\t]+/g, ' ');

    // Separación por coma o espacios múltiples
    const partes = textoLimpio.split(/[,\s]+/).map(p => p.trim()).filter(p => p.length > 0);

    const datos = [];
    const invalidos = [];

    partes.forEach(p => {
      // Soporte para coma decimal si no se usó coma como separador
      const normalizado = p.replace(',', '.');
      const num = Number(normalizado);
      if (!isNaN(num) && isFinite(num)) {
        datos.push(num);
      } else {
        invalidos.push(p);
      }
    });

    if (datos.length < 2) {
      return {
        datos,
        error: `Se detectaron ${datos.length} valor(es). Se requieren al menos 2 datos para calcular la desviación muestral.`
      };
    }

    return { datos, invalidos, error: null };
  }

  function calcularEstadisticasDesviacion(datos) {
    const N = datos.length;
    const suma = datos.reduce((acc, val) => acc + val, 0);
    const media = suma / N;

    const desviaciones = datos.map((x, idx) => {
      const diff = x - media;
      const diff2 = diff ** 2;
      return {
        i: idx + 1,
        x,
        diff,
        diff2
      };
    });

    const ss = desviaciones.reduce((acc, item) => acc + item.diff2, 0);

    // Desviación Poblacional (divisor N)
    const varPoblacional = ss / N;
    const desvPoblacional = Math.sqrt(varPoblacional);
    const cvPoblacional = media !== 0 ? (desvPoblacional / Math.abs(media)) * 100 : 0;

    // Desviación Muestral (divisor N - 1, Corrección de Bessel)
    const gl = N - 1;
    const varMuestral = ss / gl;
    const desvMuestral = Math.sqrt(varMuestral);
    const cvMuestral = media !== 0 ? (desvMuestral / Math.abs(media)) * 100 : 0;
    const se = desvMuestral / Math.sqrt(N);

    const factorBessel = Math.sqrt(N / gl);
    const pctBessel = desvPoblacional > 0 ? ((desvMuestral - desvPoblacional) / desvPoblacional) * 100 : 0;

    const min = Math.min(...datos);
    const max = Math.max(...datos);
    const rango = max - min;

    return {
      N,
      datos,
      suma,
      media,
      desviaciones,
      ss,
      varPoblacional,
      desvPoblacional,
      cvPoblacional,
      gl,
      varMuestral,
      desvMuestral,
      cvMuestral,
      se,
      factorBessel,
      pctBessel,
      min,
      max,
      rango
    };
  }

  function actualizarUIDesviacion(res) {
    ultimoCalculoDesv = res;

    // Conteo badge
    conteoBadgeDesv.textContent = `${res.N} valores detectados`;

    // Tarjeta Muestral
    resSVal.textContent = res.desvMuestral.toFixed(4);
    resS2Val.textContent = res.varMuestral.toFixed(4);
    resGlVal.textContent = res.gl.toString();
    resCvSVal.textContent = `${res.cvMuestral.toFixed(2)}%`;

    // Tarjeta Poblacional
    resSigmaVal.textContent = res.desvPoblacional.toFixed(4);
    resSigma2Val.textContent = res.varPoblacional.toFixed(4);
    resNVal.textContent = res.N.toString();
    resCvSigmaVal.textContent = `${res.cvPoblacional.toFixed(2)}%`;

    // Bessel Insight
    const signoPct = res.pctBessel >= 0 ? '+' : '';
    besselPctDiff.textContent = `${signoPct}${res.pctBessel.toFixed(2)}%`;
    besselFactorVal.textContent = `√(${res.N}/${res.gl}) ≈ ${res.factorBessel.toFixed(4)}`;

    // Métricas Resumen
    resMediaVal.textContent = res.media.toFixed(4);
    resSsVal.textContent = res.ss.toFixed(4);
    resSeVal.textContent = res.se.toFixed(4);
    resRangoVal.textContent = `${res.rango.toFixed(2)} (${res.min.toFixed(1)} a ${res.max.toFixed(1)})`;

    // Leyendas del gráfico
    legMean.textContent = res.media.toFixed(2);
    legS.textContent = res.desvMuestral.toFixed(2);
    legSigma.textContent = res.desvPoblacional.toFixed(2);

    renderizarDesgloseDesviacion(res);
    renderizarTablaDesviaciones(res);
    dibujarGraficoEstadistico();
  }

  function renderizarDesgloseDesviacion(res) {
    desvStepsContainer.innerHTML = `
      <div class="apple-step-card">
        <div class="step-card-header">Paso 1: Cálculo de la Media Aritmética</div>
        <div class="step-card-math">
          x̄ = μ = ( Σ xᵢ ) / N<br>
          x̄ = ${res.suma.toLocaleString('es', { maximumFractionDigits: 4 })} / ${res.N} = <strong>${res.media.toFixed(4)}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Paso 2: Suma de Cuadrados de las Diferencias (SS)</div>
        <div class="step-card-math">
          SS = Σ (xᵢ - x̄)²<br>
          Suma de los ${res.N} términos al cuadrado = <strong>${res.ss.toFixed(4)}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Paso 3: Varianzas (Poblacional vs. Muestral)</div>
        <div class="step-card-math">
          σ² (Población) = ${res.ss.toFixed(4)} / ${res.N} = <strong>${res.varPoblacional.toFixed(4)}</strong><br>
          s² (Muestra) = ${res.ss.toFixed(4)} / (${res.N} - 1) = ${res.ss.toFixed(4)} / ${res.gl} = <strong>${res.varMuestral.toFixed(4)}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Paso 4: Desviaciones Estándar Finales</div>
        <div class="step-card-math">
          σ = √(${res.varPoblacional.toFixed(4)}) = <strong>${res.desvPoblacional.toFixed(4)}</strong><br>
          s = √(${res.varMuestral.toFixed(4)}) = <strong>${res.desvMuestral.toFixed(4)}</strong> (Corrección: ${besselPctDiff.textContent})
        </div>
      </div>
    `;
  }

  function renderizarTablaDesviaciones(res) {
    desvTableSubtitle.textContent = `${res.N} observaciones registradas`;

    let htmlBody = '';
    const limiteVista = 50;
    const itemsAMostrar = res.desviaciones.slice(0, limiteVista);

    itemsAMostrar.forEach(item => {
      const diffSigno = item.diff >= 0 ? `+${item.diff.toFixed(4)}` : item.diff.toFixed(4);
      htmlBody += `
        <tr>
          <td>${item.i}</td>
          <td>${item.x.toLocaleString('es', { maximumFractionDigits: 4 })}</td>
          <td>${diffSigno}</td>
          <td>${item.diff2.toFixed(4)}</td>
        </tr>
      `;
    });

    if (res.N > limiteVista) {
      htmlBody += `
        <tr>
          <td colspan="4" style="text-align:center; color: var(--label-tertiary); font-style: italic;">
            ... y ${res.N - limiteVista} valores más omitidos por brevedad visual.
          </td>
        </tr>
      `;
    }

    tablaDesvBody.innerHTML = htmlBody;

    // Fila de totales en tfoot
    tablaDesvFoot.innerHTML = `
      <tr>
        <td>Σ</td>
        <td>${res.suma.toLocaleString('es', { maximumFractionDigits: 4 })}</td>
        <td>~0.0000</td>
        <td>${res.ss.toFixed(4)}</td>
      </tr>
    `;
  }

  function ejecutarCalculoDesviacion() {
    const parsed = parsearSerieDatos(inputDatosDesv.value);

    if (parsed.error) {
      errorDatosDesv.textContent = parsed.error;
      inputDatosDesv.classList.add('input-invalid');
      return;
    }

    errorDatosDesv.textContent = '';
    inputDatosDesv.classList.remove('input-invalid');

    const res = calcularEstadisticasDesviacion(parsed.datos);
    actualizarUIDesviacion(res);
  }

  // ==========================================================================
  // RENDERIZADOR GRÁFICO EN HTML5 CANVAS (Nativo HiDPI)
  // ==========================================================================
  function dibujarGraficoEstadistico() {
    if (!canvasDesv || !ultimoCalculoDesv) return;

    const ctx = canvasDesv.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvasDesv.getBoundingClientRect();
    const width = rect.width || 760;
    const height = 320;

    // Ajuste de resolución Retina
    canvasDesv.width = Math.floor(width * dpr);
    canvasDesv.height = Math.floor(height * dpr);
    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Paleta de diseño Apple adaptable al tema
    const colors = {
      axis: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.16)',
      grid: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
      text: isDark ? 'rgba(235, 235, 245, 0.70)' : 'rgba(60, 60, 67, 0.75)',
      textMuted: isDark ? 'rgba(235, 235, 245, 0.40)' : 'rgba(60, 60, 67, 0.45)',
      mean: isDark ? '#ff453a' : '#ff3b30',
      sample: isDark ? '#0a84ff' : '#007aff',
      sampleFill: isDark ? 'rgba(10, 132, 255, 0.16)' : 'rgba(0, 122, 255, 0.12)',
      pop: isDark ? '#bf5af2' : '#5856d6',
      popFill: isDark ? 'rgba(191, 90, 242, 0.16)' : 'rgba(88, 86, 214, 0.12)',
      band68: isDark ? 'rgba(10, 132, 255, 0.12)' : 'rgba(0, 122, 255, 0.08)',
      point: isDark ? '#30d158' : '#34c759',
      pointBorder: isDark ? '#ffffff' : '#ffffff'
    };

    ctx.clearRect(0, 0, width, height);

    if (tipoGrafico === 'gauss') {
      renderizarCampanaGauss(ctx, width, height, colors);
    } else {
      renderizarGraficoDispersion(ctx, width, height, colors);
    }
  }

  // Gráfico 1: Campana de Gauss / Densidad Normal
  function renderizarCampanaGauss(ctx, width, height, colors) {
    const res = ultimoCalculoDesv;
    const mu = res.media;
    const sigmaPop = res.desvPoblacional > 0 ? res.desvPoblacional : 0.001;
    const sigmaSample = res.desvMuestral > 0 ? res.desvMuestral : sigmaPop;

    const padLeft = 45;
    const padRight = 35;
    const padTop = 32;
    const padBottom = 48;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    // Rango horizontal ±3.8 desviaciones
    const sdBase = Math.max(sigmaSample, sigmaPop);
    const minX = mu - 3.8 * sdBase;
    const maxX = mu + 3.8 * sdBase;

    // Función de densidad normal f(x, s)
    const normPdf = (x, s) => {
      const coeff = 1 / (s * Math.sqrt(2 * Math.PI));
      const expTerm = Math.exp(-0.5 * (((x - mu) / s) ** 2));
      return coeff * expTerm;
    };

    const maxDensPop = normPdf(mu, Math.min(sigmaPop, sigmaSample));
    const maxY = maxDensPop * 1.15;

    const toX = val => padLeft + ((val - minX) / (maxX - minX)) * plotW;
    const toY = dens => (height - padBottom) - (dens / maxY) * plotH;

    // Eje horizontal y cuadrículas
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, height - padBottom);
    ctx.lineTo(width - padRight, height - padBottom);
    ctx.stroke();

    // Sombreado de zonas de desviación ±1σ, ±2σ, ±3σ
    const refSigma = curvaResaltada === 'sample' ? sigmaSample : sigmaPop;
    const zBands = [
      { z: 1, alpha: colors.band68 },
      { z: 2, alpha: isDarkTheme() ? 'rgba(10, 132, 255, 0.06)' : 'rgba(0, 122, 255, 0.04)' }
    ];

    zBands.forEach(band => {
      const bLeft = Math.max(minX, mu - band.z * refSigma);
      const bRight = Math.min(maxX, mu + band.z * refSigma);
      const xStart = toX(bLeft);
      const xEnd = toX(bRight);

      ctx.fillStyle = band.alpha;
      ctx.beginPath();
      ctx.moveTo(xStart, height - padBottom);

      const pasos = 80;
      for (let i = 0; i <= pasos; i++) {
        const cx = bLeft + (i / pasos) * (bRight - bLeft);
        const cy = normPdf(cx, refSigma);
        ctx.lineTo(toX(cx), toY(cy));
      }

      ctx.lineTo(xEnd, height - padBottom);
      ctx.closePath();
      ctx.fill();
    });

    // Curva Poblacional
    if (curvaResaltada === 'both' || curvaResaltada === 'pop') {
      ctx.strokeStyle = colors.pop;
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      const pasos = 160;
      for (let i = 0; i <= pasos; i++) {
        const cx = minX + (i / pasos) * (maxX - minX);
        const cy = normPdf(cx, sigmaPop);
        const px = toX(cx);
        const py = toY(cy);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }

    // Curva Muestral
    if (curvaResaltada === 'both' || curvaResaltada === 'sample') {
      ctx.strokeStyle = colors.sample;
      ctx.lineWidth = 2.4;
      ctx.setLineDash(curvaResaltada === 'both' ? [5, 4] : []);
      ctx.beginPath();
      const pasos = 160;
      for (let i = 0; i <= pasos; i++) {
        const cx = minX + (i / pasos) * (maxX - minX);
        const cy = normPdf(cx, sigmaSample);
        const px = toX(cx);
        const py = toY(cy);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Línea de la Media Aritmética
    const xMedia = toX(mu);
    ctx.strokeStyle = colors.mean;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xMedia, padTop);
    ctx.lineTo(xMedia, height - padBottom);
    ctx.stroke();

    // Etiqueta de la Media
    ctx.fillStyle = colors.mean;
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`μ = ${mu.toFixed(2)}`, xMedia, padTop - 10);

    // Marcas de desviación en el eje X (±1, ±2, ±3)
    const marcasZ = [-3, -2, -1, 1, 2, 3];
    ctx.fillStyle = colors.textMuted;
    ctx.font = '500 10px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
    ctx.textAlign = 'center';

    marcasZ.forEach(z => {
      const val = mu + z * refSigma;
      if (val >= minX && val <= maxX) {
        const xPos = toX(val);
        // Tick
        ctx.strokeStyle = colors.axis;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xPos, height - padBottom);
        ctx.lineTo(xPos, height - padBottom + 5);
        ctx.stroke();

        const signo = z > 0 ? `+${z}σ` : `${z}σ`;
        ctx.fillText(signo, xPos, height - padBottom + 18);
        ctx.fillText(val.toFixed(1), xPos, height - padBottom + 30);
      }
    });

    // Puntos observados en la base (Strip Plot)
    if (mostrarPuntosObs && res.datos) {
      const yBase = height - padBottom - 6;
      res.datos.forEach(d => {
        const xPos = toX(d);
        if (xPos >= padLeft && xPos <= width - padRight) {
          ctx.fillStyle = colors.point;
          ctx.beginPath();
          ctx.arc(xPos, yBase, 3.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = colors.pointBorder;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    }
  }

  // Gráfico 2: Dispersión con Bandas de Desviación
  function renderizarGraficoDispersion(ctx, width, height, colors) {
    const res = ultimoCalculoDesv;
    const N = res.N;
    const mu = res.media;
    const sigmaPop = res.desvPoblacional;
    const sSample = res.desvMuestral;

    const padLeft = 50;
    const padRight = 35;
    const padTop = 30;
    const padBottom = 45;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    // Rango vertical
    const maxVal = Math.max(res.max, mu + 2.2 * Math.max(sSample, sigmaPop));
    const minVal = Math.min(res.min, mu - 2.2 * Math.max(sSample, sigmaPop));
    const spanY = (maxVal - minVal) || 1;

    const toY = val => (height - padBottom) - ((val - minVal) / spanY) * plotH;
    const toX = idx => padLeft + (idx / (N + 1)) * plotW;

    // Banda ±1s (Muestral)
    const ySPlus = toY(mu + sSample);
    const ySMinus = toY(mu - sSample);
    ctx.fillStyle = colors.sampleFill;
    ctx.fillRect(padLeft, ySPlus, plotW, ySMinus - ySPlus);

    // Banda ±1σ (Poblacional) con línea discontinua
    const ySigmaPlus = toY(mu + sigmaPop);
    const ySigmaMinus = toY(mu - sigmaPop);
    ctx.strokeStyle = colors.pop;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, ySigmaPlus);
    ctx.lineTo(width - padRight, ySigmaPlus);
    ctx.moveTo(padLeft, ySigmaMinus);
    ctx.lineTo(width - padRight, ySigmaMinus);
    ctx.stroke();
    ctx.setLineDash([]);

    // Línea de la Media
    const yMedia = toY(mu);
    ctx.strokeStyle = colors.mean;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(padLeft, yMedia);
    ctx.lineTo(width - padRight, yMedia);
    ctx.stroke();

    // Etiqueta de la Media
    ctx.fillStyle = colors.mean;
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`x̄ = ${mu.toFixed(2)}`, width - padRight, yMedia - 6);

    // Ejes
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop);
    ctx.lineTo(padLeft, height - padBottom);
    ctx.lineTo(width - padRight, height - padBottom);
    ctx.stroke();

    // Puntos de datos y líneas conectoras a la media
    res.datos.forEach((val, idx) => {
      const px = toX(idx + 1);
      const py = toY(val);

      // Conector a la media
      ctx.strokeStyle = colors.grid;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(px, yMedia);
      ctx.lineTo(px, py);
      ctx.stroke();

      // Punto
      ctx.fillStyle = colors.sample;
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = colors.pointBorder;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Número de índice en el eje X
      ctx.fillStyle = colors.textMuted;
      ctx.font = '500 10px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${idx + 1}`, px, height - padBottom + 16);
    });

    // Etiquetas en eje Y
    ctx.fillStyle = colors.textMuted;
    ctx.font = '500 10px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
    ctx.textAlign = 'right';

    ctx.fillText(`+1s (${(mu + sSample).toFixed(1)})`, padLeft - 6, ySPlus + 3);
    ctx.fillText(`-1s (${(mu - sSample).toFixed(1)})`, padLeft - 6, ySMinus + 3);
  }

  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // ==========================================================================
  // Gestión de Almacenamiento Local (Historial Tamaño de Muestra)
  // ==========================================================================
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
          ejecutarCalculoMuestra();
          mostrarToast('Parámetros restaurados desde el historial');
        }
      });
    });
  }

  // ==========================================================================
  // Modo Oscuro / Claro estilo Apple
  // ==========================================================================
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

    if (ultimoCalculoDesv) {
      dibujarGraficoEstadistico();
    }
  }

  // ==========================================================================
  // Notificaciones HUD estilo Apple Dynamic Island
  // ==========================================================================
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

  // ==========================================================================
  // Copiado al Portapapeles
  // ==========================================================================
  function copiarTextoPortapapeles(texto, onExito) {
    const restaurar = () => {
      mostrarToast('Copiado al portapapeles');
      if (onExito) onExito();
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(restaurar).catch(() => {
        copiarAlternativo(texto, restaurar);
      });
    } else {
      copiarAlternativo(texto, restaurar);
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
      if (callback) callback();
    } catch (e) {
      mostrarToast('No se pudo copiar el texto');
    }
    document.body.removeChild(textarea);
  }

  function copiarResumenMuestra() {
    if (!ultimoCalculoMuestra) return;

    const texto = 
`Resumen de Cálculo de Tamaño de Muestra (V0.4 — macOS Edition)
--------------------------------------------------------------
Población (N): ${ultimoCalculoMuestra.N.toLocaleString('es')}
Nivel de confianza: ${obtenerTextoConfianza(ultimoCalculoMuestra.Z)}
Margen de error (e): ±${(ultimoCalculoMuestra.e * 100).toFixed(0)}%
Proporción esperada (p): ${(ultimoCalculoMuestra.p * 100).toFixed(0)}%

Resultado:
Tamaño de muestra (n): ${ultimoCalculoMuestra.n.toLocaleString('es')} elementos
Valor sin redondear: ${ultimoCalculoMuestra.cociente.toFixed(4)}
Fracción de muestreo: ${ultimoCalculoMuestra.fraccionMuestral.toFixed(2)}%

Fórmula: n = [ N · Z² · p(1-p) ] / [ e²(N-1) + Z² · p(1-p) ]
Criterio: Redondeo hacia arriba al entero superior inmediato (techo).`;

    copiarTextoPortapapeles(texto, () => {
      copyBtnText.textContent = 'Copiado';
      copyIcon.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
      setTimeout(() => {
        copyBtnText.textContent = 'Copiar';
        copyIcon.innerHTML = `
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        `;
      }, 2000);
    });
  }

  function copiarResumenDesviacion() {
    if (!ultimoCalculoDesv) return;

    const res = ultimoCalculoDesv;
    const texto = 
`Reporte Estadístico de Dispersión (V0.4 — macOS Edition)
-------------------------------------------------------
Total de datos (N): ${res.N}
Media aritmética (x̄ = μ): ${res.media.toFixed(4)}
Suma total (Σ x): ${res.suma.toFixed(4)}
Suma de cuadrados (SS): ${res.ss.toFixed(4)}

Desviación Estándar Muestral (Insesgada):
  s = ${res.desvMuestral.toFixed(4)}
  Varianza muestral (s²): ${res.varMuestral.toFixed(4)}
  Grados de libertad (gl = n - 1): ${res.gl}
  Coeficiente de variación (CV): ${res.cvMuestral.toFixed(2)}%
  Error estándar (SE): ${res.se.toFixed(4)}

Desviación Estándar Poblacional:
  σ = ${res.desvPoblacional.toFixed(4)}
  Varianza poblacional (σ²): ${res.varPoblacional.toFixed(4)}
  Coeficiente de variación (CV): ${res.cvPoblacional.toFixed(2)}%

Corrección de Bessel:
  Factor: √(${res.N}/${res.gl}) ≈ ${res.factorBessel.toFixed(4)} (${besselPctDiff.textContent} respecto a σ)
  Rango estadístico: ${res.rango.toFixed(2)} (Mín: ${res.min.toFixed(2)}, Máx: ${res.max.toFixed(2)})`;

    copiarTextoPortapapeles(texto, () => {
      copyBtnTextDesv.textContent = 'Copiado';
      copyIconDesv.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
      setTimeout(() => {
        copyBtnTextDesv.textContent = 'Copiar';
        copyIconDesv.innerHTML = `
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        `;
      }, 2000);
    });
  }

  // ==========================================================================
  // Escuchadores de Eventos
  // ==========================================================================

  // Pestañas
  tabBtnMuestra.addEventListener('click', () => cambiarModulo('muestra'));
  tabBtnDesviacion.addEventListener('click', () => cambiarModulo('desviacion'));

  // Eventos Módulo 1 (Muestra)
  formMuestra.addEventListener('submit', function (ev) {
    ev.preventDefault();
    ejecutarCalculoMuestra();
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
    if (validarFormularioMuestra()) ejecutarCalculoMuestra();
  });

  selectConfianza.addEventListener('change', () => {
    sincronizarSegmentedControl(parseFloat(selectConfianza.value));
    if (validarFormularioMuestra()) ejecutarCalculoMuestra();
  });

  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-value');
      selectConfianza.value = val;
      sincronizarSegmentedControl(parseFloat(val));
      if (validarFormularioMuestra()) ejecutarCalculoMuestra();
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
    ejecutarCalculoMuestra();
    mostrarToast('Parámetros de muestra restablecidos');
  });

  btnCopiar.addEventListener('click', copiarResumenMuestra);

  btnLimpiarHistorial.addEventListener('click', function () {
    try {
      localStorage.removeItem(STORAGE_HISTORY_KEY);
      renderizarHistorial();
      mostrarToast('Historial vaciado');
    } catch (e) {
      // Ignorar
    }
  });

  // Eventos Módulo 2 (Desviación Estándar)
  formDesv.addEventListener('submit', function (ev) {
    ev.preventDefault();
    ejecutarCalculoDesviacion();
  });

  inputDatosDesv.addEventListener('input', () => {
    const parsed = parsearSerieDatos(inputDatosDesv.value);
    if (!parsed.error) {
      conteoBadgeDesv.textContent = `${parsed.datos.length} valores detectados`;
      errorDatosDesv.textContent = '';
      inputDatosDesv.classList.remove('input-invalid');
    }
  });

  btnResetDesv.addEventListener('click', () => {
    inputDatosDesv.value = '';
    conteoBadgeDesv.textContent = '0 valores detectados';
    errorDatosDesv.textContent = '';
    inputDatosDesv.classList.remove('input-invalid');
    presetChips.forEach(c => c.classList.remove('active'));
    inputDatosDesv.focus();
    mostrarToast('Serie de datos limpiada');
  });

  btnCopiarDesv.addEventListener('click', copiarResumenDesviacion);

  // Chips de Presets
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const presetKey = chip.getAttribute('data-preset');
      if (PRESETS[presetKey]) {
        presetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        inputDatosDesv.value = PRESETS[presetKey].join(', ');
        ejecutarCalculoDesviacion();
        mostrarToast(`Ejemplo cargado: ${chip.textContent.trim()}`);
      }
    });
  });

  // Segmented Control de Tipo de Gráfico
  chartSegmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chartSegmentBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      tipoGrafico = btn.getAttribute('data-chart');
      if (tipoGrafico === 'gauss') {
        chartCaption.textContent = 'Distribución normal teórica N(μ, σ) centrada en la media con las zonas empíricas de desviación (±1σ, ±2σ y ±3σ) y proyección de datos observados.';
      } else {
        chartCaption.textContent = 'Diagrama de dispersión de cada valor individual respecto a la media con bandas de desviación estándar muestral y poblacional.';
      }

      dibujarGraficoEstadistico();
    });
  });

  // Botones de filtro de Curva
  chartPillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chartPillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      curvaResaltada = btn.getAttribute('data-curve');
      dibujarGraficoEstadistico();
    });
  });

  // Checkbox de puntos observados
  if (chkShowPoints) {
    chkShowPoints.addEventListener('change', () => {
      mostrarPuntosObs = chkShowPoints.checked;
      dibujarGraficoEstadistico();
    });
  }

  // Redimensionamiento de ventana (Debounce)
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (moduloActivo === 'desviacion') {
        dibujarGraficoEstadistico();
      }
    }, 120);
  });

  // ==========================================================================
  // Inicialización
  // ==========================================================================
  inicializarTema();
  renderizarHistorial();
  ejecutarCalculoMuestra();
  ejecutarCalculoDesviacion();
})();
