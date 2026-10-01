# Calculadora Estadística — Muestra, Dispersión e Interpolación Lineal

Herramienta web interactiva para estadística inferencial y descriptiva. Incluye tres módulos principales: determinación del tamaño muestral para poblaciones finitas, análisis comparativo de dispersión (desviación estándar poblacional y muestral) con gráficos nativos en Canvas, y una herramienta avanzada de interpolación lineal para tablas estadísticas con motor algorítmico paso a paso.

Enlace público en GitHub Pages: [https://ch4r-j0sh-sv.github.io/Calculadora_muestral/](https://ch4r-j0sh-sv.github.io/Calculadora_muestral/)

---

## 1. Novedades de la Versión V0.5 (Módulo de Interpolación Lineal)

Esta versión amplía la calculadora con un módulo de interpolación lineal optimizado para la consulta de cuantiles y valores críticos en tablas estadísticas:

- **Estructura UI Nativa estilo macOS / iOS:**
  - Formulario con 5 campos de entrada numéricos:
    - **Valor X1:** Primer límite de la variable objetivo / incógnita.
    - **Valor Y1:** Primer límite del valor conocido en la tabla.
    - **Valor X2:** Segundo límite de la variable objetivo / incógnita.
    - **Valor Y2:** Segundo límite del valor conocido en la tabla.
    - **Valor Y a buscar:** El punto medio o valor específico conocido.
  - Botón de acción **"Calcular"**, botón de **"Restablecer"** y botón rápido **"Invertir X ⇄ Y"**.
  - Contenedor de salida destacado con el **"Resultado de X"**.
- **Lógica de Validación Rigurosa:**
  - Verifica que los 5 campos estén completos y contengan únicamente valores numéricos.
  - Comprueba que $Y_2$ sea estrictamente diferente a $Y_1$. Si son iguales, detiene la ejecución y despliega la alerta oficial:
    `"Error: Los valores de Y1 y Y2 no pueden ser iguales (evita división por cero)"`.
- **Motor Interno de 6 Operaciones Algorítmicas:**
  - **Operación A:** Restar ($X_2 - X_1$) $\to$ *Diferencia de X*.
  - **Operación B:** Restar ($Y_2 - Y_1$) $\to$ *Diferencia de Y*.
  - **Operación C:** Restar ($Y_{\text{buscar}} - Y_1$) $\to$ *Diferencia Objetivo*.
  - **Operación D:** Multiplicar (*Diferencia de X* $\cdot$ *Diferencia Objetivo*).
  - **Operación E:** Dividir el resultado de la *Operación D* entre la *Diferencia de Y*.
  - **Operación F (Resultado Final):** Sumar el *Valor X1* con el resultado de la *Operación E*.
- **Presentación del Resultado y Redondeo Dinámico:**
  - Muestra el valor de $X$ con selector dinámico de precisión (4 decimales por defecto para tablas estadísticas, 3 decimales, 2 decimales o valor exacto sin redondear).
  - Desglose con tarjetas individuales para cada una de las 6 operaciones matemáticas.
  - **Procedimiento de reemplazo en texto plano:** Bloque monoespaciado listo para validar el procedimiento y botón de copiado con un solo clic para pegar en reportes y tareas.
- **Gráfico Cartesiano Interactivo en Canvas Retina:**
  - Representación del segmento entre $(X_1, Y_1)$ y $(X_2, Y_2)$ con las proyecciones ortogonales punteadas al punto interpolado $(X, Y)$ en el plano cartesiano.
- **Presets de Tablas Estadísticas:**
  - Carga inmediata de casos reales: Distribución t de Student ($gl=14, p=0.035$), Distribución Normal Estándar Z (área = 0.9760), Chi-Cuadrado ($gl=10$) y ejemplo base.
- **Historial Local:**
  - Almacena las últimas interpolaciones en `localStorage` con fecha y permite restaurar parámetros con un clic.

---

## 2. Fundamentación Matemática

### 2.1 Interpolación Lineal para Tablas Estadísticas

Dadas dos parejas de valores conocidos $(X_1, Y_1)$ y $(X_2, Y_2)$, para un valor conocido $Y$ situado en el intervalo, la aproximación por segmento recto determina el valor correspondiente $X$:

$$X = X_1 + \left( \frac{X_2 - X_1}{Y_2 - Y_1} \right) \cdot (Y - Y_1)$$

Desglosado en el algoritmo interno de 6 operaciones:

1. $\Delta X = X_2 - X_1$
2. $\Delta Y = Y_2 - Y_1 \quad (\Delta Y \neq 0)$
3. $\Delta Y_{\text{obj}} = Y - Y_1$
4. $\text{Producto} = \Delta X \cdot \Delta Y_{\text{obj}}$
5. $\text{Cociente} = \frac{\text{Producto}}{\Delta Y}$
6. $X_{\text{final}} = X_1 + \text{Cociente}$

### 2.2 Tamaño de Muestra para Población Finita (Proporciones)

Para una población conocida $N$, la fórmula de muestreo probabilístico simple para estimación de proporciones es:

$$n = \frac{N \cdot Z^2 \cdot p(1-p)}{e^2(N-1) + Z^2 \cdot p(1-p)}$$

Con redondeo estricto hacia arriba (función techo):

$$n_{\text{final}} = \min\left(\lceil n \rceil, N\right)$$

### 2.3 Desviación Estándar Poblacional vs. Muestral

Dado un conjunto de datos $\{x_1, x_2, \dots, x_n\}$ con media aritmética $\bar{x} = \mu = \frac{1}{n}\sum_{i=1}^n x_i$:

#### Desviación Estándar Poblacional ($\sigma$)
Aplica cuando los datos representan la totalidad del universo delimitado:

$$\sigma = \sqrt{\frac{\sum_{i=1}^N (x_i - \mu)^2}{N}}$$

#### Desviación Estándar Muestral ($s$)
Aplica cuando los datos provienen de una muestra y se busca inferir el comportamiento de la población. La división entre $n - 1$ (**corrección de Bessel**) corrige la tendencia natural a subestimar la varianza:

$$s = \sqrt{\frac{\sum_{i=1}^n (x_i - \bar{x})^2}{n - 1}}$$

#### Relación y Factor de Bessel

$$s = \sigma \cdot \sqrt{\frac{n}{n - 1}}$$

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

- **`main`:** Versión actual **V0.5** con herramienta de interpolación lineal, módulo de desviación estándar, gráficos interactivos en Canvas y determinación de tamaño muestral.
- **`v0.4-respaldo` / `v0.4`:** Rama con la versión **V0.4** (módulo de desviación estándar y gráficos interactivos).
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
git commit -m "V0.5: Herramienta de interpolación lineal para tablas estadísticas"
git push origin main
```
