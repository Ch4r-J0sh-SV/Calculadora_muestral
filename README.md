# Calculadora Estadística — Muestra y Dispersión

Herramienta web interactiva para estadística inferencial y descriptiva. Incluye dos módulos principales: determinación del tamaño muestral para poblaciones finitas y análisis comparativo de dispersión (desviación estándar poblacional y muestral) con gráficos nativos en Canvas.

Enlace público en GitHub Pages: [https://ch4r-j0sh-sv.github.io/Calculadora_muestral/](https://ch4r-j0sh-sv.github.io/Calculadora_muestral/)

---

## 1. Novedades de la Versión V0.4 (Módulo de Dispersión & Gráficos)

Esta versión amplía la calculadora con un módulo de análisis de dispersión y un motor gráfico nativo sin librerías externas:

- **Arquitectura de Pestañas macOS (*Segmented Toolbar*):** Permite alternar instantáneamente entre el módulo de *Tamaño de Muestra* y el de *Desviación Estándar*, preservando el estado de los cálculos, la accesibilidad de teclado (`role="tab"`) y la reactividad del modo oscuro/claro.
- **Motor Estadístico Dual (Población vs. Muestra):**
  - **Desviación Estándar Muestral ($s$):** Aplica la corrección de Bessel dividiendo entre $n - 1$ para proporcionar un estimador insesgado de la varianza poblacional.
  - **Desviación Estándar Poblacional ($\sigma$):** Cálculo directo dividiendo entre $N$ cuando se dispone del censo total de los datos.
  - **Métricas complementarias:** Varianza muestral y poblacional ($s^2, \sigma^2$), suma de cuadrados de desviaciones ($SS$), error estándar de la media ($SE = s / \sqrt{n}$), coeficiente de variación ($CV$) y rango muestral.
  - **Análisis de Bessel explícito:** Cuantificación del factor $\sqrt{n / (n - 1)}$ y del incremento porcentual de variabilidad asignable al sesgo muestral.
- **Gráficos Interactivos en HTML5 Canvas (0 dependencias):**
  - **Campana de Gauss (Distribución Normal):** Curva de densidad paramétrica centrada en la media con áreas sombreadas para las zonas empíricas ($\pm 1\sigma = 68.3\%$, $\pm 2\sigma = 95.4\%$, $\pm 3\sigma = 99.7\%$), selector para comparar curvas y proyección de los datos observados en la base (*strip plot*).
  - **Diagrama de Dispersión & Bandas:** Representa cada observación individual, su conector residual a la media y las bandas de tolerancia $\pm 1s$ y $\pm 1\sigma$.
  - **Soporte HiDPI / Retina:** Escalado automático mediante `window.devicePixelRatio` para garantizar trazos nítidos en monitores 4K/5K y pantallas móviles.
  - **Tema dinámico:** Los colores de ejes, rejillas, etiquetas y curvas se recalculan en tiempo real al cambiar entre modo oscuro y claro.
- **Parser Flexible de Entrada:** Procesa series numéricas separadas por comas, espacios, tabulaciones o saltos de línea (ideal para pegar columnas de Excel, CSV o Google Sheets).
- **Desglose Algebraico Paso a Paso:** Tabla detallada con las diferencias individuales $(x_i - \bar{x})$ y sus cuadrados $(x_i - \bar{x})^2$, junto con la fila de sumatorias.
- **Presets de Prueba Rápida:** Carga de series de ejemplo con un clic (Calificaciones, Tiempos de respuesta, Pesos en gramos).

---

## 2. Fundamentación Matemática

### 2.1 Tamaño de Muestra para Población Finita (Proporciones)

Para una población conocida $N$, la fórmula de muestreo probabilístico simple para estimación de proporciones es:

$$n = \frac{N \cdot Z^2 \cdot p(1-p)}{e^2(N-1) + Z^2 \cdot p(1-p)}$$

Con redondeo estricto hacia arriba (función techo):

$$n_{\text{final}} = \min\left(\lceil n \rceil, N\right)$$

### 2.2 Desviación Estándar Poblacional vs. Muestral

Dado un conjunto de datos $\{x_1, x_2, \dots, x_n\}$ con media aritmética $\bar{x} = \mu = \frac{1}{n}\sum_{i=1}^n x_i$:

#### Desviación Estándar Poblacional ($\sigma$)
Aplica cuando los datos representan la totalidad del universo delimitado:

$$\sigma = \sqrt{\frac{\sum_{i=1}^N (x_i - \mu)^2}{N}}$$

#### Desviación Estándar Muestral ($s$)
Aplica cuando los datos provienen de una muestra y se busca inferir el comportamiento de la población. La división entre $n - 1$ (**corrección de Bessel**) corrige la tendencia natural a subestimar la varianza debida a que los datos están sistemáticamente más cerca de la media muestral $\bar{x}$ que de la media poblacional real $\mu$:

$$s = \sqrt{\frac{\sum_{i=1}^n (x_i - \bar{x})^2}{n - 1}}$$

#### Relación y Factor de Bessel

$$s = \sigma \cdot \sqrt{\frac{n}{n - 1}}$$

A medida que $n$ aumenta, $\sqrt{n / (n - 1)} \to 1$, reduciendo la brecha entre el estimador muestral y el poblacional.

---

## 3. Estructura del Proyecto

```
Calculadora muestral/
├── index.html      # Estructura semántica, tabs macOS y módulos de cálculo
├── styles.css      # Sistema de diseño Apple (Vibrancy, dark mode, canvas responsive)
├── script.js       # Motores matemáticos, parser de series, gráficos canvas y portapapeles
└── README.md       # Documentación técnica del proyecto
```

**Filosofía:** Cero dependencias externas o paquetes npm (100% vanilla HTML5, CSS3 moderno y JavaScript ES6+).

---

## 4. Historial de Versiones y Ramas Git

- **`main`:** Versión actual **V0.4** con módulo de desviación estándar, gráficos interactivos en Canvas y navegación modular.
- **`v0.3-respaldo` / `v0.3`:** Rama con la versión **V0.3** (rediseño completo estilo Apple macOS/iOS).
- **`v0.2-respaldo` / `v0.2`:** Rama con la versión **V0.2** (interfaz académica sobria).
- **`v0.1-respaldo`:** Rama con la versión inicial **V0.1**.

---

## 5. Uso Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Ch4r-J0sh-SV/Calculadora_muestral.git
   ```
2. Entra al directorio:
   ```bash
   cd "Calculadora muestral"
   ```
3. Abre `index.html` en el navegador, o levanta un servidor estático:
   ```bash
   python3 -m http.server 8000
   ```
   Abre [http://localhost:8000](http://localhost:8000).

---

## 6. Despliegue en GitHub Pages

Los despliegues en GitHub Pages se sincronizan automáticamente desde la rama `main`:

```bash
git add .
git commit -m "V0.4: Módulo de desviación estándar poblacional y muestral con gráficos interactivos"
git push origin main
```
