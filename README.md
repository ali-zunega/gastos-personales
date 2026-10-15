# 💰 Valoora — Gestión de Gastos Personales

Aplicación web frontend desarrollada como prueba técnica (Take-Home Challenge) para el registro, categorización y análisis de gastos mensuales, diseñada con una interfaz intuitiva, moderna y centrada en la experiencia de usuario.

## 🚀 Stack Tecnológico

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Enrutamiento:** [React Router DOM](https://reactrouter.com/)
- **Gráficos y Visualización:** [Recharts](https://recharts.org/)
- **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
- **Estilos:** CSS Modules / Estilos Modulares (Adaptado para componentes limpios y mantenibles)

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular y escalable orientada a la separación de responsabilidades:

```text
gastos-personales/
├── public/                  # Recursos estáticos que no requieren importación
├── src/
│   ├── api/                 # Servicios para autenticación y gestión de datos (authService.js, expenseService.js)
│   ├── components/          # Elementos reutilizables de interfaz (Button, Input, Modal, ExpenseForm, ExpenseList)
│   ├── context/             # Estado global de sesión y gastos (AuthContext.jsx, ExpensesContext.jsx)
│   ├── hooks/               # Lógica reutilizable de React (useAuth.js, useExpenses.js)
│   ├── layouts/             # Estructura compartida entre pantallas (AppLayout.jsx, AuthLayout.jsx)
│   ├── pages/               # Páginas asociadas a las rutas (LoginPage, RegisterPage, DashboardPage, ExpensesPage, NotFoundPage)
│   ├── routes/              # Configuración de rutas y protección (AppRouter.jsx, ProtectedRoute.jsx)
│   ├── utils/               # Funciones auxiliares independientes (formatCurrency.js, dateUtils.js, validators.js)
│   ├── tests/               # Pruebas unitarias y de integración (formatCurrency.test.js, ExpenseForm.test.jsx)
│   ├── App.jsx              # Componente raíz
│   ├── main.jsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── README.md                # Documentación del proyecto
├── vite.config.js           # Configuración de Vite y Vitest
└── package.json             # Dependencias y scripts del proyecto
```

## 💡 Decisiones de Diseño y Arquitectura

### 1. Gestión de Estado Global (Context API):

**Decisión**: Se estructuró el manejo de estado dividiéndolo en dominios específicos (AuthContext para la sesión del usuario y ExpensesContext para el CRUD de transacciones).

**Justificación**: Evita el "prop drilling" sin la complejidad y el boilerplate innecesario de librerías externas en una aplicación de esta escala, manteniendo la lógica desacoplada de la interfaz mediante Custom Hooks (useAuth, useExpenses).

### 2. Arquitectura y Separación de Responsabilidades:

Se implementó una capa de servicios (`src/api/`) para simular la persistencia y comunicación con una API (utilizando LocalStorage), lo que facilita una futura migración a un backend real sin modificar los componentes de UI.

Las rutas están protegidas mediante un componente dedicado (`ProtectedRoute.jsx`) para asegurar que solo usuarios autenticados accedan al panel de control y resumen financiero.

### 3. Manejo de Errores y Validaciones:

Se incorporaron validaciones robustas de entrada de datos (montos positivos, categorías válidas, campos obligatorios) y manejo de estados vacíos o errores de autenticación para garantizar una experiencia de usuario fluida y segura.

## 🛠️ Instalación y Configuración Local

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. Clonar el repositorio:

```
git clone https://github.com/ali-zunega/gastos-personales
cd gastos-personales
```

2. Instalar dependencias:

```
npm install
```

3. Ejecutar el servidor de desarrollo:

```
npm run dev
```

La aplicación estará disponible por defecto en `http://localhost:5173`.

## 🧪 Pruebas (Testing)

El proyecto incluye tests unitarios y de integración configurados con Vitest y React Testing Library.

1. Ejecutar tests en modo watch:

```
npm test
```

2. Ejecutar tests una sola vez (CI):

```
npm run test:run
```

## 📅 Plan de Desarrollo (3-5 Días)

**Día 1**: Diseño del modelo de datos inicial, configuración del entorno (Vite + React Router) y definición de la estructura de carpetas.

**Días 2 y 3**: Implementación del flujo de autenticación (registro/login simulado) y el módulo CRUD de gastos.

**Días 4 y 5**: Integración de gráficos con Recharts para el resumen mensual, filtrado avanzado, manejo de casos borde (edge cases), cobertura de tests y redacción de este README.

## 👤 Autor

Desarrollado por [Alicia Zuñega](https://github.com/ali-zunega) para la evaluación del Take-Home Challenge de [IDForIdeas](https://idforideas.com/).
