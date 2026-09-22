# Calculadora de Tamaño de Muestra para Poblaciones Finitas

Una herramienta web estática, rigurosa y académica para determinar el tamaño muestral necesario en estudios cuantitativos con poblaciones finitas y variables dicotómicas, orientada a estudiantes, docentes e investigadores.

🌐 **Demo en GitHub Pages:** [https://ch4r-j0sh-sv.github.io/Calculadora_muestral/](https://ch4r-j0sh-sv.github.io/Calculadora_muestral/)

---

## 📌 Tabla de Contenidos

1. [Objetivo y Enfoque](#objetivo-y-enfoque)
2. [Fundamentación Matemática](#fundamentación-matemática)
   - [Fórmula de Población Finita](#fórmula-de-población-finita)
   - [Definición de Parámetros](#definición-de-parámetros)
   - [Caso de Validación Paso a Paso](#caso-de-validación-paso-a-paso)
3. [Características de la Herramienta](#características-de-la-herramienta)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Ejecución en Local](#ejecución-en-local)
6. [Publicación en GitHub Pages](#publicación-en-github-pages)
7. [Licencia y Créditos](#licencia-y-créditos)

---

## 1. Objetivo y Enfoque

El objetivo central de este proyecto es proveer una calculadora confiable, transparente y de diseño sobrio (estilo instrumental académico), evitando artificios gráficos distractores. Prioriza la comprensión matemática:

- **Transparencia:** Muestra el desglose algebraico paso a paso de cada cálculo.
- **Análisis de sensibilidad:** Genera en tiempo real una matriz cruzada para evaluar cómo varía la muestra frente a distintos márgenes de error ($1\%$ a $10\%$) y niveles de confianza ($90\%$, $95\%$, $99\%$).
- **Accesibilidad y ergonomía:** Soporte para modo oscuro/claro, navegación por teclado, historial en sesión local y copiado rápido de resultados al portapapeles.

---

## 2. Fundamentación Matemática

### Fórmula de Población Finita

Cuando se conoce el tamaño total de la población $N$, la selección de elementos reduce la varianza poblacional restante. Por tanto, se utiliza la corrección para poblaciones finitas:

$$n = \frac{N \cdot Z^2 \cdot p(1-p)}{e^2(N-1) + Z^2 \cdot p(1-p)}$$

Donde el resultado final $n$ siempre se redondea **hacia arriba** mediante la función techo ($\lceil n \rceil$), asegurando que el tamaño de muestra final satisfaga o supere la cota mínima de confiabilidad exigida:

$$n_{\text{final}} = \min\left(\lceil n \rceil, N\right)$$

### Definición de Parámetros

| Símbolo | Parámetro | Rango habitual | Descripción |
|---|---|---|---|
| **$N$** | Tamaño de la población | Entero positivo $\ge 1$ | Universo o conjunto total de elementos a estudiar. |
| **$Z$** | Coeficiente de confianza | 1.645 (90%), 1.960 (95%), 2.576 (99%) | Valor crítico de la distribución normal estandarizada $N(0, 1)$ correspondiente a $1 - \alpha$. |
| **$e$** | Margen de error admisible | 0.01 a 0.10 (1% a 10%) | Diferencia máxima tolerada entre la proporción muestral y el parámetro real. |
| **$p$** | Proporción esperada | 0.01 a 0.99 (50% por defecto) | Probabilidad a priori de ocurrencia del evento. Asumir $p=0.50$ maximiza la varianza ($p(1-p)=0.25$), otorgando el tamaño más seguro y conservador. |

### Caso de Validación Paso a Paso

Tomando los parámetros de referencia:
- $N = 2{,}800$
- Margen de error $e = 5\% = 0.05 \implies e^2 = 0.0025$
- Confianza $95\% \implies Z = 1.96 \implies Z^2 = 3.8416$
- Proporción $p = 50\% = 0.50 \implies p(1-p) = 0.25$

**Paso 1: Cálculo del numerador**
$$\text{Numerador} = N \cdot Z^2 \cdot p(1-p) = 2800 \times 3.8416 \times 0.25 = 2689.12$$

**Paso 2: Cálculo del denominador**
$$\text{Término de error} = e^2 \cdot (N - 1) = 0.0025 \times 2799 = 6.9975$$
$$\text{Término de varianza} = Z^2 \cdot p(1-p) = 3.8416 \times 0.25 = 0.9604$$
$$\text{Denominador} = 6.9975 + 0.9604 = 7.9579$$

**Paso 3: Cociente y redondeo**
$$n = \frac{2689.12}{7.9579} \approx 337.9183$$
$$n_{\text{final}} = \lceil 337.9183 \rceil = \mathbf{338}\text{ individuos}$$

---

## 3. Características de la Herramienta

- 🧮 **Cálculo instantáneo:** Resultados en tiempo real con validaciones de rangos coherentes.
- 📐 **Desglose algebraico interactivo:** Detalle desplegable con sustitución de variables y valores de pasos intermedios.
- 📊 **Matriz de sensibilidad comparativa:** Tabla dinámica con resaltado de la celda activa seleccionada.
- 📋 **Copiado estructurado:** Exporta un resumen formateado listo para anexar en informes o tesis.
- 🕒 **Historial local:** Guarda los últimos 5 cálculos con opción de recargar parámetros o limpiar historial.
- 🌓 **Modo oscuro integrado:** Selector ergonómico que respeta la configuración del sistema operativo (`prefers-color-scheme`).
- 📱 **Diseño responsivo:** Optimizado tanto para dispositivos móviles como pantallas de escritorio.
- 🖨️ **Estilos para impresión:** Oculta controles de navegación para exportar informes directamente en PDF (`Ctrl + P` / `Cmd + P`).

---

## 4. Estructura del Proyecto

```
Calculadora_muestral/
│
├── index.html      # Marcado semántico accesible HTML5
├── styles.css      # Sistema de diseño sobrio en CSS vanilla (soporte light/dark)
├── script.js       # Lógica matemática, tabla interactiva, historial y DOM
└── README.md       # Documentación técnica, fórmulas y guía de publicación
```

No requiere gestores de paquetes (`npm`), frameworks pesados ni compiladores. Se ejecuta directamente en cualquier navegador moderno.

---

## 5. Ejecución en Local

Para visualizar y trabajar en la herramienta de manera local:

1. Clona o descarga el repositorio:
   ```bash
   git clone https://github.com/Ch4r-J0sh-SV/Calculadora_muestral.git
   ```
2. Abre la carpeta del proyecto:
   ```bash
   cd Calculadora_muestral
   ```
3. Abre el archivo `index.html` en tu navegador web de preferencia (doble clic o usando un servidor estático como Live Server / Python):
   ```bash
   # Opción con Python 3:
   python3 -m http.server 8000
   ```
   Luego visita `http://localhost:8000` en tu navegador.

---

## 6. Publicación en GitHub Pages

Para habilitar la versión en línea en GitHub:

1. Asegúrate de que los cambios estén subidos a la rama principal (`main`):
   ```bash
   git add .
   git commit -m "Implementación de calculadora de tamaño de muestra completa"
   git push origin main
   ```
2. En GitHub, ve a la pestaña **Settings** (Configuración) de tu repositorio `Calculadora_muestral`.
3. En la barra lateral izquierda, haz clic en **Pages**.
4. En la sección **Build and deployment** > **Source**:
   - Selecciona **Deploy from a branch**.
   - En **Branch**, elige `main` y la carpeta `/ (root)`.
   - Haz clic en **Save** (Guardar).
5. En pocos minutos, tu sitio estará accesible en:
   ```
   https://ch4r-j0sh-sv.github.io/Calculadora_muestral/
   ```

---

## 7. Licencia y Créditos

Desarrollado para el curso de **Estadística Inferencial** (V Ciclo).
Código abierto bajo licencia MIT. Libre para fines educativos, académicos y de investigación.
