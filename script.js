/**
 * Calculadora Estadística — macOS & iOS Edition — V1.1
 * Módulo 1: Tamaño de Muestra para Poblaciones Finitas
 * Módulo 2: Desviación Estándar Poblacional y Muestral con Gráficos Interactivos
 * Módulo 3: Herramienta de Interpolación Lineal para Tablas Estadísticas
 * Módulo 4: Pruebas de Hipótesis Paramétricas (Z y t de Student, Proporciones y A/B Testing)
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
  const tabBtnHipotesis = document.getElementById('tab-btn-hipotesis');
  const viewMuestra = document.getElementById('view-muestra');
  const viewDesviacion = document.getElementById('view-desviacion');
  const viewInterpolacion = document.getElementById('view-interpolacion');
  const viewHipotesis = document.getElementById('view-hipotesis');
  const toolbarCaption = document.getElementById('toolbar-caption');
  const statusbarModo = document.getElementById('statusbar-modo');
  const statusbarTipo = document.getElementById('statusbar-tipo');

  let moduloActivo = 'muestra'; // 'muestra' | 'desviacion' | 'interpolacion' | 'hipotesis'

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

  // ==========================================================================
  // Módulo 4: Pruebas de Hipótesis (Elementos DOM)
  // ==========================================================================
  const hipoSubtabBtns = document.querySelectorAll('#hipo-subtabs .segment-btn');
  const hipoPanelMedia = document.getElementById('hipo-panel-media');
  const hipoPanelProporcion = document.getElementById('hipo-panel-proporcion');
  const hipoPanelDosMedias = document.getElementById('hipo-panel-dos-medias');

  const formHipotesis = document.getElementById('form-hipotesis');
  const hipoPresetChips = document.querySelectorAll('[data-hipo-preset]');
  const btnCalcularHipo = document.getElementById('btn-calcular-hipo');
  const btnResetHipo = document.getElementById('btn-reset-hipo');
  const btnCopiarHipo = document.getElementById('btn-copiar-hipo');
  const copyBtnTextHipo = document.getElementById('copy-btn-text-hipo');
  const copyIconHipo = document.getElementById('copy-icon-hipo');
  const btnCopiarResumenTexto = document.getElementById('btn-copiar-resumen-texto');
  const btnLimpiarHistorialHipo = document.getElementById('btn-limpiar-historial-hipo');

  const hipoColaBtns = document.querySelectorAll('#hipo-segmented-cola .segment-btn');
  const hipoAlphaBtns = document.querySelectorAll('#hipo-segmented-alpha .segment-btn');
  const inputConfianza = document.getElementById('hipo-confianza-input');
  const inputAlpha = document.getElementById('hipo-alpha-input');

  // Campos Submódulo A: Una Media
  const inputMediaMu0 = document.getElementById('hipo-media-mu0');
  const inputMediaXbar = document.getElementById('hipo-media-xbar');
  const inputMediaN = document.getElementById('hipo-media-n');
  const mediaOrigenBtns = document.querySelectorAll('#hipo-media-origen-control .segment-btn');
  const mediaTipoDispBtns = document.querySelectorAll('#hipo-media-tipo-disp-control .segment-btn');
  const inputMediaDispVal = document.getElementById('hipo-media-disp-val');
  const mediaDispLabel = document.getElementById('hipo-media-disp-label');
  const mediaCalloutTitle = document.getElementById('hipo-media-callout-title');
  const mediaCalloutText = document.getElementById('hipo-media-callout-text');

  // Campos Submódulo B: Una Proporción
  const inputPropP0 = document.getElementById('hipo-prop-p0');
  const inputPropN = document.getElementById('hipo-prop-n');
  const propModoBtns = document.querySelectorAll('#hipo-prop-modo-control .segment-btn');
  const inputPropObsVal = document.getElementById('hipo-prop-obs-val');
  const propObsLabel = document.getElementById('hipo-prop-obs-label');
  const propObsSuffix = document.getElementById('hipo-prop-obs-suffix');
  const chkPropComplemento = document.getElementById('hipo-prop-complemento-switch');
  const propComplementoInfo = document.getElementById('hipo-prop-complemento-info');
  const propComplementoText = document.getElementById('hipo-prop-complemento-text');
  const propNormalCallout = document.getElementById('hipo-prop-normal-callout');
  const propNormalTitle = document.getElementById('hipo-prop-callout-title');
  const propNormalText = document.getElementById('hipo-prop-callout-text');

  // Campos Submódulo C: Dos Medias
  const inputM1Xbar = document.getElementById('hipo-m1-xbar');
  const m1DispTipoBtns = document.querySelectorAll('#hipo-m1-disp-tipo-control .segment-btn');
  const inputM1DispVal = document.getElementById('hipo-m1-disp-val');
  const m1DispLabel = document.getElementById('hipo-m1-disp-label');
  const inputM1N = document.getElementById('hipo-m1-n');

  const inputM2Xbar = document.getElementById('hipo-m2-xbar');
  const m2DispTipoBtns = document.querySelectorAll('#hipo-m2-disp-tipo-control .segment-btn');
  const inputM2DispVal = document.getElementById('hipo-m2-disp-val');
  const m2DispLabel = document.getElementById('hipo-m2-disp-label');
  const inputM2N = document.getElementById('hipo-m2-n');
  const inputDosMediasD0 = document.getElementById('hipo-dos-medias-d0');

  // Resultados
  const hipoStatusDot = document.getElementById('hipo-status-dot');
  const hipoResultStatusTitle = document.getElementById('hipo-result-status-title');
  const hipoDecisionBadge = document.getElementById('hipo-decision-badge');
  const hipoDecisionAlphaTag = document.getElementById('hipo-decision-alpha-tag');
  const hipoDecisionTecnica = document.getElementById('hipo-decision-tecnica');
  const hipoDecisionNegocio = document.getElementById('hipo-decision-negocio');

  const hipoLblStatCal = document.getElementById('hipo-lbl-stat-cal');
  const hipoStatVal = document.getElementById('hipo-stat-val');
  const hipoStatSub = document.getElementById('hipo-stat-sub');
  const hipoLblCritVal = document.getElementById('hipo-lbl-crit-val');
  const hipoCritVal = document.getElementById('hipo-crit-val');
  const hipoCritSub = document.getElementById('hipo-crit-sub');
  const hipoPVal = document.getElementById('hipo-p-val');
  const hipoPSub = document.getElementById('hipo-p-sub');
  const hipoSeVal = document.getElementById('hipo-se-val');
  const hipoSeSub = document.getElementById('hipo-se-sub');
  const hipoRegionVal = document.getElementById('hipo-region-val');
  const hipoRegionSub = document.getElementById('hipo-region-sub');

  const canvasHipotesis = document.getElementById('canvas-hipotesis');
  const hipoChartDistributionBadge = document.getElementById('hipo-chart-distribution-badge');
  const legConfianzaText = document.getElementById('leg-confianza-text');
  const legAlphaText = document.getElementById('leg-alpha-text');
  const legCalcText = document.getElementById('leg-calc-text');

  const hipoStepsContainer = document.getElementById('hipo-steps-container');
  const hipoPlainTextCode = document.getElementById('hipo-plain-text-code');
  const hipoHistorialLista = document.getElementById('hipo-historial-lista');

  let subtabHipotesisActiva = 'media'; // 'media' | 'proporcion' | 'dos-medias'
  let tipoColaActiva = 'two-sided'; // 'two-sided' | 'left' | 'right'
  let nivelAlpha = 0.05;
  let origenDispMedia = 'poblacional'; // 'poblacional' | 'muestral'
  let formatoDispMedia = 'desviacion'; // 'desviacion' | 'varianza'
  let modoObsProporcion = 'casos'; // 'casos' | 'porcentaje'
  let formatoDispM1 = 'desviacion';
  let formatoDispM2 = 'desviacion';

  const STORAGE_HIPO_HISTORY_KEY = 'calc_hipotesis_historial';

  // Elementos Globales (Tema & Notificaciones)
  const btnTheme = document.getElementById('theme-toggle');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  let ultimoCalculoMuestra = null;
  let ultimoCalculoDesv = null;
  let ultimoCalculoHipo = null;
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
      { id: 'interpolacion', btn: tabBtnInterpolacion, view: viewInterpolacion },
      { id: 'hipotesis', btn: tabBtnHipotesis, view: viewHipotesis }
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
    } else if (modulo === 'hipotesis') {
      toolbarCaption.textContent = 'Contraste y pruebas de hipótesis paramétricas (Z y t de Student) con doble criterio de decisión y campana interactiva.';
      if (statusbarModo) statusbarModo.textContent = 'Modo: Inferencia Paramétrica';
      actualizarStatusBarHipotesis();

      // Redibujar campana dinámica tras hacerse visible
      requestAnimationFrame(() => {
        dibujarCampanaHipotesis();
      });
    }
  }

  function actualizarStatusBarHipotesis() {
    if (!statusbarTipo) return;
    if (subtabHipotesisActiva === 'media') {
      statusbarTipo.textContent = 'Una Media (Z / t)';
    } else if (subtabHipotesisActiva === 'proporcion') {
      statusbarTipo.textContent = 'Una Proporción (Z)';
    } else {
      statusbarTipo.textContent = 'Dos Medias (A/B Testing)';
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
    if (ultimoCalculoHipo) {
      dibujarCampanaHipotesis();
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
  // MÓDULO 4: LÓGICA DE PRUEBAS DE HIPÓTESIS (V1.0)
  // ==========================================================================

  // Biblioteca Matemática de Distribuciones Estadísticas
  function logGamma(x) {
    const p = [
      676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059,
      12.507343278686905, -0.138571095836524,
      9.9843695780195716e-6, 1.5056327351493116e-7
    ];
    if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x);
    x -= 1;
    let a = 0.99999999999980993;
    for (let i = 0; i < p.length; i++) a += p[i] / (x + i + 1);
    const t = x + p.length - 0.5;
    return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }

  function betacf(a, b, x) {
    const MAXIT = 100, EPS = 3.0e-12, FPMIN = 1.0e-30;
    const qab = a + b, qap = a + 1, qam = a - 1;
    let c = 1, d = 1 - qab * x / qap;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    d = 1 / d;
    let h = d;
    for (let m = 1; m <= MAXIT; m++) {
      const m2 = 2 * m;
      let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c;
      if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d;
      h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d;
      if (Math.abs(d) < FPMIN) d = FPMIN;
      c = 1 + aa / c;
      if (Math.abs(c) < FPMIN) c = FPMIN;
      d = 1 / d;
      const del = d * c;
      h *= del;
      if (Math.abs(del - 1) < EPS) break;
    }
    return h;
  }

  function ibeta(x, a, b) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
    if (x < (a + 1) / (a + b + 2)) {
      return bt * betacf(a, b, x) / a;
    } else {
      return 1 - bt * betacf(b, a, 1 - x) / b;
    }
  }

  function normPdf(z) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
  }

  function normCdf(z) {
    if (z === 0) return 0.5;
    const sign = z < 0 ? -1 : 1;
    const absZ = Math.abs(z);
    const t = 1 / (1 + 0.2316419 * absZ);
    const b1 = 0.319381530;
    const b2 = -0.356563782;
    const b3 = 1.781477937;
    const b4 = -1.821255978;
    const b5 = 1.330274429;
    const poly = ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    const pdf = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * absZ * absZ);
    const cdf = 1 - pdf * poly;
    return sign === 1 ? cdf : 1 - cdf;
  }

  function normInv(p) {
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;
    const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
    const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
    const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
    const d = [ 7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
    const p_low = 0.02425, p_high = 1 - p_low;
    let q, r;
    if (p < p_low) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) / (((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1));
    } else if (p <= p_high) {
      q = p - 0.5; r = q * q;
      return (((((a[0]*r + a[1])*r + a[2])*r + a[3])*r + a[4])*r + a[5])*q / ((((((b[0]*r + b[1])*r + b[2])*r + b[3])*r + b[4])*r + 1));
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0]*q + c[1])*q + c[2])*q + c[3])*q + c[4])*q + c[5]) / (((((d[0]*q + d[1])*q + d[2])*q + d[3])*q + 1));
    }
  }

  function tPdf(t, df) {
    const num = Math.exp(logGamma((df + 1) / 2) - logGamma(df / 2));
    const den = Math.sqrt(Math.PI * df) * Math.pow(1 + (t * t) / df, (df + 1) / 2);
    return num / den;
  }

  function tCdf(t, df) {
    if (df <= 0) return NaN;
    const x = df / (df + t * t);
    const prob = 0.5 * ibeta(x, df / 2, 0.5);
    return t >= 0 ? 1 - prob : prob;
  }

  function tInv(p, df) {
    if (p <= 0) return -Infinity;
    if (p >= 1) return Infinity;
    if (p === 0.5) return 0;
    const z = normInv(p);
    let t = z + (z * z * z + z) / (4 * df);
    for (let i = 0; i < 20; i++) {
      const error = tCdf(t, df) - p;
      const slope = tPdf(t, df);
      if (Math.abs(error) < 1e-12 || slope === 0) break;
      t -= error / slope;
    }
    return t;
  }

  // Presets de Casos Prácticos Reales para Hipótesis
  const HIPO_PRESETS = {
    'calidad-media-z': {
      subtab: 'media',
      cola: 'two-sided',
      alpha: 0.05,
      mu0: 500,
      xbar: 503.2,
      n: 50,
      origen: 'poblacional',
      tipoDisp: 'desviacion',
      dispVal: 8,
      nombre: 'Control Calidad Envasado (Z)'
    },
    'resistencia-media-t': {
      subtab: 'media',
      cola: 'left',
      alpha: 0.05,
      mu0: 45,
      xbar: 43.1,
      n: 16,
      origen: 'muestral',
      tipoDisp: 'desviacion',
      dispVal: 3.6,
      nombre: 'Resistencia Materiales (t de Student)'
    },
    'sla-proporcion': {
      subtab: 'proporcion',
      cola: 'right',
      alpha: 0.05,
      p0: 8,
      n: 400,
      modoObs: 'casos',
      obsVal: 348,
      complemento: true,
      nombre: 'SLA Reclamos Call Center (Proporción)'
    },
    'ab-dos-medias': {
      subtab: 'dos-medias',
      cola: 'right',
      alpha: 0.05,
      m1Xbar: 14.5,
      m1Tipo: 'desviacion',
      m1Disp: 2.8,
      m1N: 45,
      m2Xbar: 12.2,
      m2Tipo: 'desviacion',
      m2Disp: 2.5,
      m2N: 40,
      d0: 0,
      nombre: 'A/B Testing: Cajas de Pago (Dos Medias)'
    }
  };

  // Selector Dinámico e Indicadores Inteligentes de Hipótesis
  function actualizarSmartBadgesHipo() {
    if (subtabHipotesisActiva === 'media') {
      const n = parseInt(inputMediaN.value, 10) || 50;
      const sigmaConocida = origenDispMedia === 'poblacional';

      if (sigmaConocida) {
        mediaCalloutTitle.textContent = 'Distribución Z (Normal Estándar)';
        mediaCalloutText.textContent = 'Se aplica distribución Z porque la desviación estándar de la población (σ) es conocida formalmente por el estudio.';
      } else if (n >= 30) {
        mediaCalloutTitle.textContent = `Distribución Z (Normal Estándar — TLC n=${n} ≥ 30)`;
        mediaCalloutText.textContent = `Aunque σ es desconocida, el tamaño muestral (n = ${n} ≥ 30) permite aplicar el Teorema del Límite Central utilizando la desviación muestral (s).`;
      } else {
        const gl = Math.max(1, n - 1);
        mediaCalloutTitle.textContent = `Distribución t de Student (ν = ${gl} grados de libertad)`;
        mediaCalloutText.textContent = `Se aplica t de Student porque la desviación poblacional es desconocida (usamos s) y la muestra es pequeña (n = ${n} < 30).`;
      }
    } else if (subtabHipotesisActiva === 'proporcion') {
      const n = parseInt(inputPropN.value, 10) || 400;
      const p0Pct = parseFloat(inputPropP0.value) || 8;
      const p0 = p0Pct / 100;

      const np0 = n * p0;
      const nq0 = n * (1 - p0);
      const cumpleNormal = np0 >= 5 && nq0 >= 5;

      if (cumpleNormal) {
        propNormalTitle.textContent = `Aproximación Normal Válida (np₀ = ${np0.toFixed(1)} ≥ 5 y n(1−p₀) = ${nq0.toFixed(1)} ≥ 5)`;
        propNormalText.textContent = 'La muestra es suficientemente grande para aproximar la distribución binomial de la proporción a una distribución Normal Z estándar.';
      } else {
        propNormalTitle.textContent = `Advertencia de Normalidad (np₀ = ${np0.toFixed(1)}, n(1−p₀) = ${nq0.toFixed(1)})`;
        propNormalText.textContent = 'El criterio empírico de normalidad (np₀ ≥ 5 y n(1−p₀) ≥ 5) no se satisface con holgura. Interprete el resultado con cautela o aumente la muestra.';
      }

      // Actualizar texto del interruptor de complemento
      const obsVal = parseFloat(inputPropObsVal.value) || 0;
      if (chkPropComplemento.checked) {
        if (modoObsProporcion === 'casos') {
          const xEff = Math.max(0, n - obsVal);
          const pEff = (xEff / n) * 100;
          propComplementoText.textContent = `Complemento ACTIVO: Se invierte el dato ingresado (${obsVal} contrarios). Casos de interés calculados: x' = ${xEff} de ${n} (${pEff.toFixed(2)}%).`;
        } else {
          const pEff = Math.max(0, 100 - obsVal);
          propComplementoText.textContent = `Complemento ACTIVO: Se evalúa el porcentaje contrario p̂' = 100% − ${obsVal}% = ${pEff.toFixed(2)}%.`;
        }
      } else {
        propComplementoText.textContent = 'Modo estándar: Se evalúan directamente los casos ingresados como eventos favorables o de interés.';
      }
    }
  }

  // Validación del Formulario de Hipótesis
  function validarFormularioHipotesis() {
    let valido = true;

    // Validación general: alpha y confianza
    if (isNaN(nivelAlpha) || nivelAlpha <= 0 || nivelAlpha >= 1) {
      nivelAlpha = 0.05;
      inputAlpha.value = '0.05';
      inputConfianza.value = '95';
    }

    if (subtabHipotesisActiva === 'media') {
      const mu0 = parseFloat(inputMediaMu0.value);
      const xbar = parseFloat(inputMediaXbar.value);
      const n = parseInt(inputMediaN.value, 10);
      const disp = parseFloat(inputMediaDispVal.value);

      if (isNaN(mu0)) {
        inputMediaMu0.classList.add('input-invalid');
        valido = false;
      }
      if (isNaN(xbar)) {
        inputMediaXbar.classList.add('input-invalid');
        valido = false;
      }
      if (isNaN(n) || n < 2) {
        inputMediaN.classList.add('input-invalid');
        valido = false;
      }
      if (isNaN(disp) || disp <= 0) {
        inputMediaDispVal.classList.add('input-invalid');
        valido = false;
      }
    } else if (subtabHipotesisActiva === 'proporcion') {
      const p0 = parseFloat(inputPropP0.value);
      const n = parseInt(inputPropN.value, 10);
      const obs = parseFloat(inputPropObsVal.value);

      if (isNaN(p0) || p0 <= 0 || p0 >= 100) {
        inputPropP0.classList.add('input-invalid');
        valido = false;
      }
      if (isNaN(n) || n < 2) {
        inputPropN.classList.add('input-invalid');
        valido = false;
      }
      if (isNaN(obs) || obs < 0) {
        inputPropObsVal.classList.add('input-invalid');
        valido = false;
      }
      if (modoObsProporcion === 'casos' && obs > n && !isNaN(n)) {
        inputPropObsVal.classList.add('input-invalid');
        valido = false;
      }
    } else if (subtabHipotesisActiva === 'dos-medias') {
      const x1 = parseFloat(inputM1Xbar.value);
      const s1 = parseFloat(inputM1DispVal.value);
      const n1 = parseInt(inputM1N.value, 10);
      const x2 = parseFloat(inputM2Xbar.value);
      const s2 = parseFloat(inputM2DispVal.value);
      const n2 = parseInt(inputM2N.value, 10);

      if (isNaN(x1)) { inputM1Xbar.classList.add('input-invalid'); valido = false; }
      if (isNaN(s1) || s1 <= 0) { inputM1DispVal.classList.add('input-invalid'); valido = false; }
      if (isNaN(n1) || n1 < 2) { inputM1N.classList.add('input-invalid'); valido = false; }
      if (isNaN(x2)) { inputM2Xbar.classList.add('input-invalid'); valido = false; }
      if (isNaN(s2) || s2 <= 0) { inputM2DispVal.classList.add('input-invalid'); valido = false; }
      if (isNaN(n2) || n2 < 2) { inputM2N.classList.add('input-invalid'); valido = false; }
    }

    return valido;
  }

  // Motor Estadístico de Cálculo de Hipótesis
  function calcularPruebaHipotesis() {
    const alpha = nivelAlpha;
    const cola = tipoColaActiva; // 'two-sided' | 'left' | 'right'

    let resultado = {
      subtab: subtabHipotesisActiva,
      cola: cola,
      alpha: alpha,
      confianza: (1 - alpha) * 100,
      distribucion: 'Z',
      nombreDistribucion: 'Distribución Normal Estándar Z',
      gl: null,
      statName: 'Z_cal',
      statCal: 0,
      critValText: '',
      critLow: null,
      critHigh: null,
      pValue: 0,
      se: 0,
      rechazarH0: false,
      regionTexto: '',
      h0Texto: '',
      h1Texto: '',
      formulaTexto: '',
      valoresSustitucion: {},
      conclusionTecnica: '',
      conclusionNegocio: ''
    };

    if (subtabHipotesisActiva === 'media') {
      const mu0 = parseFloat(inputMediaMu0.value);
      const xbar = parseFloat(inputMediaXbar.value);
      const n = parseInt(inputMediaN.value, 10);
      const dispRaw = parseFloat(inputMediaDispVal.value);
      const s = formatoDispMedia === 'varianza' ? Math.sqrt(dispRaw) : dispRaw;
      const sigmaConocida = origenDispMedia === 'poblacional';

      // Lógica automática Z vs t
      const usarZ = sigmaConocida || n >= 30;
      resultado.distribucion = usarZ ? 'Z' : 't';
      resultado.gl = usarZ ? null : Math.max(1, n - 1);
      resultado.statName = usarZ ? 'Z_cal' : 't_cal';
      resultado.nombreDistribucion = usarZ 
        ? (sigmaConocida ? 'Distribución Normal Estándar Z (σ conocida)' : `Distribución Normal Estándar Z (n = ${n} ≥ 30 TLC)`)
        : `Distribución t de Student (ν = ${resultado.gl} grados de libertad)`;

      const se = s / Math.sqrt(n);
      const statCal = (xbar - mu0) / se;
      resultado.se = se;
      resultado.statCal = statCal;

      resultado.h0Texto = cola === 'two-sided' ? `H₀: μ = ${mu0}` : (cola === 'left' ? `H₀: μ ≥ ${mu0}` : `H₀: μ ≤ ${mu0}`);
      resultado.h1Texto = cola === 'two-sided' ? `H₁: μ ≠ ${mu0}` : (cola === 'left' ? `H₁: μ < ${mu0}` : `H₁: μ > ${mu0}`);

      resultado.valoresSustitucion = {
        mu0: mu0,
        xbar: xbar,
        n: n,
        disp: s,
        tipoDisp: formatoDispMedia,
        origen: origenDispMedia,
        se: se
      };

      resultado.formulaTexto = usarZ
        ? `Z_cal = (x̄ − μ₀) / (σ / √n) = (${xbar} − ${mu0}) / (${s.toFixed(4)} / √${n}) = ${statCal.toFixed(4)}`
        : `t_cal = (x̄ − μ₀) / (s / √n) = (${xbar} − ${mu0}) / (${s.toFixed(4)} / √${n}) = ${statCal.toFixed(4)}`;

    } else if (subtabHipotesisActiva === 'proporcion') {
      const p0Pct = parseFloat(inputPropP0.value);
      const p0 = p0Pct / 100;
      const n = parseInt(inputPropN.value, 10);
      const obsVal = parseFloat(inputPropObsVal.value);

      let xObs = modoObsProporcion === 'casos' ? obsVal : Math.round(n * (obsVal / 100));
      let pObs = modoObsProporcion === 'porcentaje' ? obsVal / 100 : obsVal / n;

      if (chkPropComplemento.checked) {
        xObs = n - xObs;
        pObs = 1 - pObs;
      }

      const se = Math.sqrt((p0 * (1 - p0)) / n);
      const statCal = (pObs - p0) / se;

      resultado.distribucion = 'Z';
      resultado.nombreDistribucion = 'Distribución Normal Estándar Z (Proporciones)';
      resultado.statName = 'Z_cal';
      resultado.se = se;
      resultado.statCal = statCal;

      resultado.h0Texto = cola === 'two-sided' ? `H₀: p = ${p0.toFixed(4)} (${p0Pct}%)` : (cola === 'left' ? `H₀: p ≥ ${p0.toFixed(4)}` : `H₀: p ≤ ${p0.toFixed(4)}`);
      resultado.h1Texto = cola === 'two-sided' ? `H₁: p ≠ ${p0.toFixed(4)} (${p0Pct}%)` : (cola === 'left' ? `H₁: p < ${p0.toFixed(4)}` : `H₁: p > ${p0.toFixed(4)}`);

      resultado.valoresSustitucion = {
        p0: p0,
        p0Pct: p0Pct,
        n: n,
        xObs: xObs,
        pObs: pObs,
        se: se,
        complemento: chkPropComplemento.checked
      };

      resultado.formulaTexto = `Z_cal = (p̂ − p₀) / √[ p₀(1 − p₀) / n ] = (${pObs.toFixed(4)} − ${p0.toFixed(4)}) / √[ (${p0.toFixed(4)} · ${(1 - p0).toFixed(4)}) / ${n} ] = ${statCal.toFixed(4)}`;

    } else if (subtabHipotesisActiva === 'dos-medias') {
      const x1 = parseFloat(inputM1Xbar.value);
      const s1Raw = parseFloat(inputM1DispVal.value);
      const s1 = formatoDispM1 === 'varianza' ? Math.sqrt(s1Raw) : s1Raw;
      const n1 = parseInt(inputM1N.value, 10);

      const x2 = parseFloat(inputM2Xbar.value);
      const s2Raw = parseFloat(inputM2DispVal.value);
      const s2 = formatoDispM2 === 'varianza' ? Math.sqrt(s2Raw) : s2Raw;
      const n2 = parseInt(inputM2N.value, 10);

      const d0 = parseFloat(inputDosMediasD0.value) || 0;

      const var1 = (s1 ** 2) / n1;
      const var2 = (s2 ** 2) / n2;
      const se = Math.sqrt(var1 + var2);
      const statCal = ((x1 - x2) - d0) / se;

      const usarZ = (n1 >= 30 && n2 >= 30);
      let gl = null;

      if (!usarZ) {
        // Fórmula de Welch-Satterthwaite
        const num = (var1 + var2) ** 2;
        const den = ((var1 ** 2) / (n1 - 1)) + ((var2 ** 2) / (n2 - 1));
        gl = Math.max(1, Math.round(num / den));
      }

      resultado.distribucion = usarZ ? 'Z' : 't';
      resultado.gl = gl;
      resultado.statName = usarZ ? 'Z_cal' : 't_cal';
      resultado.nombreDistribucion = usarZ
        ? `Distribución Normal Estándar Z (n₁=${n1}, n₂=${n2} ≥ 30)`
        : `Distribución t de Student (Grados de libertad Welch ν = ${gl})`;

      resultado.se = se;
      resultado.statCal = statCal;

      resultado.h0Texto = cola === 'two-sided' ? `H₀: μ₁ − μ₂ = ${d0}` : (cola === 'left' ? `H₀: μ₁ − μ₂ ≥ ${d0}` : `H₀: μ₁ − μ₂ ≤ ${d0}`);
      resultado.h1Texto = cola === 'two-sided' ? `H₁: μ₁ − μ₂ ≠ ${d0}` : (cola === 'left' ? `H₁: μ₁ − μ₂ < ${d0}` : `H₁: μ₁ − μ₂ > ${d0}`);

      resultado.valoresSustitucion = {
        x1, s1, n1,
        x2, s2, n2,
        d0, se
      };

      resultado.formulaTexto = `Estadístico = [ (x̄₁ − x̄₂) − D₀ ] / √[ (s₁²/n₁) + (s₂²/n₂) ] = [ (${x1} − ${x2}) − ${d0} ] / √[ (${(s1**2).toFixed(4)}/${n1}) + (${(s2**2).toFixed(4)}/${n2}) ] = ${statCal.toFixed(4)}`;
    }

    // Evaluación de Valores Críticos y p-valor
    const statCal = resultado.statCal;
    const esZ = resultado.distribucion === 'Z';
    const df = resultado.gl;

    const cdfFunc = (val) => esZ ? normCdf(val) : tCdf(val, df);
    const invFunc = (prob) => esZ ? normInv(prob) : tInv(prob, df);

    if (cola === 'two-sided') {
      const zCrit = invFunc(1 - alpha / 2);
      resultado.critLow = -Math.abs(zCrit);
      resultado.critHigh = Math.abs(zCrit);
      resultado.critValText = `±${Math.abs(zCrit).toFixed(3)}`;
      resultado.pValue = Math.min(1, Math.max(0, 2 * (1 - cdfFunc(Math.abs(statCal)))));
      resultado.rechazarH0 = Math.abs(statCal) > Math.abs(zCrit);
    } else if (cola === 'left') {
      const zCrit = -Math.abs(invFunc(1 - alpha));
      resultado.critLow = zCrit;
      resultado.critHigh = null;
      resultado.critValText = `${zCrit.toFixed(3)}`;
      resultado.pValue = Math.min(1, Math.max(0, cdfFunc(statCal)));
      resultado.rechazarH0 = statCal < zCrit;
    } else if (cola === 'right') {
      const zCrit = Math.abs(invFunc(1 - alpha));
      resultado.critLow = null;
      resultado.critHigh = zCrit;
      resultado.critValText = `+${zCrit.toFixed(3)}`;
      resultado.pValue = Math.min(1, Math.max(0, 1 - cdfFunc(statCal)));
      resultado.rechazarH0 = statCal > zCrit;
    }

    resultado.regionTexto = resultado.rechazarH0 ? 'Región Crítica (Rechazo)' : 'Zona de No Rechazo (Aceptación)';

    // Conclusiones Ejecutiva y de Negocio
    generarConclusionesHipo(resultado);

    return resultado;
  }

  // Generador de Conclusiones Ejecutiva y de Negocio
  function generarConclusionesHipo(res) {
    const alfaFmt = res.alpha.toFixed(3).replace(/\.?0+$/, '');
    const confFmt = res.confianza.toFixed(1).replace(/\.0$/, '');
    const statFmt = (res.statCal >= 0 ? '+' : '') + res.statCal.toFixed(3);
    const pFmt = res.pValue < 0.0001 ? '< 0.0001' : res.pValue.toFixed(4);

    if (res.rechazarH0) {
      res.conclusionTecnica = `Se rechaza la hipótesis nula H₀ al nivel de significación α = ${alfaFmt} (confianza ${confFmt}%). El estadístico calculado (${res.statName} = ${statFmt}) cae dentro de la región crítica de rechazo (criterio crítico: ${res.critValText}, p-valor = ${pFmt} < α). La diferencia observada es estadísticamente significativa y no puede explicarse por el azar del muestreo.`;
    } else {
      res.conclusionTecnica = `No se rechaza la hipótesis nula H₀ al nivel de significación α = ${alfaFmt} (confianza ${confFmt}%). El estadístico calculado (${res.statName} = ${statFmt}) permanece dentro de la región de no rechazo (criterio crítico: ${res.critValText}, p-valor = ${pFmt} ≥ α). No existe evidencia estadística suficiente para desacreditar la condición nula.`;
    }

    // Conclusión en Lenguaje de Negocio
    if (res.subtab === 'media') {
      const mu0 = res.valoresSustitucion.mu0;
      const xbar = res.valoresSustitucion.xbar;
      if (res.rechazarH0) {
        res.conclusionNegocio = `Existe evidencia contundente de que la media real del proceso (${xbar}) difiere del estándar establecido (${mu0}). Se recomienda proceder con la intervención correctiva, recalibración o adopción de la nueva directriz, ya que el cambio es real y relevante.`;
      } else {
        res.conclusionNegocio = `No se cuenta con evidencia de que la media observada (${xbar}) difiera significativamente del objetivo (${mu0}). La variación registrada es compatible con la fluctuación aleatoria habitual del proceso. Se recomienda mantener las operaciones y continuar la supervisión ordinaria.`;
      }
    } else if (res.subtab === 'proporcion') {
      const p0Pct = res.valoresSustitucion.p0Pct;
      const pObsPct = (res.valoresSustitucion.pObs * 100).toFixed(2);
      if (res.rechazarH0) {
        res.conclusionNegocio = `La tasa observada (${pObsPct}%) difiere significativamente de la meta histórica del ${p0Pct}%. Con un p-valor de ${pFmt}, el resultado respalda con alta certidumbre la hipótesis alternativa. Se recomienda ejecutar el plan de acción empresarial respectivo.`;
      } else {
        res.conclusionNegocio = `La tasa muestral observada (${pObsPct}%) se mantiene estadísticamente alineada con la meta de referencia (${p0Pct}%). No hay justificación estadística para modificar la estrategia actual ni aplicar medidas punitivas o de emergencia.`;
      }
    } else if (res.subtab === 'dos-medias') {
      const x1 = res.valoresSustitucion.x1;
      const x2 = res.valoresSustitucion.x2;
      if (res.rechazarH0) {
        res.conclusionNegocio = `Existe una diferencia estadísticamente significativa entre el Grupo 1 (media ${x1}) y el Grupo 2 (media ${x2}). La prueba A/B confirma que la diferencia de rendimiento no es producto del azar. Se recomienda implementar definitivamente la opción ganadora.`;
      } else {
        res.conclusionNegocio = `No existe evidencia concluyente de una diferencia operativa entre ambos grupos (Grupo 1: ${x1} vs Grupo 2: ${x2}). La ligera discrepancia observada puede atribuirse a la variabilidad de la muestra. Se recomienda prolongar la evaluación o priorizar la opción con menores costos.`;
      }
    }
  }

  // Actualización de la Interfaz con los Resultados
  function actualizarUIHipotesis(res) {
    ultimoCalculoHipo = res;

    // 1. Badge de Decisión Principal
    if (res.rechazarH0) {
      hipoDecisionBadge.textContent = 'RECHAZAR H₀';
      hipoDecisionBadge.className = 'verdict-pill-badge reject';
      hipoStatusDot.style.backgroundColor = 'var(--system-red)';
      hipoStatusDot.style.boxShadow = '0 0 8px var(--system-red)';
      hipoResultStatusTitle.textContent = 'Diferencia Estadísticamente Significativa';
    } else {
      hipoDecisionBadge.textContent = 'NO RECHAZAR H₀';
      hipoDecisionBadge.className = 'verdict-pill-badge accept';
      hipoStatusDot.style.backgroundColor = 'var(--system-green)';
      hipoStatusDot.style.boxShadow = '0 0 8px var(--system-green)';
      hipoResultStatusTitle.textContent = 'Sin Evidencia Suficiente para Rechazar H₀';
    }

    hipoDecisionAlphaTag.textContent = `Nivel de significación α = ${res.alpha} (Confianza ${res.confianza.toFixed(1)}%)`;
    hipoDecisionTecnica.textContent = res.conclusionTecnica;
    hipoDecisionNegocio.textContent = res.conclusionNegocio;

    // 2. Métricas Clave
    hipoLblStatCal.textContent = `Estadístico (${res.statName})`;
    hipoStatVal.textContent = (res.statCal >= 0 ? '+' : '') + res.statCal.toFixed(3);
    hipoStatSub.textContent = res.distribucion === 'Z' ? 'Distribución Normal' : `t-Student (ν=${res.gl} gl)`;

    hipoLblCritVal.textContent = 'Valor Crítico';
    hipoCritVal.textContent = res.critValText;
    hipoCritSub.textContent = res.cola === 'two-sided' ? 'Región bilateral (±)' : (res.cola === 'left' ? 'Cola izquierda (<)' : 'Cola derecha (>)');

    hipoPVal.textContent = res.pValue < 0.0001 ? '< 0.0001' : res.pValue.toFixed(4);
    hipoPSub.textContent = res.pValue < res.alpha ? `p < α (${(res.pValue * 100).toFixed(2)}%)` : `p ≥ α (${(res.pValue * 100).toFixed(2)}%)`;

    hipoSeVal.textContent = res.se.toFixed(4);
    hipoSeSub.textContent = 'Error Estándar (SE)';

    hipoRegionVal.textContent = res.rechazarH0 ? 'Región Crítica' : 'Zona Aceptación';
    hipoRegionVal.className = 'metric-value status-highlight-val ' + (res.rechazarH0 ? 'reject' : 'accept');
    hipoRegionSub.textContent = res.rechazarH0 ? 'Cae en zona de rechazo' : 'Dentro del rango esperado';

    // 3. Gráfico y Leyenda
    hipoChartDistributionBadge.textContent = res.nombreDistribucion;
    legConfianzaText.textContent = `${res.confianza.toFixed(1)}%`;
    legAlphaText.textContent = `α = ${res.alpha}`;
    legCalcText.textContent = `${res.statName} = ${(res.statCal >= 0 ? '+' : '')}${res.statCal.toFixed(3)}`;

    dibujarCampanaHipotesis();

    // 4. Procedimiento Paso a Paso y Código Plano
    renderizarPasosHipotesis(res);
    hipoPlainTextCode.textContent = generarProcedimientoTextoHipo(res);

    // 5. Historial Local
    guardarEnHistorialHipo(res);
  }

  // Renderizador de Pasos Inferenciales
  function renderizarPasosHipotesis(res) {
    const alfaFmt = res.alpha;
    const statFmt = (res.statCal >= 0 ? '+' : '') + res.statCal.toFixed(3);
    const pFmt = res.pValue < 0.0001 ? '< 0.0001' : res.pValue.toFixed(4);

    const colaDesc = res.cola === 'two-sided' ? 'Bilateral (Dos colas, ≠)' : (res.cola === 'left' ? 'Unilateral Izquierda (<)' : 'Unilateral Derecha (>)');

    let html = `
      <div class="hipo-step-card">
        <div class="hipo-step-header">
          <span class="step-num-badge">1</span>
          <span class="hipo-step-title">Planteamiento de Hipótesis</span>
        </div>
        <p class="hipo-step-body">Se formulan la hipótesis nula de no cambio y la hipótesis alternativa de investigación según el sentido del contraste: <strong>${colaDesc}</strong>.</p>
        <div class="math-eq-callout">
          ${res.h0Texto}<br>
          ${res.h1Texto}
        </div>
      </div>

      <div class="hipo-step-card">
        <div class="hipo-step-header">
          <span class="step-num-badge">2</span>
          <span class="hipo-step-title">Nivel de Significación y Región Crítica</span>
        </div>
        <p class="hipo-step-body">Se fija un nivel de riesgo α = ${alfaFmt} (confianza del ${res.confianza.toFixed(1)}%). Con la <strong>${res.nombreDistribucion}</strong>, el cuantil crítico de la tabla es <strong>${res.critValText}</strong>.</p>
        <div class="math-eq-callout">
          Regla de Decisión: Rechazar H₀ si ${res.cola === 'two-sided' ? `|${res.statName}| > ${res.critHigh.toFixed(3)}` : (res.cola === 'left' ? `${res.statName} < ${res.critLow.toFixed(3)}` : `${res.statName} > ${res.critHigh.toFixed(3)}`)}
        </div>
      </div>

      <div class="hipo-step-card">
        <div class="hipo-step-header">
          <span class="step-num-badge">3</span>
          <span class="hipo-step-title">Cálculo del Estadístico de Prueba</span>
        </div>
        <p class="hipo-step-body">Sustituyendo los parámetros muestrales observados en la ecuación teórica correspondiente:</p>
        <div class="math-eq-callout">
          Error Estándar (SE) = ${res.se.toFixed(4)}<br>
          ${res.formulaTexto}
        </div>
      </div>

      <div class="hipo-step-card">
        <div class="hipo-step-header">
          <span class="step-num-badge">4</span>
          <span class="hipo-step-title">Doble Criterio de Decisión</span>
        </div>
        <p class="hipo-step-body">
          • <strong>Criterio de Valor Crítico:</strong> ${res.statName} = ${statFmt} ${res.rechazarH0 ? 'está en la región de rechazo frente a' : 'no supera el valor crítico'} ${res.critValText}.<br>
          • <strong>Criterio de p-valor:</strong> p-valor = ${pFmt} ${res.rechazarH0 ? `< α (${alfaFmt}) ➔ Decisión: Rechazar H₀` : `≥ α (${alfaFmt}) ➔ Decisión: No Rechazar H₀`}.
        </p>
      </div>

      <div class="hipo-step-card">
        <div class="hipo-step-header">
          <span class="step-num-badge">5</span>
          <span class="hipo-step-title">Dictamen y Recomendación</span>
        </div>
        <p class="hipo-step-body"><strong>Dictamen:</strong> ${res.conclusionTecnica}</p>
        <p class="hipo-step-body" style="margin-top: 6px;"><strong>Recomendación Ejecutiva:</strong> ${res.conclusionNegocio}</p>
      </div>
    `;

    hipoStepsContainer.innerHTML = html;
  }

  // Generador de Resumen en Texto Plano
  function generarProcedimientoTextoHipo(res) {
    const statFmt = (res.statCal >= 0 ? '+' : '') + res.statCal.toFixed(3);
    const pFmt = res.pValue < 0.0001 ? '< 0.0001' : res.pValue.toFixed(4);

    return `======================================================================
REPORTE DE CONTRASTE DE HIPÓTESIS — macOS V1.0
======================================================================
Módulo: ${res.subtab === 'media' ? 'Una Media (μ)' : (res.subtab === 'proporcion' ? 'Una Proporción (p)' : 'Dos Medias (A/B Testing)')}
Sentido: ${res.cola === 'two-sided' ? 'Bilateral (≠)' : (res.cola === 'left' ? 'Cola Izquierda (<)' : 'Cola Derecha (>)')}
Nivel de Significación: α = ${res.alpha} | Confianza: ${res.confianza.toFixed(1)}%
Distribución Teórica: ${res.nombreDistribucion}

1. PLANTEAMIENTO:
   ${res.h0Texto}
   ${res.h1Texto}

2. ESTADÍSTICO CALCULADO:
   ${res.formulaTexto}
   Error Estándar (SE): ${res.se.toFixed(4)}

3. CRITERIOS DE DECISIÓN:
   • Valor Crítico de Tabla: ${res.critValText}
   • Estadístico Muestral: ${res.statName} = ${statFmt}
   • Valor p (Significación): ${pFmt}
   • Ubicación: ${res.regionTexto}

4. DICTAMEN TÉCNICO:
   ${res.rechazarH0 ? 'RECHAZAR HIPÓTESIS NULA H₀' : 'NO RECHAZAR HIPÓTESIS NULA H₀'}
   ${res.conclusionTecnica}

5. RECOMENDACIÓN DE NEGOCIO / APLICACIÓN PRÁCTICA:
   ${res.conclusionNegocio}
======================================================================`;
  }

  // ==========================================================================
  // RENDERIZADOR GRÁFICO EN CANVAS: LA CAMPANA DINÁMICA
  // ==========================================================================
  function dibujarCampanaHipotesis() {
    if (!canvasHipotesis || !ultimoCalculoHipo) return;

    const ctx = canvasHipotesis.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvasHipotesis.getBoundingClientRect();
    const width = Math.min(rect.width || 760, 760);
    const height = 340;

    if (width <= 0) return;

    // Retina HiDPI
    canvasHipotesis.width = Math.floor(width * dpr);
    canvasHipotesis.height = Math.floor(height * dpr);
    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const res = ultimoCalculoHipo;

    const colors = {
      axis: isDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(0, 0, 0, 0.18)',
      grid: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)',
      text: isDark ? 'rgba(235, 235, 245, 0.85)' : 'rgba(60, 60, 67, 0.85)',
      textMuted: isDark ? 'rgba(235, 235, 245, 0.50)' : 'rgba(60, 60, 67, 0.45)',
      curve: isDark ? '#0a84ff' : '#007aff',
      curveRejection: isDark ? '#ff453a' : '#ff3b30',
      acceptanceFill: isDark ? 'rgba(10, 132, 255, 0.18)' : 'rgba(0, 122, 255, 0.11)',
      rejectionFill: isDark ? 'rgba(255, 69, 58, 0.32)' : 'rgba(255, 59, 48, 0.18)',
      critLine: isDark ? '#ff453a' : '#ff3b30',
      statMarkerReject: isDark ? '#ff453a' : '#ff3b30',
      statMarkerAccept: isDark ? '#30d158' : '#34c759',
      statPillBg: isDark ? 'rgba(30, 30, 32, 0.95)' : 'rgba(255, 255, 255, 0.95)'
    };

    ctx.clearRect(0, 0, width, height);

    const padLeft = 45;
    const padRight = 45;
    const padTop = 50;
    const padBottom = 55;
    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    // Rango dinámico en el eje horizontal
    const statAbs = Math.abs(res.statCal);
    const rangeBase = Math.max(4.0, Math.min(5.5, statAbs + 0.8));
    const minX = -rangeBase;
    const maxX = rangeBase;

    const esZ = res.distribucion === 'Z';
    const df = res.gl;
    const pdf = (x) => esZ ? normPdf(x) : tPdf(x, df);

    const peakY = pdf(0);
    const maxDensity = peakY * 1.12;

    const mapX = (x) => padLeft + ((x - minX) / (maxX - minX)) * plotW;
    const mapY = (y) => padTop + plotH - (y / maxDensity) * plotH;
    const baseY = padTop + plotH;

    // Cuadrícula y Línea Base
    ctx.strokeStyle = colors.axis;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padLeft, baseY);
    ctx.lineTo(width - padRight, baseY);
    ctx.stroke();

    // Muestreo de la curva en 240 puntos
    const numPoints = 240;
    const pts = [];
    for (let i = 0; i <= numPoints; i++) {
      const x = minX + (i / numPoints) * (maxX - minX);
      const y = pdf(x);
      pts.push({ x, y, px: mapX(x), py: mapY(y) });
    }

    // Regla de pertenencia a Rechazo
    function estaEnRechazo(x) {
      if (res.cola === 'two-sided') {
        return Math.abs(x) >= res.critHigh;
      } else if (res.cola === 'left') {
        return x <= res.critLow;
      } else if (res.cola === 'right') {
        return x >= res.critHigh;
      }
      return false;
    }

    // 1. Relleno de Región de Aceptación (No Rechazo)
    ctx.fillStyle = colors.acceptanceFill;
    ctx.beginPath();
    ctx.moveTo(pts[0].px, baseY);
    for (let i = 0; i <= numPoints; i++) {
      const pt = pts[i];
      if (!estaEnRechazo(pt.x)) {
        ctx.lineTo(pt.px, pt.py);
      } else {
        ctx.lineTo(pt.px, baseY);
      }
    }
    ctx.lineTo(pts[numPoints].px, baseY);
    ctx.closePath();
    ctx.fill();

    // 2. Relleno de Región de Rechazo
    ctx.fillStyle = colors.rejectionFill;
    ctx.beginPath();
    ctx.moveTo(pts[0].px, baseY);
    for (let i = 0; i <= numPoints; i++) {
      const pt = pts[i];
      if (estaEnRechazo(pt.x)) {
        ctx.lineTo(pt.px, pt.py);
      } else {
        ctx.lineTo(pt.px, baseY);
      }
    }
    ctx.lineTo(pts[numPoints].px, baseY);
    ctx.closePath();
    ctx.fill();

    // 3. Trazo de la Curva de Densidad
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = colors.curve;
    ctx.beginPath();
    pts.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.px, pt.py);
      else ctx.lineTo(pt.px, pt.py);
    });
    ctx.stroke();

    // 4. Líneas Críticas Delimitadoras
    ctx.save();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = colors.critLine;
    ctx.lineWidth = 1.8;

    const criticalValues = [];
    if (res.cola === 'two-sided') {
      criticalValues.push(-res.critHigh, res.critHigh);
    } else if (res.cola === 'left') {
      criticalValues.push(res.critLow);
    } else if (res.cola === 'right') {
      criticalValues.push(res.critHigh);
    }

    criticalValues.forEach(cVal => {
      const cX = mapX(cVal);
      const cY = mapY(pdf(cVal));
      ctx.beginPath();
      ctx.moveTo(cX, baseY);
      ctx.lineTo(cX, cY - 8);
      ctx.stroke();
    });
    ctx.restore();

    // Etiquetas de Valores Críticos bajo el eje
    ctx.font = '600 11px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = colors.critLine;

    criticalValues.forEach(cVal => {
      const cX = mapX(cVal);
      const txt = (cVal >= 0 ? '+' : '') + cVal.toFixed(2);
      ctx.fillText(txt, cX, baseY + 26);
    });

    // Marcas de división en el eje horizontal (-3, -2, -1, 0, 1, 2, 3)
    ctx.font = '500 10px -apple-system, sans-serif';
    ctx.fillStyle = colors.textMuted;
    const ticks = [-3, -2, -1, 0, 1, 2, 3];
    ticks.forEach(tVal => {
      if (tVal >= minX && tVal <= maxX) {
        const tx = mapX(tVal);
        ctx.beginPath();
        ctx.moveTo(tx, baseY);
        ctx.lineTo(tx, baseY + 4);
        ctx.strokeStyle = colors.axis;
        ctx.stroke();
        if (Math.abs(tVal) !== 0) {
          ctx.fillText(tVal.toString(), tx, baseY + 14);
        } else {
          ctx.font = '600 10px -apple-system, sans-serif';
          ctx.fillText('0 (μ₀)', tx, baseY + 14);
          ctx.font = '500 10px -apple-system, sans-serif';
        }
      }
    });

    // 5. Marcador y Aguja del Estadístico Muestral Calculado
    const statVal = res.statCal;
    const statClamped = Math.max(minX, Math.min(maxX, statVal));
    const statX = mapX(statClamped);
    const statDensity = pdf(statClamped);
    const statY = mapY(statDensity);
    const markerColor = res.rechazarH0 ? colors.statMarkerReject : colors.statMarkerAccept;

    // Aguja vertical brillante
    ctx.save();
    ctx.strokeStyle = markerColor;
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(statX, baseY);
    ctx.lineTo(statX, statY);
    ctx.stroke();

    // Punto en la curva
    ctx.fillStyle = markerColor;
    ctx.beginPath();
    ctx.arc(statX, statY, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Tarjeta / Pill flotante indicadora del Estadístico
    const pillTxt = `${res.statName} = ${(statVal >= 0 ? '+' : '')}${statVal.toFixed(2)}`;
    const pillSub = res.rechazarH0 ? 'RECHAZO' : 'ACEPTACIÓN';
    ctx.font = '700 11px -apple-system, sans-serif';
    const txtWidth = Math.max(ctx.measureText(pillTxt).width, 70);
    const pillW = txtWidth + 18;
    const pillH = 34;

    let pillX = statX - pillW / 2;
    pillX = Math.max(padLeft + 4, Math.min(width - padRight - pillW - 4, pillX));
    const pillY = Math.max(8, statY - 44);

    // Fondo del Pill
    ctx.fillStyle = colors.statPillBg;
    ctx.shadowColor = markerColor;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 8);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = markerColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Textos del Pill
    ctx.fillStyle = markerColor;
    ctx.textAlign = 'center';
    ctx.font = '700 11px -apple-system, sans-serif';
    ctx.fillText(pillTxt, pillX + pillW / 2, pillY + 14);

    ctx.font = '600 9px -apple-system, sans-serif';
    ctx.fillStyle = isDark ? '#ffffff' : '#000000';
    ctx.fillText(pillSub, pillX + pillW / 2, pillY + 27);
    ctx.restore();

    // Etiquetas de Zonas
    ctx.font = '600 12px -apple-system, sans-serif';
    ctx.fillStyle = colors.curve;
    ctx.textAlign = 'center';
    ctx.fillText(`Zona de No Rechazo (1 − α = ${(res.confianza).toFixed(0)}%)`, width / 2, baseY - 24);
  }

  // Ejecución de la Prueba de Hipótesis
  function ejecutarCalculoHipotesis() {
    if (!validarFormularioHipotesis()) return;
    const resultado = calcularPruebaHipotesis();
    actualizarUIHipotesis(resultado);
  }

  // ==========================================================================
  // Historial Local de Pruebas de Hipótesis
  // ==========================================================================
  function cargarHistorialHipo() {
    try {
      const data = localStorage.getItem(STORAGE_HIPO_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function guardarEnHistorialHipo(res) {
    try {
      const historial = cargarHistorialHipo();
      const nuevoItem = {
        id: Date.now(),
        fecha: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' }),
        subtab: res.subtab,
        cola: res.cola,
        alpha: res.alpha,
        statName: res.statName,
        statCal: res.statCal,
        rechazarH0: res.rechazarH0,
        pValue: res.pValue,
        valores: res.valoresSustitucion
      };

      // Evitar duplicados idénticos consecutivos
      if (historial.length > 0) {
        const u = historial[0];
        if (u.subtab === nuevoItem.subtab && Math.abs(u.statCal - nuevoItem.statCal) < 0.001) {
          return;
        }
      }

      historial.unshift(nuevoItem);
      if (historial.length > 10) historial.pop();
      localStorage.setItem(STORAGE_HIPO_HISTORY_KEY, JSON.stringify(historial));
      renderizarHistorialHipo();
    } catch (e) {
      // Ignorar
    }
  }

  function renderizarHistorialHipo() {
    const historial = cargarHistorialHipo();
    if (!historial || historial.length === 0) {
      hipoHistorialLista.innerHTML = `
        <div class="empty-history">
          <p>No hay pruebas de hipótesis registradas recientemente.</p>
        </div>
      `;
      return;
    }

    let html = '';
    historial.forEach(item => {
      const veredicto = item.rechazarH0 ? 'Rechaza H₀' : 'No Rechaza H₀';
      const subtabNom = item.subtab === 'media' ? 'Una Media (μ)' : (item.subtab === 'proporcion' ? 'Una Proporción (p)' : 'Dos Medias (A/B)');
      const statFmt = (item.statCal >= 0 ? '+' : '') + item.statCal.toFixed(3);

      html += `
        <div class="apple-history-item" data-id="${item.id}">
          <div class="history-info">
            <span class="history-main">${subtabNom}: ${item.statName} = ${statFmt} ➔ ${veredicto}</span>
            <span class="history-sub">α = ${item.alpha} | p-valor = ${item.pValue < 0.0001 ? '<0.0001' : item.pValue.toFixed(4)}</span>
            <span class="history-time">(${item.fecha})</span>
          </div>
          <div class="history-actions">
            <button type="button" class="btn-load btn-load-hipo" data-id="${item.id}">Cargar</button>
          </div>
        </div>
      `;
    });

    hipoHistorialLista.innerHTML = html;

    hipoHistorialLista.querySelectorAll('.btn-load-hipo').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = Number(btn.getAttribute('data-id'));
        const item = historial.find(h => h.id === id);
        if (item) {
          restaurarItemHistorialHipo(item);
          mostrarToast('Parámetros de prueba de hipótesis restaurados');
        }
      });
    });
  }

  function restaurarItemHistorialHipo(item) {
    subtabHipotesisActiva = item.subtab;
    tipoColaActiva = item.cola;
    nivelAlpha = item.alpha;

    // Sincronizar subtabs UI
    hipoSubtabBtns.forEach(b => {
      const activo = b.getAttribute('data-subtab') === subtabHipotesisActiva;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-selected', activo ? 'true' : 'false');
    });
    hipoPanelMedia.hidden = subtabHipotesisActiva !== 'media';
    hipoPanelProporcion.hidden = subtabHipotesisActiva !== 'proporcion';
    hipoPanelDosMedias.hidden = subtabHipotesisActiva !== 'dos-medias';

    // Sincronizar cola
    hipoColaBtns.forEach(b => {
      const activo = b.getAttribute('data-cola') === tipoColaActiva;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-checked', activo ? 'true' : 'false');
    });

    // Sincronizar alpha
    inputAlpha.value = nivelAlpha.toString();
    inputConfianza.value = ((1 - nivelAlpha) * 100).toFixed(1);
    sincronizarAlphaSegmented(nivelAlpha);

    // Restaurar campos
    if (item.subtab === 'media' && item.valores) {
      inputMediaMu0.value = item.valores.mu0;
      inputMediaXbar.value = item.valores.xbar;
      inputMediaN.value = item.valores.n;
      inputMediaDispVal.value = item.valores.disp;
      origenDispMedia = item.valores.origen || 'poblacional';
      formatoDispMedia = item.valores.tipoDisp || 'desviacion';

      mediaOrigenBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-origen') === origenDispMedia));
      mediaTipoDispBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tipo-disp') === formatoDispMedia));
    } else if (item.subtab === 'proporcion' && item.valores) {
      inputPropP0.value = item.valores.p0Pct || (item.valores.p0 * 100);
      inputPropN.value = item.valores.n;
      inputPropObsVal.value = item.valores.xObs;
      chkPropComplemento.checked = !!item.valores.complemento;
    } else if (item.subtab === 'dos-medias' && item.valores) {
      inputM1Xbar.value = item.valores.x1;
      inputM1DispVal.value = item.valores.s1;
      inputM1N.value = item.valores.n1;
      inputM2Xbar.value = item.valores.x2;
      inputM2DispVal.value = item.valores.s2;
      inputM2N.value = item.valores.n2;
      inputDosMediasD0.value = item.valores.d0 || 0;
    }

    actualizarSmartBadgesHipo();
    ejecutarCalculoHipotesis();
  }

  // Presets de Casos Reales
  function cargarPresetHipo(key) {
    const p = HIPO_PRESETS[key];
    if (!p) return;

    subtabHipotesisActiva = p.subtab;
    tipoColaActiva = p.cola;
    nivelAlpha = p.alpha;

    // Subtabs
    hipoSubtabBtns.forEach(b => {
      const activo = b.getAttribute('data-subtab') === subtabHipotesisActiva;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-selected', activo ? 'true' : 'false');
    });
    hipoPanelMedia.hidden = subtabHipotesisActiva !== 'media';
    hipoPanelProporcion.hidden = subtabHipotesisActiva !== 'proporcion';
    hipoPanelDosMedias.hidden = subtabHipotesisActiva !== 'dos-medias';

    // Cola
    hipoColaBtns.forEach(b => {
      const activo = b.getAttribute('data-cola') === tipoColaActiva;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-checked', activo ? 'true' : 'false');
    });

    // Alpha
    inputAlpha.value = p.alpha.toString();
    inputConfianza.value = ((1 - p.alpha) * 100).toFixed(0);
    sincronizarAlphaSegmented(p.alpha);

    if (p.subtab === 'media') {
      inputMediaMu0.value = p.mu0;
      inputMediaXbar.value = p.xbar;
      inputMediaN.value = p.n;
      inputMediaDispVal.value = p.dispVal;
      origenDispMedia = p.origen;
      formatoDispMedia = p.tipoDisp;

      mediaOrigenBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-origen') === origenDispMedia));
      mediaTipoDispBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tipo-disp') === formatoDispMedia));
      mediaDispLabel.innerHTML = 'Valor de la Desviación Estándar <span class="param-symbol">(σ o s)</span>';
    } else if (p.subtab === 'proporcion') {
      inputPropP0.value = p.p0;
      inputPropN.value = p.n;
      modoObsProporcion = p.modoObs;
      inputPropObsVal.value = p.obsVal;
      chkPropComplemento.checked = !!p.complemento;

      propModoBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-modo-obs') === modoObsProporcion));
      propObsLabel.innerHTML = 'Casos Observados en la Muestra <span class="param-symbol">(x)</span>';
      propObsSuffix.textContent = 'casos';
    } else if (p.subtab === 'dos-medias') {
      inputM1Xbar.value = p.m1Xbar;
      formatoDispM1 = p.m1Tipo;
      inputM1DispVal.value = p.m1Disp;
      inputM1N.value = p.m1N;

      inputM2Xbar.value = p.m2Xbar;
      formatoDispM2 = p.m2Tipo;
      inputM2DispVal.value = p.m2Disp;
      inputM2N.value = p.m2N;
      inputDosMediasD0.value = p.d0;

      m1DispTipoBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-m1-tipo') === formatoDispM1));
      m2DispTipoBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-m2-tipo') === formatoDispM2));
    }

    actualizarStatusBarHipotesis();
    actualizarSmartBadgesHipo();
    ejecutarCalculoHipotesis();
    mostrarToast(`Ejemplo cargado: ${p.nombre}`);
  }

  function sincronizarAlphaSegmented(alpha) {
    let encontrado = false;
    hipoAlphaBtns.forEach(b => {
      const btnVal = b.getAttribute('data-alpha');
      if (btnVal !== 'custom') {
        const matches = Math.abs(parseFloat(btnVal) - alpha) < 0.001;
        b.classList.toggle('active', matches);
        b.setAttribute('aria-checked', matches ? 'true' : 'false');
        if (matches) encontrado = true;
      }
    });

    const customBtn = document.querySelector('#hipo-segmented-alpha .segment-btn[data-alpha="custom"]');
    if (customBtn) {
      customBtn.classList.toggle('active', !encontrado);
      customBtn.setAttribute('aria-checked', !encontrado ? 'true' : 'false');
    }
  }

  // Copiado de Resumen
  function copiarResumenHipotesis() {
    if (!ultimoCalculoHipo) return;
    const txt = generarProcedimientoTextoHipo(ultimoCalculoHipo);
    copiarTextoPortapapeles(txt, () => {
      copyBtnTextHipo.textContent = 'Copiado';
      copyIconHipo.innerHTML = '<polyline points="20 6 9 17 4 12"></polyline>';
      setTimeout(() => {
        copyBtnTextHipo.textContent = 'Copiar';
        copyIconHipo.innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
      }, 2000);
    });
  }

  function copiarProcedimientoHipoTexto() {
    if (!ultimoCalculoHipo) return;
    const txt = generarProcedimientoTextoHipo(ultimoCalculoHipo);
    copiarTextoPortapapeles(txt, () => {
      mostrarToast('Resumen en texto plano copiado al portapapeles');
    });
  }

  // ==========================================================================
  // Escuchadores de Eventos
  // ==========================================================================

  // Pestañas
  tabBtnMuestra.addEventListener('click', () => cambiarModulo('muestra'));
  tabBtnDesviacion.addEventListener('click', () => cambiarModulo('desviacion'));
  tabBtnInterpolacion.addEventListener('click', () => cambiarModulo('interpolacion'));
  tabBtnHipotesis.addEventListener('click', () => cambiarModulo('hipotesis'));

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

  // ==========================================================================
  // Eventos Módulo 4: Pruebas de Hipótesis
  // ==========================================================================
  if (formHipotesis) {
    formHipotesis.addEventListener('submit', function (ev) {
      ev.preventDefault();
      ejecutarCalculoHipotesis();
    });
  }

  // Subpestañas de Hipótesis (Media, Proporción, Dos Medias)
  hipoSubtabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hipoSubtabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      subtabHipotesisActiva = btn.getAttribute('data-subtab');
      hipoPanelMedia.hidden = subtabHipotesisActiva !== 'media';
      hipoPanelProporcion.hidden = subtabHipotesisActiva !== 'proporcion';
      hipoPanelDosMedias.hidden = subtabHipotesisActiva !== 'dos-medias';

      actualizarStatusBarHipotesis();
      actualizarSmartBadgesHipo();
      ejecutarCalculoHipotesis();
    });
  });

  // Selector de Cola / Sentido de la Hipótesis
  hipoColaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      hipoColaBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      tipoColaActiva = btn.getAttribute('data-cola');
      ejecutarCalculoHipotesis();
    });
  });

  // Selector Segmentado de Nivel de Significancia / Confianza
  hipoAlphaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const alphaVal = btn.getAttribute('data-alpha');
      if (alphaVal === 'custom') {
        inputAlpha.focus();
        return;
      }

      hipoAlphaBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      nivelAlpha = parseFloat(alphaVal);
      inputAlpha.value = nivelAlpha.toString();
      inputConfianza.value = ((1 - nivelAlpha) * 100).toFixed(nivelAlpha === 0.001 ? 2 : (nivelAlpha === 0.025 ? 1 : 0));
      ejecutarCalculoHipotesis();
    });
  });

  // Inputs enlazados de Confianza y Alpha
  inputConfianza.addEventListener('input', () => {
    const confVal = parseFloat(inputConfianza.value);
    if (!isNaN(confVal) && confVal > 50 && confVal < 100) {
      nivelAlpha = Math.round((1 - confVal / 100) * 10000) / 10000;
      inputAlpha.value = nivelAlpha.toString();
      sincronizarAlphaSegmented(nivelAlpha);
      ejecutarCalculoHipotesis();
    }
  });

  inputAlpha.addEventListener('input', () => {
    const aVal = parseFloat(inputAlpha.value);
    if (!isNaN(aVal) && aVal > 0 && aVal < 0.5) {
      nivelAlpha = aVal;
      inputConfianza.value = (Math.round((1 - aVal) * 10000) / 100).toString();
      sincronizarAlphaSegmented(nivelAlpha);
      ejecutarCalculoHipotesis();
    }
  });

  // Submódulo A: Una Media
  mediaOrigenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mediaOrigenBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      origenDispMedia = btn.getAttribute('data-origen');
      actualizarSmartBadgesHipo();
      ejecutarCalculoHipotesis();
    });
  });

  mediaTipoDispBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      mediaTipoDispBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      formatoDispMedia = btn.getAttribute('data-tipo-disp');
      if (formatoDispMedia === 'varianza') {
        mediaDispLabel.innerHTML = 'Valor de la Varianza <span class="param-symbol">(σ² o s²)</span>';
      } else {
        mediaDispLabel.innerHTML = 'Valor de la Desviación Estándar <span class="param-symbol">(σ o s)</span>';
      }
      actualizarSmartBadgesHipo();
      ejecutarCalculoHipotesis();
    });
  });

  [inputMediaMu0, inputMediaXbar, inputMediaN, inputMediaDispVal].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('input-invalid');
      actualizarSmartBadgesHipo();
      if (validarFormularioHipotesis()) {
        ejecutarCalculoHipotesis();
      }
    });
  });

  // Submódulo B: Una Proporción
  propModoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      propModoBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      modoObsProporcion = btn.getAttribute('data-modo-obs');
      if (modoObsProporcion === 'porcentaje') {
        propObsLabel.innerHTML = 'Porcentaje de Éxito Muestral <span class="param-symbol">(p̂)</span>';
        propObsSuffix.textContent = '%';
        if (parseFloat(inputPropObsVal.value) > 100) {
          inputPropObsVal.value = '35';
        }
      } else {
        propObsLabel.innerHTML = 'Casos Observados en la Muestra <span class="param-symbol">(x)</span>';
        propObsSuffix.textContent = 'casos';
      }
      actualizarSmartBadgesHipo();
      ejecutarCalculoHipotesis();
    });
  });

  if (chkPropComplemento) {
    chkPropComplemento.addEventListener('change', () => {
      actualizarSmartBadgesHipo();
      ejecutarCalculoHipotesis();
    });
  }

  [inputPropP0, inputPropN, inputPropObsVal].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('input-invalid');
      actualizarSmartBadgesHipo();
      if (validarFormularioHipotesis()) {
        ejecutarCalculoHipotesis();
      }
    });
  });

  // Submódulo C: Dos Medias
  m1DispTipoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      m1DispTipoBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      formatoDispM1 = btn.getAttribute('data-m1-tipo');
      m1DispLabel.innerHTML = formatoDispM1 === 'varianza' 
        ? 'Varianza (s₁² o σ₁²)' 
        : 'Desviación estándar (s₁ o σ₁)';
      ejecutarCalculoHipotesis();
    });
  });

  m2DispTipoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      m2DispTipoBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      formatoDispM2 = btn.getAttribute('data-m2-tipo');
      m2DispLabel.innerHTML = formatoDispM2 === 'varianza' 
        ? 'Varianza (s₂² o σ₂²)' 
        : 'Desviación estándar (s₂ o σ₂)';
      ejecutarCalculoHipotesis();
    });
  });

  [inputM1Xbar, inputM1DispVal, inputM1N, inputM2Xbar, inputM2DispVal, inputM2N, inputDosMediasD0].forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('input-invalid');
      if (validarFormularioHipotesis()) {
        ejecutarCalculoHipotesis();
      }
    });
  });

  // Chips de Presets (Casos de Estudio Reales)
  hipoPresetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const presetKey = chip.getAttribute('data-hipo-preset');
      hipoPresetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      cargarPresetHipo(presetKey);
    });
  });

  // Acciones y Botones
  if (btnResetHipo) {
    btnResetHipo.addEventListener('click', () => {
      cargarPresetHipo('calidad-media-z');
      mostrarToast('Parámetros de prueba restablecidos');
    });
  }

  if (btnCopiarHipo) {
    btnCopiarHipo.addEventListener('click', copiarResumenHipotesis);
  }

  if (btnCopiarResumenTexto) {
    btnCopiarResumenTexto.addEventListener('click', copiarProcedimientoHipoTexto);
  }

  if (btnLimpiarHistorialHipo) {
    btnLimpiarHistorialHipo.addEventListener('click', () => {
      try {
        localStorage.removeItem(STORAGE_HIPO_HISTORY_KEY);
        renderizarHistorialHipo();
        mostrarToast('Historial de pruebas de hipótesis vaciado');
      } catch (e) {
        // Ignorar
      }
    });
  }

  // Redimensionamiento de ventana (Debounce)
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (moduloActivo === 'desviacion') {
        dibujarGraficoEstadistico();
      } else if (moduloActivo === 'interpolacion') {
        dibujarGraficoInterpolacion();
      } else if (moduloActivo === 'hipotesis') {
        dibujarCampanaHipotesis();
      }
    }, 120);
  });

  // ==========================================================================
  // Inicialización
  // ==========================================================================
  inicializarTema();
  renderizarHistorial();
  renderizarHistorialInterp();
  renderizarHistorialHipo();
  actualizarSmartBadgesHipo();
  ejecutarCalculoMuestra();
  ejecutarCalculoDesviacion();
  ejecutarCalculoInterpolacion();
  ejecutarCalculoHipotesis();
})();

