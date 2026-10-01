/**
 * Calculadora Estadística — macOS & iOS Edition — V0.5
 * Módulo 1: Tamaño de Muestra para Poblaciones Finitas
 * Módulo 2: Desviación Estándar Poblacional y Muestral con Gráficos Interactivos
 * Módulo 3: Herramienta de Interpolación Lineal para Tablas Estadísticas
 * Cero dependencias externas, gráficos Canvas nativos Retina y rigor inferencial.
 */

(function () {
  'use strict';

  // ==========================================================================
  // Navegación de Módulos (Tabs macOS)
  // ==========================================================================
  const tabBtnMuestra = document.getElementById('tab-btn-muestra');
  const tabBtnDesviacion = document.getElementById('tab-btn-desviacion');
  const tabBtnInterpolacion = document.getElementById('tab-btn-interpolacion');
  const viewMuestra = document.getElementById('view-muestra');
  const viewDesviacion = document.getElementById('view-desviacion');
  const viewInterpolacion = document.getElementById('view-interpolacion');
  const toolbarCaption = document.getElementById('toolbar-caption');
  const statusbarModo = document.getElementById('statusbar-modo');
  const statusbarTipo = document.getElementById('statusbar-tipo');

  let moduloActivo = 'muestra'; // 'muestra' | 'desviacion' | 'interpolacion'

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

  // Gráficos Canvas Desviación
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

  // ==========================================================================
  // Módulo 3: Interpolación Lineal (Elementos DOM)
  // ==========================================================================
  const formInterp = document.getElementById('form-interpolacion');
  const inputX1 = document.getElementById('interp-x1');
  const inputY1 = document.getElementById('interp-y1');
  const inputX2 = document.getElementById('interp-x2');
  const inputY2 = document.getElementById('interp-y2');
  const inputYTarget = document.getElementById('interp-y-target');

  const errorX1 = document.getElementById('interp-x1-error');
  const errorY1 = document.getElementById('interp-y1-error');
  const errorX2 = document.getElementById('interp-x2-error');
  const errorY2 = document.getElementById('interp-y2-error');
  const errorYTarget = document.getElementById('interp-y-target-error');

  const interpAlertaGlobal = document.getElementById('interp-alerta-global');
  const interpAlertaTexto = document.getElementById('interp-alerta-texto');

  const btnResetInterp = document.getElementById('btn-reset-interp');
  const btnInvertirInterp = document.getElementById('btn-invertir-interp');
  const btnCopiarInterp = document.getElementById('btn-copiar-interp');
  const copyBtnTextInterp = document.getElementById('copy-btn-text-interp');
  const copyIconInterp = document.getElementById('copy-icon-interp');
  const btnCopiarProcInterp = document.getElementById('btn-copiar-procedimiento-interp');
  const btnLimpiarHistorialInterp = document.getElementById('btn-limpiar-historial-interp');

  const interpPresetChips = document.querySelectorAll('[data-interp-preset]');
  const segmentedRounding = document.getElementById('segmented-interp-rounding');
  const roundingBtns = segmentedRounding ? segmentedRounding.querySelectorAll('.segment-btn') : [];

  const resInterpX = document.getElementById('interp-resultado-x');
  const resInterpDetalle = document.getElementById('interp-resultado-detalle');
  const metaDiffX = document.getElementById('interp-meta-diff-x');
  const metaDiffY = document.getElementById('interp-meta-diff-y');
  const metaDiffYTarget = document.getElementById('interp-meta-diff-ytarget');
  const metaAvance = document.getElementById('interp-meta-avance');
  const metaPendiente = document.getElementById('interp-meta-pendiente');
  const metaExactoInterp = document.getElementById('interp-meta-exacto');

  const interpProcedimientoTexto = document.getElementById('interp-procedimiento-texto');
  const interpStepsContainer = document.getElementById('interp-steps-container');
  const canvasInterp = document.getElementById('canvas-interpolacion');

  const legP1 = document.getElementById('leg-p1');
  const legTarget = document.getElementById('leg-target');
  const legP2 = document.getElementById('leg-p2');
  const interpHistorialLista = document.getElementById('interp-historial-lista');

  let ultimoCalculoInterp = null;
  let decimalesInterp = 4; // 4 | 3 | 2 | 'exact'

  const STORAGE_INTERP_HISTORY_KEY = 'calc_interp_historial';

  // Casos de prueba / Presets para Interpolación
  const INTERP_PRESETS = {
    't-student': { x1: 1.7613, y1: 0.05, x2: 2.1448, y2: 0.025, yTarget: 0.035, label: 't-Student (gl=14)' },
    'normal-z': { x1: 1.97, y1: 0.9756, x2: 1.98, y2: 0.9761, yTarget: 0.9760, label: 'Normal Z (área=0.9760)' },
    'chi-cuadrado': { x1: 18.307, y1: 0.05, x2: 20.483, y2: 0.025, yTarget: 0.03, label: 'Chi-Cuadrado (gl=10)' },
    'lineal-simple': { x1: 10, y1: 20, x2: 20, y2: 40, yTarget: 25, label: 'Ejemplo Base (10 a 20)' }
  };

  // Elementos Globales (Tema & Notificaciones)
  const btnTheme = document.getElementById('theme-toggle');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  let ultimoCalculoMuestra = null;
  let ultimoCalculoDesv = null;
  let toastTimer = null;
  let resizeTimer = null;

  // Estado del gráfico de Desviación
  let tipoGrafico = 'gauss'; // 'gauss' | 'dispersion'
  let curvaResaltada = 'both'; // 'both' | 'sample' | 'pop'
  let mostrarPuntosObs = true;

  const STORAGE_THEME_KEY = 'calc_muestra_theme';
  const STORAGE_HISTORY_KEY = 'calc_muestra_historial';

  // Conjuntos de datos predefinidos (Desviación)
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

    const tabs = [
      { id: 'muestra', btn: tabBtnMuestra, view: viewMuestra },
      { id: 'desviacion', btn: tabBtnDesviacion, view: viewDesviacion },
      { id: 'interpolacion', btn: tabBtnInterpolacion, view: viewInterpolacion }
    ];

    tabs.forEach(t => {
      const activo = t.id === modulo;
      if (t.btn) {
        t.btn.classList.toggle('active', activo);
        t.btn.setAttribute('aria-selected', activo ? 'true' : 'false');
      }
      if (t.view) {
        t.view.hidden = !activo;
      }
    });

    if (modulo === 'muestra') {
      toolbarCaption.textContent = 'Estimación estadística de tamaño muestral para poblaciones finitas con desglose metodológico.';
      if (statusbarModo) statusbarModo.textContent = 'Modo: Población Finita';
      if (statusbarTipo) statusbarTipo.textContent = 'Fórmula de Proporciones';
    } else if (modulo === 'desviacion') {
      toolbarCaption.textContent = 'Cálculo y comparación de dispersión poblacional (σ) y muestral (s) con visualización gráfica interactiva.';
      if (statusbarModo) statusbarModo.textContent = 'Modo: Dispersión y Desviación';
      if (statusbarTipo) statusbarTipo.textContent = 'Muestral & Poblacional';

      // Redibujar gráfico tras hacerse visible
      requestAnimationFrame(() => {
        dibujarGraficoEstadistico();
      });
    } else if (modulo === 'interpolacion') {
      toolbarCaption.textContent = 'Herramienta de interpolación lineal para tablas estadísticas con motor algorítmico y sustitución paso a paso.';
      if (statusbarModo) statusbarModo.textContent = 'Modo: Interpolación Lineal';
      if (statusbarTipo) statusbarTipo.textContent = 'Aproximación por Segmento';

      // Redibujar gráfico de interpolación tras hacerse visible
      requestAnimationFrame(() => {
        dibujarGraficoInterpolacion();
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
    if (ultimoCalculoInterp) {
      dibujarGraficoInterpolacion();
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
  // MÓDULO 3: LÓGICA DE INTERPOLACIÓN LINEAL
  // ==========================================================================

  // Algoritmo de Cálculo Paso a Paso (Motor Interno de 6 Operaciones)
  function calcularInterpolacion(X1, Y1, X2, Y2, yTarget) {
    // Operación A: Restar (X2 menos X1). Guardar como "Diferencia de X".
    const diffX = X2 - X1;

    // Operación B: Restar (Y2 menos Y1). Guardar como "Diferencia de Y".
    const diffY = Y2 - Y1;

    // Operación C: Restar (Valor Y a buscar menos Y1). Guardar como "Diferencia Objetivo".
    const diffYTarget = yTarget - Y1;

    // Operación D: Multiplicar la "Diferencia de X" por la "Diferencia Objetivo".
    const prod = diffX * diffYTarget;

    // Operación E: Dividir el resultado de la "Operación D" entre la "Diferencia de Y".
    const cociente = prod / diffY;

    // Operación F (Resultado Final): Sumar el "Valor X1" con el resultado de la "Operación E".
    const resultadoFinalX = X1 + cociente;

    const avancePct = diffY !== 0 ? (diffYTarget / diffY) * 100 : 0;
    const pendiente = diffX !== 0 ? (diffY / diffX) : null;

    return {
      X1,
      Y1,
      X2,
      Y2,
      yTarget,
      diffX,
      diffY,
      diffYTarget,
      prod,
      cociente,
      resultadoFinalX,
      avancePct,
      pendiente
    };
  }

  // Lógica de Validación (Reglas antes del cálculo)
  function validarFormularioInterpolacion() {
    let valido = true;
    interpAlertaGlobal.style.display = 'none';

    const campos = [
      { el: inputX1, err: errorX1, nombre: 'Valor X1' },
      { el: inputY1, err: errorY1, nombre: 'Valor Y1' },
      { el: inputX2, err: errorX2, nombre: 'Valor X2' },
      { el: inputY2, err: errorY2, nombre: 'Valor Y2' },
      { el: inputYTarget, err: errorYTarget, nombre: 'Valor Y a buscar' }
    ];

    // Regla 1: Que los 5 campos no estén vacíos y contengan únicamente números.
    campos.forEach(c => {
      const valStr = c.el.value.trim();
      if (valStr === '') {
        c.err.textContent = `Por favor ingresa el ${c.nombre}.`;
        c.el.classList.add('input-invalid');
        valido = false;
      } else {
        const num = Number(valStr);
        if (isNaN(num) || !isFinite(num)) {
          c.err.textContent = `El ${c.nombre} debe ser un número válido.`;
          c.el.classList.add('input-invalid');
          valido = false;
        } else {
          c.err.textContent = '';
          c.el.classList.remove('input-invalid');
        }
      }
    });

    if (!valido) {
      interpAlertaTexto.textContent = 'Error: Los 5 campos deben estar llenos y contener únicamente números.';
      interpAlertaGlobal.style.display = 'flex';
      return false;
    }

    const y1Val = parseFloat(inputY1.value);
    const y2Val = parseFloat(inputY2.value);

    // Regla 2: Que el "Valor Y2" sea estrictamente diferente al "Valor Y1"
    if (Math.abs(y2Val - y1Val) < 1e-12) {
      const errorMsg = 'Error: Los valores de Y1 y Y2 no pueden ser iguales (evita división por cero)';
      errorY2.textContent = errorMsg;
      inputY2.classList.add('input-invalid');
      interpAlertaTexto.textContent = errorMsg;
      interpAlertaGlobal.style.display = 'flex';
      mostrarToast('Error: Y1 y Y2 no pueden ser iguales');
      return false;
    }

    return true;
  }

  // Formateador numérico dinámico
  function formatearNum(val, dec, forzarDecimales = false) {
    if (val === null || val === undefined || isNaN(val)) return '—';
    if (dec === 'exact') {
      return val.toString();
    }
    const d = typeof dec === 'number' ? dec : 4;
    if (forzarDecimales) {
      return val.toFixed(d);
    }
    return Number(val.toFixed(d)).toLocaleString('es', {
      minimumFractionDigits: d,
      maximumFractionDigits: d
    });
  }

  // Presentación del Procedimiento de Reemplazo en Texto Plano
  function generarProcedimientoTexto(res, dec) {
    const decStr = dec === 'exact' ? 'Exacto (sin redondeo)' : `${dec} decimales`;
    const xResultadoStr = formatearNum(res.resultadoFinalX, dec);

    return [
`======================================================================`,
`HERRAMIENTA DE INTERPOLACIÓN LINEAL (V0.5 — macOS Edition)`,
`======================================================================`,
`1. PARÁMETROS INGRESADOS:`,
`   - Valor X1 (Límite 1 variable objetivo) : ${res.X1}`,
`   - Valor Y1 (Límite 1 valor conocido)    : ${res.Y1}`,
`   - Valor X2 (Límite 2 variable objetivo) : ${res.X2}`,
`   - Valor Y2 (Límite 2 valor conocido)    : ${res.Y2}`,
`   - Valor Y a buscar (Punto conocido)     : ${res.yTarget}`,
``,
`2. FÓRMULA DE INTERPOLACIÓN LINEAL:`,
`   X = X1 + [ (X2 - X1) · (Y_buscar - Y1) ] / (Y2 - Y1)`,
``,
`3. SUSTITUCIÓN Y MOTOR DE CÁLCULO PASO A PASO:`,
`   Operación A: Restar (X2 - X1)         = ${res.X2} - ${res.X1} = ${res.diffX} (Diferencia de X)`,
`   Operación B: Restar (Y2 - Y1)         = ${res.Y2} - ${res.Y1} = ${res.diffY} (Diferencia de Y)`,
`   Operación C: Restar (Y - Y1)          = ${res.yTarget} - ${res.Y1} = ${res.diffYTarget} (Diferencia Objetivo)`,
`   Operación D: Multiplicar (A · C)      = (${res.diffX}) · (${res.diffYTarget}) = ${res.prod}`,
`   Operación E: Dividir (D / B)          = (${res.prod}) / (${res.diffY}) = ${res.cociente}`,
`   Operación F: Sumar (X1 + E)           = ${res.X1} + (${res.cociente}) = ${res.resultadoFinalX}`,
``,
`4. RESULTADO FINAL DE X:`,
`   X = ${xResultadoStr}  [Ajuste de precisión: ${decStr}]`,
`   Valor exacto interno: ${res.resultadoFinalX}`,
`   Proporción de avance en el intervalo: ${res.avancePct.toFixed(2)}%`,
`======================================================================`
    ].join('\n');
  }

  // Renderizar Desglose de Operaciones A a F
  function renderizarDesgloseInterpolacion(res) {
    interpStepsContainer.innerHTML = `
      <div class="apple-step-card">
        <div class="step-card-header">Operación A: Restar (X2 menos X1) — Diferencia de X</div>
        <div class="step-card-math">
          Diferencia de X = ${res.X2} - ${res.X1} = <strong>${res.diffX}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Operación B: Restar (Y2 menos Y1) — Diferencia de Y</div>
        <div class="step-card-math">
          Diferencia de Y = ${res.Y2} - ${res.Y1} = <strong>${res.diffY}</strong> (≠ 0, validación superada)
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Operación C: Restar (Valor Y a buscar menos Y1) — Diferencia Objetivo</div>
        <div class="step-card-math">
          Diferencia Objetivo = ${res.yTarget} - ${res.Y1} = <strong>${res.diffYTarget}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Operación D: Multiplicar (Diferencia de X · Diferencia Objetivo)</div>
        <div class="step-card-math">
          Producto = (${res.diffX}) · (${res.diffYTarget}) = <strong>${res.prod}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Operación E: Dividir (Operación D entre Diferencia de Y)</div>
        <div class="step-card-math">
          Cociente = (${res.prod}) / (${res.diffY}) = <strong>${res.cociente.toFixed(6)}</strong>
        </div>
      </div>

      <div class="apple-step-card">
        <div class="step-card-header">Operación F (Resultado Final): Sumar (Valor X1 + Operación E)</div>
        <div class="step-card-math">
          Resultado de X = ${res.X1} + (${res.cociente.toFixed(6)}) = <strong>${formatearNum(res.resultadoFinalX, decimalesInterp)}</strong>
        </div>
      </div>
    `;
  }

  // Gráfico Interactivo de Interpolación Lineal en Canvas
  function dibujarGraficoInterpolacion() {
    if (!canvasInterp || !ultimoCalculoInterp) return;

    const ctx = canvasInterp.getContext('2d');
    const container = canvasInterp.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const width = Math.min(container.clientWidth || 760, 760);
    const height = 320;

    canvasInterp.width = width * dpr;
    canvasInterp.height = height * dpr;
    canvasInterp.style.width = `${width}px`;
    canvasInterp.style.height = `${height}px`;

    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    const isDark = isDarkTheme();
    const colors = {
      grid: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.06)',
      axis: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.18)',
      textMuted: isDark ? 'rgba(235, 235, 245, 0.50)' : 'rgba(60, 60, 67, 0.55)',
      p1: isDark ? '#0a84ff' : '#007aff',
      p2: isDark ? '#30d158' : '#34c759',
      line: isDark ? '#0a84ff' : '#007aff',
      target: isDark ? '#ff9f0a' : '#ff9500',
      targetGlow: isDark ? 'rgba(255, 159, 10, 0.25)' : 'rgba(255, 149, 0, 0.20)',
      dash: isDark ? 'rgba(255, 159, 10, 0.70)' : 'rgba(255, 149, 0, 0.75)',
      pointBorder: isDark ? '#1c1c1e' : '#ffffff'
    };

    ctx.clearRect(0, 0, width, height);

    const res = ultimoCalculoInterp;
    const x1 = res.X1;
    const y1 = res.Y1;
    const x2 = res.X2;
    const y2 = res.Y2;
    const xT = res.resultadoFinalX;
    const yT = res.yTarget;

    const allX = [x1, x2, xT];
    const allY = [y1, y2, yT];

    const minX = Math.min(...allX);
    const maxX = Math.max(...allX);
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    const spanX = (maxX - minX) || 1;
    const spanY = (maxY - minY) || 1;

    const boundMinX = minX - spanX * 0.22;
    const boundMaxX = maxX + spanX * 0.22;
    const boundMinY = minY - spanY * 0.22;
    const boundMaxY = maxY + spanY * 0.22;

    const totalSpanX = boundMaxX - boundMinX;
    const totalSpanY = boundMaxY - boundMinY;

    const padLeft = 60;
    const padRight = 50;
    const padTop = 35;
    const padBottom = 45;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const toX = val => padLeft + ((val - boundMinX) / totalSpanX) * plotW;
    const toY = val => (height - padBottom) - ((val - boundMinY) / totalSpanY) * plotH;

    // Rejilla sutil
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const yGrid = padTop + (plotH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padLeft, yGrid);
      ctx.lineTo(width - padRight, yGrid);
      ctx.stroke();

      const xGrid = padLeft + (plotW / 4) * i;
      ctx.beginPath();
      ctx.moveTo(xGrid, padTop);
      ctx.lineTo(xGrid, height - padBottom);
      ctx.stroke();
    }

    // Ejes Cartesiados
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop);
    ctx.lineTo(padLeft, height - padBottom);
    ctx.lineTo(width - padRight, height - padBottom);
    ctx.stroke();

    // Proyecciones Ortogonales Discontinuas
    const ptX = toX(xT);
    const ptY = toY(yT);

    ctx.save();
    ctx.strokeStyle = colors.dash;
    ctx.lineWidth = 1.4;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(ptX, ptY);
    ctx.lineTo(ptX, height - padBottom);
    ctx.moveTo(ptX, ptY);
    ctx.lineTo(padLeft, ptY);
    ctx.stroke();
    ctx.restore();

    // Segmento Recto que une P1 y P2
    const p1X = toX(x1);
    const p1Y = toY(y1);
    const p2X = toX(x2);
    const p2Y = toY(y2);

    ctx.strokeStyle = colors.line;
    ctx.lineWidth = 2.8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p1X, p1Y);
    ctx.lineTo(p2X, p2Y);
    ctx.stroke();

    // Ticks en Eje X
    const puntosEjeX = [
      { x: x1, color: colors.p1, label: `X₁=${formatearNum(x1, 3)}` },
      { x: xT, color: colors.target, label: `X=${formatearNum(xT, decimalesInterp)}`, bold: true },
      { x: x2, color: colors.p2, label: `X₂=${formatearNum(x2, 3)}` }
    ];

    puntosEjeX.forEach(p => {
      const cx = toX(p.x);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, height - padBottom);
      ctx.lineTo(cx, height - padBottom + 5);
      ctx.stroke();

      ctx.fillStyle = p.color;
      ctx.font = p.bold ? '600 10px var(--font-apple-mono)' : '500 10px var(--font-apple-mono)';
      ctx.textAlign = 'center';
      ctx.fillText(p.label, cx, height - padBottom + 17);
    });

    // Ticks en Eje Y
    const puntosEjeY = [
      { y: y1, color: colors.p1, label: `Y₁=${formatearNum(y1, 3)}` },
      { y: yT, color: colors.target, label: `Y=${formatearNum(yT, 3)}`, bold: true },
      { y: y2, color: colors.p2, label: `Y₂=${formatearNum(y2, 3)}` }
    ];

    puntosEjeY.forEach(p => {
      const cy = toY(p.y);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padLeft - 5, cy);
      ctx.lineTo(padLeft, cy);
      ctx.stroke();

      ctx.fillStyle = p.color;
      ctx.font = p.bold ? '600 10px var(--font-apple-mono)' : '500 10px var(--font-apple-mono)';
      ctx.textAlign = 'right';
      ctx.fillText(p.label, padLeft - 7, cy + 3.5);
    });

    // Punto 1 (X1, Y1)
    ctx.fillStyle = colors.p1;
    ctx.beginPath();
    ctx.arc(p1X, p1Y, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colors.pointBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = colors.p1;
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
    ctx.textAlign = p1X < p2X ? 'right' : 'left';
    ctx.fillText('P₁ (X₁, Y₁)', p1X + (p1X < p2X ? -10 : 10), p1Y - 8);

    // Punto 2 (X2, Y2)
    ctx.fillStyle = colors.p2;
    ctx.beginPath();
    ctx.arc(p2X, p2Y, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colors.pointBorder;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = colors.p2;
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
    ctx.textAlign = p2X > p1X ? 'left' : 'right';
    ctx.fillText('P₂ (X₂, Y₂)', p2X + (p2X > p1X ? 10 : -10), p2Y - 8);

    // Punto Interpolado (P) con Resplandor
    ctx.fillStyle = colors.targetGlow;
    ctx.beginPath();
    ctx.arc(ptX, ptY, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = colors.target;
    ctx.beginPath();
    ctx.arc(ptX, ptY, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = colors.pointBorder;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = colors.target;
    ctx.font = '700 11px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`P (${formatearNum(xT, decimalesInterp)}, ${formatearNum(yT, 3)})`, ptX, ptY - 15);
  }

  // Actualizar UI con resultados de Interpolación
  function actualizarUIInterpolacion(res) {
    ultimoCalculoInterp = res;

    // Resultado Principal
    resInterpX.textContent = formatearNum(res.resultadoFinalX, decimalesInterp);

    const x1Str = formatearNum(res.X1, 4);
    const x2Str = formatearNum(res.X2, 4);
    const yTargetStr = formatearNum(res.yTarget, 4);
    const xResStr = formatearNum(res.resultadoFinalX, decimalesInterp);

    resInterpDetalle.textContent = `Para un valor conocido Y = ${yTargetStr}, el valor estimado de X es ${xResStr} (interpolado linealmente entre X₁=${x1Str} y X₂=${x2Str}).`;

    // Métricas
    metaDiffX.textContent = formatearNum(res.diffX, 4);
    metaDiffY.textContent = formatearNum(res.diffY, 4);
    metaDiffYTarget.textContent = formatearNum(res.diffYTarget, 4);
    metaAvance.textContent = `${res.avancePct.toFixed(2)}%`;
    metaPendiente.textContent = res.pendiente !== null ? res.pendiente.toFixed(4) : 'N/A';
    metaExactoInterp.textContent = res.resultadoFinalX.toString();

    // Procedimiento en texto plano
    interpProcedimientoTexto.textContent = generarProcedimientoTexto(res, decimalesInterp);

    // Desglose de Operaciones
    renderizarDesgloseInterpolacion(res);

    // Actualizar Leyendas
    legP1.textContent = `(${formatearNum(res.X1, 3)}, ${formatearNum(res.Y1, 3)})`;
    legTarget.textContent = `(${formatearNum(res.resultadoFinalX, decimalesInterp)}, ${formatearNum(res.yTarget, 3)})`;
    legP2.textContent = `(${formatearNum(res.X2, 3)}, ${formatearNum(res.Y2, 3)})`;

    // Gráfico Canvas
    dibujarGraficoInterpolacion();

    // Guardar en Historial
    guardarEnHistorialInterp(res);
  }

  // Ejecución de la Interpolación
  function ejecutarCalculoInterpolacion() {
    if (!validarFormularioInterpolacion()) {
      return;
    }

    const X1 = parseFloat(inputX1.value);
    const Y1 = parseFloat(inputY1.value);
    const X2 = parseFloat(inputX2.value);
    const Y2 = parseFloat(inputY2.value);
    const yTarget = parseFloat(inputYTarget.value);

    const resultado = calcularInterpolacion(X1, Y1, X2, Y2, yTarget);
    actualizarUIInterpolacion(resultado);
  }

  // Invertir variables X e Y
  function invertirXYInterpolacion() {
    const tempX1 = inputX1.value;
    const tempY1 = inputY1.value;
    const tempX2 = inputX2.value;
    const tempY2 = inputY2.value;

    inputX1.value = tempY1;
    inputY1.value = tempX1;
    inputX2.value = tempY2;
    inputY2.value = tempX2;

    if (ultimoCalculoInterp) {
      inputYTarget.value = ultimoCalculoInterp.resultadoFinalX.toString();
    }

    mostrarToast('Variables X e Y intercambiadas');
    ejecutarCalculoInterpolacion();
  }

  // Copiado del Resumen de Interpolación
  function copiarResumenInterpolacion() {
    if (!ultimoCalculoInterp) return;

    const res = ultimoCalculoInterp;
    const texto = 
`Resultado de Interpolación Lineal (V0.5 — macOS Edition)
-------------------------------------------------------
Punto 1 (X1, Y1) : (${res.X1}, ${res.Y1})
Punto 2 (X2, Y2) : (${res.X2}, ${res.Y2})
Valor Y a buscar : ${res.yTarget}

Resultado de X   : ${formatearNum(res.resultadoFinalX, decimalesInterp)}
Valor exacto     : ${res.resultadoFinalX}
Diferencia en X  : ${res.diffX}
Diferencia en Y  : ${res.diffY}
Diferencia obj   : ${res.diffYTarget}
Avance intervalo : ${res.avancePct.toFixed(2)}%

Fórmula: X = X1 + [ (X2 - X1) · (Y - Y1) ] / (Y2 - Y1)`;

    copiarTextoPortapapeles(texto, () => {
      copyBtnTextInterp.textContent = 'Copiado';
      copyIconInterp.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
      setTimeout(() => {
        copyBtnTextInterp.textContent = 'Copiar';
        copyIconInterp.innerHTML = `
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        `;
      }, 2000);
    });
  }

  // Copiado del Procedimiento en Texto Plano
  function copiarProcedimientoInterpolacion() {
    if (!ultimoCalculoInterp) return;

    const texto = generarProcedimientoTexto(ultimoCalculoInterp, decimalesInterp);
    copiarTextoPortapapeles(texto, () => {
      mostrarToast('Procedimiento copiado al portapapeles');
    });
  }

  // Historial de Interpolación en LocalStorage
  function cargarHistorialInterp() {
    try {
      const data = localStorage.getItem(STORAGE_INTERP_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function guardarEnHistorialInterp(resultado) {
    try {
      const historial = cargarHistorialInterp();
      const nuevoItem = {
        id: Date.now(),
        x1: resultado.X1,
        y1: resultado.Y1,
        x2: resultado.X2,
        y2: resultado.Y2,
        yTarget: resultado.yTarget,
        xResultado: resultado.resultadoFinalX,
        fecha: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
      };

      if (historial.length > 0) {
        const u = historial[0];
        if (
          u.x1 === nuevoItem.x1 &&
          u.y1 === nuevoItem.y1 &&
          u.x2 === nuevoItem.x2 &&
          u.y2 === nuevoItem.y2 &&
          u.yTarget === nuevoItem.yTarget
        ) {
          return;
        }
      }

      historial.unshift(nuevoItem);
      if (historial.length > 5) {
        historial.pop();
      }

      localStorage.setItem(STORAGE_INTERP_HISTORY_KEY, JSON.stringify(historial));
      renderizarHistorialInterp();
    } catch (e) {
      // Ignorar errores de almacenamiento
    }
  }

  function renderizarHistorialInterp() {
    const historial = cargarHistorialInterp();

    if (!historial || historial.length === 0) {
      interpHistorialLista.innerHTML = `
        <div class="empty-history">
          <p>No hay interpolaciones registradas recientemente.</p>
        </div>
      `;
      return;
    }

    let html = '';
    historial.forEach(item => {
      html += `
        <div class="apple-history-item" data-id="${item.id}">
          <div class="history-info">
            <span class="history-main">Y = ${item.yTarget} ➔ X = ${formatearNum(item.xResultado, 4)}</span>
            <span class="history-sub">De [${item.x1}, ${item.y1}] a [${item.x2}, ${item.y2}]</span>
            <span class="history-time">(${item.fecha})</span>
          </div>
          <div class="history-actions">
            <button type="button" class="btn-load btn-load-interp" data-id="${item.id}">Cargar</button>
          </div>
        </div>
      `;
    });

    interpHistorialLista.innerHTML = html;

    interpHistorialLista.querySelectorAll('.btn-load-interp').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        const item = historial.find(h => h.id === id);
        if (item) {
          inputX1.value = item.x1;
          inputY1.value = item.y1;
          inputX2.value = item.x2;
          inputY2.value = item.y2;
          inputYTarget.value = item.yTarget;
          ejecutarCalculoInterpolacion();
          mostrarToast('Parámetros de interpolación restaurados');
        }
      });
    });
  }

  // ==========================================================================
  // Escuchadores de Eventos
  // ==========================================================================

  // Pestañas
  tabBtnMuestra.addEventListener('click', () => cambiarModulo('muestra'));
  tabBtnDesviacion.addEventListener('click', () => cambiarModulo('desviacion'));
  tabBtnInterpolacion.addEventListener('click', () => cambiarModulo('interpolacion'));

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

  // Chips de Presets (Desviación)
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

  // Eventos Módulo 3 (Interpolación Lineal)
  formInterp.addEventListener('submit', function (ev) {
    ev.preventDefault();
    ejecutarCalculoInterpolacion();
  });

  [inputX1, inputY1, inputX2, inputY2, inputYTarget].forEach(input => {
    input.addEventListener('input', () => {
      interpAlertaGlobal.style.display = 'none';
      input.classList.remove('input-invalid');
      const errEl = document.getElementById(`${input.id}-error`);
      if (errEl) errEl.textContent = '';
    });
  });

  btnResetInterp.addEventListener('click', function () {
    inputX1.value = '1.7613';
    inputY1.value = '0.05';
    inputX2.value = '2.1448';
    inputY2.value = '0.025';
    inputYTarget.value = '0.035';

    [inputX1, inputY1, inputX2, inputY2, inputYTarget].forEach(i => {
      i.classList.remove('input-invalid');
      const err = document.getElementById(`${i.id}-error`);
      if (err) err.textContent = '';
    });
    interpAlertaGlobal.style.display = 'none';

    interpPresetChips.forEach((c, idx) => {
      c.classList.toggle('active', idx === 0);
    });

    ejecutarCalculoInterpolacion();
    mostrarToast('Valores de interpolación restablecidos');
  });

  btnInvertirInterp.addEventListener('click', invertirXYInterpolacion);
  btnCopiarInterp.addEventListener('click', copiarResumenInterpolacion);
  btnCopiarProcInterp.addEventListener('click', copiarProcedimientoInterpolacion);

  btnLimpiarHistorialInterp.addEventListener('click', function () {
    try {
      localStorage.removeItem(STORAGE_INTERP_HISTORY_KEY);
      renderizarHistorialInterp();
      mostrarToast('Historial de interpolación vaciado');
    } catch (e) {
      // Ignorar
    }
  });

  // Chips de Presets de Interpolación
  interpPresetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const presetKey = chip.getAttribute('data-interp-preset');
      if (INTERP_PRESETS[presetKey]) {
        interpPresetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const p = INTERP_PRESETS[presetKey];
        inputX1.value = p.x1;
        inputY1.value = p.y1;
        inputX2.value = p.x2;
        inputY2.value = p.y2;
        inputYTarget.value = p.yTarget;

        [inputX1, inputY1, inputX2, inputY2, inputYTarget].forEach(i => {
          i.classList.remove('input-invalid');
          const err = document.getElementById(`${i.id}-error`);
          if (err) err.textContent = '';
        });
        interpAlertaGlobal.style.display = 'none';

        ejecutarCalculoInterpolacion();
        mostrarToast(`Ejemplo cargado: ${p.label || chip.textContent.trim()}`);
      }
    });
  });

  // Segmented Control de Redondeo Dinámico
  roundingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roundingBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      const decVal = btn.getAttribute('data-decimals');
      decimalesInterp = decVal === 'exact' ? 'exact' : parseInt(decVal, 10);

      if (ultimoCalculoInterp) {
        actualizarUIInterpolacion(ultimoCalculoInterp);
      }
    });
  });

  // Redimensionamiento de ventana (Debounce)
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (moduloActivo === 'desviacion') {
        dibujarGraficoEstadistico();
      } else if (moduloActivo === 'interpolacion') {
        dibujarGraficoInterpolacion();
      }
    }, 120);
  });

  // ==========================================================================
  // Inicialización
  // ==========================================================================
  inicializarTema();
  renderizarHistorial();
  renderizarHistorialInterp();
  ejecutarCalculoMuestra();
  ejecutarCalculoDesviacion();
  ejecutarCalculoInterpolacion();
})();
