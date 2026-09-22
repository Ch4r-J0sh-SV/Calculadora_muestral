# Calculadora de Tamaño de Muestra para Poblaciones Finitas

Herramienta web para determinar el tamaño muestral necesario en estudios cuantitativos con poblaciones finitas y variables dicotómicas, orientada a docencia, investigación y proyectos estadísticos.

Enlace público en GitHub Pages: [https://ch4r-j0sh-sv.github.io/Calculadora_muestral/](https://ch4r-j0sh-sv.github.io/Calculadora_muestral/)

---

## 1. Objetivo del Proyecto

Proveer una herramienta de cálculo de tamaño muestral sobria, precisa y transparente, con énfasis en el rigor metodológico y pedagógico:

- **Desglose paso a paso:** Muestra las operaciones algebraicas intermedias (numerador, denominador, corrección de población y redondeo por exceso).
- **Tabla de sensibilidad:** Calcula dinámicamente una matriz de muestras cruzando márgenes de error del 1% al 10% con los niveles de confianza del 90%, 95% y 99%.
- **Diseño académico:** Enfoque funcional sin elementos distractores ni estridencias visuales.

---

## 2. Fundamentación Matemática

### Fórmula de Población Finita

Para una población de tamaño conocido $N$, la fórmula de muestreo probabilístico simple para estimación de proporciones es:

$$n = \frac{N \cdot Z^2 \cdot p(1-p)}{e^2(N-1) + Z^2 \cdot p(1-p)}$$

El resultado final se redondea hacia arriba mediante la función techo ($\lceil n \rceil$), ya que cualquier fracción decimal exige una unidad muestral completa adicional para garantizar el margen de error y el nivel de confianza establecidos:

$$n_{\text{final}} = \min\left(\lceil n \rceil, N\right)$$

### Parámetros

| Parámetro | Símbolo | Rango / Valores | Descripción |
|---|---|---|---|
| Población | $N$ | Entero $\ge 1$ | Universo total de elementos bajo estudio. |
| Coeficiente de confianza | $Z$ | 1.645 (90%), 1.960 (95%), 2.576 (99%) | Valor crítico de la distribución normal estandarizada. |
| Margen de error | $e$ | 0.01 a 0.10 (1% a 10%) | Diferencia máxima admisible entre el estimador y el parámetro real. |
| Proporción esperada | $p$ | 0.01 a 0.99 (50% por defecto) | Probabilidad a priori del evento. $p = 0.50$ maximiza la varianza $p(1-p) = 0.25$, siendo el criterio más conservador. |

### Caso de Validación de Referencia

Parámetros:
- $N = 2{,}800$
- $e = 5\% = 0.05$
- Confianza = $95\% \implies Z = 1.96$
- $p = 50\% = 0.50$

Cálculo:
1. Numerador: $2800 \cdot (1.96)^2 \cdot (0.5)(0.5) = 2800 \cdot 3.8416 \cdot 0.25 = 2689.12$
2. Denominador: $(0.05)^2 \cdot (2799) + 3.8416 \cdot 0.25 = 6.9975 + 0.9604 = 7.9579$
3. Cociente: $2689.12 / 7.9579 \approx 337.9183$
4. Redondeo: $\lceil 337.9183 \rceil = \mathbf{338\text{ personas}}$

---

## 3. Estructura de Archivos

```
Calculadora muestral/
  index.html      # Estructura semántica del formulario, resultados y secciones
  styles.css      # Hoja de estilos (paleta institucional, modo oscuro, responsive)
  script.js       # Lógica de cálculo, tabla dinámica, historial y portapapeles
  README.md       # Documentación técnica del proyecto
```

El proyecto está construido íntegramente con HTML, CSS y JavaScript estándar (vanilla), sin dependencias externas, frameworks ni compiladores.

---

## 4. Uso Local

Para abrir el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Ch4r-J0sh-SV/Calculadora_muestral.git
   ```
2. Entra al directorio:
   ```bash
   cd "Calculadora muestral"
   ```
3. Abre `index.html` en tu navegador web, o inicia un servidor HTTP local básico:
   ```bash
   python3 -m http.server 8000
   ```
   Luego visita `http://localhost:8000`.

---

## 5. Publicación en GitHub Pages

Para actualizar o publicar el sitio en GitHub Pages:

1. Agrega y sube los cambios a la rama principal:
   ```bash
   git add .
   git commit -m "Actualizar interfaz y estilos académicos"
   git push origin main
   ```
2. En GitHub, entra a la pestaña **Settings** del repositorio.
3. En el menú izquierdo, selecciona **Pages**.
4. En **Build and deployment** > **Branch**, selecciona `main` y la carpeta `/ (root)`.
5. Guarda los cambios. El sitio quedará disponible en:
   `https://ch4r-j0sh-sv.github.io/Calculadora_muestral/`
