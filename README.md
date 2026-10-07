# Calculadora Estadística — Suite de Inferencia y Decisión (V1.0)

Herramienta web interactiva para estadística descriptiva, diseño muestral e **inferencia estadística paramétrica**. Diseñada con la estética nativa y pulida de **Apple macOS / iOS**, 100% Vanilla (sin frameworks ni dependencias externas), con soporte completo para modo claro/oscuro y gráficos de alta resolución en Retina Canvas.

Enlace público en GitHub Pages: [https://ch4r-j0sh-sv.github.io/Calculadora_muestral/](https://ch4r-j0sh-sv.github.io/Calculadora_muestral/)

---

## 1. Novedades de la Versión V1.0 («Pruebas de Hipótesis Paramétricas»)

Esta versión transforma la aplicación de un estimador de tamaño de muestra a una **suite práctica de toma de decisiones estadísticas bajo incertidumbre**, ideal para control de calidad, marketing, SLA de operaciones, A/B testing, finanzas y evaluaciones académicas.

### 1.1 Módulos de Contraste Soportados
1. **Una Media ($\mu$) — Selector Inteligente $Z$ vs $t$ de Student:**
   - Detecta automáticamente la distribución adecuada:
     - **Distribución $Z$:** Si la desviación estándar poblacional ($\sigma$) es conocida, o si el tamaño muestral $n \ge 30$ (Teorema del Límite Central).
     - **Distribución $t$ de Student:** Si la dispersión es muestral ($s$) y la muestra es pequeña ($n < 30$), calculando los grados de libertad $\nu = n - 1$.
   - **Toggle de Dispersión:** Permite ingresar indistintamente **Desviación Estándar ($\sigma$ o $s$)** o **Varianza ($\sigma^2$ o $s^2$)**, previniendo las confusiones clásicas en problemas aplicados.
2. **Una Proporción ($p$) — Tasas de Éxito y Conversión:**
   - Admite ingreso directo de **Casos Observados ($x$)** o **Porcentaje muestral ($\hat{p}$)** (ej. "105 de 300" o "35%").
   - **Interruptor de «Complemento»:** Para ejercicios y auditorías con datos en negativo (ej. *"348 no tuvieron reclamos"* frente a la hipótesis *"tasa de reclamos"*), invierte con un clic los casos ($x' = n - x$) o el porcentaje.
   - **Comprobación de Normalidad Binomial:** Valida automáticamente si $np_0 \ge 5$ y $n(1 - p_0) \ge 5$.
3. **Comparación de Dos Medias ($\mu_1 - \mu_2$) — A/B Testing:**
   - Diseñado para contrastes directos (caja tradicional vs. rápida, proceso manual vs. automatizado, app vieja vs. nueva).
   - Calcula el error estándar combinado $\sigma_D = \sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}$.
   - Grados de libertad corregidos por aproximación de Welch-Satterthwaite para muestras independientes con varianzas desiguales.

### 1.2 Herramientas de Usabilidad y Prevención de Errores
- **Selector de Sentido / Cola en Lenguaje Cotidiano:**
  - **Bilateral ($\neq$):** *«¿Ha cambiado? / ¿Difiere? / ¿Lleva razón?»*
  - **Cola Izquierda ($<$):** *«¿Se redujo? / ¿Es menor que? / Garantiza al menos...»*
  - **Cola Derecha ($>$):** *«¿Aumentó? / ¿Supera? / Como máximo...»*
- **Selectores Enlazados de Confianza ($1-\alpha$) y Significancia ($\alpha$):**
  - Botones segmentados de acceso rápido ($10\%$, $5\%$, $2.5\%$, $1\%$, $0.1\%$) y campos numéricos sincronizados para evitar confusiones de digitación.
- **Doble Criterio de Decisión Simultáneo:**
  - **Criterio de Valor Crítico (Tabla):** Muestra el estadístico de tabla exacto ($Z_{\text{crit}}$ o $t_{\text{crit}}$) y los grados de libertad.
  - **Criterio de $p$-valor:** Cálculo exacto del valor $p$ para auditorías profesionales, Six Sigma y analítica moderna.
- **Generador de Conclusión Ejecutiva y de Negocio:**
  - **Decisión Técnica Formal:** Veredicto explícito de rechazo o no rechazo de $H_0$ al nivel $\alpha$.
  - **Recomendación Accionable de Negocio:** Traducción práctica de la evidencia estadística (recomendar adopción de cambios o mantener el statu quo si la variación es atribuible al azar).
- **Campana Dinámica de Gauss / Student en Canvas Retina:**
  - Visualización interactiva en tiempo real.
  - Zona central sombreada en azul para la **Región de No Rechazo ($1 - \alpha$)**.
  - Colas sombreadas en rojo vibrante para la **Región de Rechazo ($\alpha$)**.
  - Líneas divisorias punteadas en los valores críticos.
  - **Aguja y marcador flotante (Pill Badge):** Indica la posición exacta del estadístico calculado ($Z_{\text{cal}}$ o $t_{\text{cal}}$), cambiando dinámicamente de color si cae en zona de aceptación o rechazo.
- **Desglose Metodológico de 5 Pasos y Resumen Copiable:**
  - Tarjetas paso a paso: Planteamiento de hipótesis ($H_0$ y $H_1$), nivel de significancia, estadístico de prueba, regla de decisión y conclusión final.
  - Caja monoespaciada de texto plano lista para copiar con un clic.
- **Presets de Casos Reales:**
  - Acceso directo a ejemplos típicos: Control de Calidad en Envasado ($Z$), Resistencia de Materiales ($t$), SLA de Reclamos en Call Center (Proporciones) y A/B Testing de Cajas de Pago (Dos Medias).

---

## 2. Fundamentación Matemática del Módulo de Hipótesis

### 2.1 Una Media Poblacional ($\mu$)

$$Z_{\text{cal}} = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}} \quad (\text{si } \sigma \text{ es conocida o } n \ge 30)$$

$$t_{\text{cal}} = \frac{\bar{x} - \mu_0}{s / \sqrt{n}} \quad (\text{si } \sigma \text{ es desconocida y } n < 30, \; \nu = n - 1)$$

### 2.2 Una Proporción Poblacional ($p$)

$$Z_{\text{cal}} = \frac{\hat{p} - p_0}{\sqrt{\frac{p_0(1 - p_0)}{n}}}$$

### 2.3 Dos Medias Independientes ($\mu_1 - \mu_2$)

$$Z_{\text{cal}} \text{ o } t_{\text{cal}} = \frac{(\bar{x}_1 - \bar{x}_2) - \delta_0}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}$$

Para muestras pequeñas ($n_1 < 30$ o $n_2 < 30$), los grados de libertad se calculan mediante la fórmula de Welch-Satterthwaite:

$$\nu = \frac{\left(\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}\right)^2}{\frac{(s_1^2/n_1)^2}{n_1 - 1} + \frac{(s_2^2/n_2)^2}{n_2 - 1}}$$

### 2.4 Algoritmos de Precisión Numérica (Sin librerías externas)
- **Distribución Normal Estándar Inversa:** Algoritmo min-max rational de Peter J. Acklam con error absoluto $< 1.15 \times 10^{-9}$.
- **Distribución $t$ de Student Acumulada ($CDF$):** Implementación de la función Beta incompleta regularizada $I_x(a, b)$ mediante fracción continua de Lentz y aproximación de Lanczos para $\ln \Gamma(x)$.
- **Cuantiles Críticos $t$ de Student Inversa:** Algoritmo Newton-Raphson de alta convergencia sobre $I_x(a, b)$ con tolerancia $< 10^{-12}$.

---

## 3. Módulos Adicionales Incluidos

### 3.1 Tamaño de Muestra para Población Finita (Proporciones)
Determina el tamaño muestral $n$ minimizando errores y costos:

$$n = \frac{N \cdot Z^2 \cdot p(1-p)}{e^2(N-1) + Z^2 \cdot p(1-p)}, \quad n_{\text{final}} = \min(\lceil n \rceil, N)$$

### 3.2 Desviación Estándar y Dispersión
Calcula y compara la desviación estándar poblacional ($\sigma$) y muestral ($s$ con corrección de Bessel $n-1$), acompañada de gráficos de campana de Gauss centrada en la media o diagramas de dispersión de puntos.

### 3.3 Interpolación Lineal para Tablas Estadísticas
Aproximación por segmento para buscar cuantiles no tabulados en tablas $Z$, $t$, $\chi^2$ o $F$:

$$X = X_1 + \left( \frac{X_2 - X_1}{Y_2 - Y_1} \right) \cdot (Y - Y_1)$$

---

## 4. Estructura del Proyecto

```
Calculadora muestral/
├── index.html      # Estructura semántica, tabs macOS y formularios de cálculo
├── styles.css      # Sistema de diseño Apple (Vibrancy, dark mode, canvas responsive)
├── script.js       # Motores de inferencia, canvas retina, portapapeles y localStorage
└── README.md       # Documentación técnica completa
```

**Filosofía:** Cero dependencias externas o paquetes npm (100% vanilla HTML5, CSS3 moderno y JavaScript ES6+).

---

## 5. Historial de Versiones y Ramas Git

- **`main`:** Versión **V1.0** — Suite completa de inferencia estadística paramétrica, pruebas de hipótesis (Z, t de Student, proporciones, dos medias), campana dinámica de rechazo, doble criterio de decisión y recomendaciones de negocio.
- **`v0.5-respaldo` / `v0.5`:** Versión **V0.5** — Herramienta de interpolación lineal para tablas estadísticas.
- **`v0.4-respaldo` / `v0.4`:** Versión **V0.4** — Módulo de dispersión y desviación estándar con gráficos de campana y dispersión.
- **`v0.3-respaldo` / `v0.3`:** Versión **V0.3** — Rediseño completo estilo Apple macOS/iOS.
- **`v0.2-respaldo` / `v0.2`:** Versión **V0.2** — Interfaz académica sobria.
- **`v0.1-respaldo`:** Versión inicial **V0.1** — Calculadora de tamaño de muestra para proporciones.

---

## 6. Uso Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Ch4r-J0sh-SV/Calculadora_muestral.git
   ```
2. Entra al directorio:
   ```bash
   cd "Calculadora muestral"
   ```
3. Abre `index.html` en el navegador, o inicia un servidor estático:
   ```bash
   python3 -m http.server 8000
   ```
   Abre [http://localhost:8000](http://localhost:8000).

---

## 7. Despliegue en GitHub Pages

Los cambios en la rama `main` se publican automáticamente:

```bash
git add .
git commit -m "V1.0: Módulo completo de pruebas de hipótesis paramétricas"
git push origin main
```
