# Galileo Frontend

> Frontend desarrollado por **Diego Arredondo** para la plataforma educativa Galileo de la Escuela de Ingeniería de la Universidad Católica del Norte (UCN).

## Descripción

Galileo Frontend es una SPA construida con **React 18** para una plataforma de cursos online. Implementa el catálogo, autenticación, perfil de usuario, carrito, checkout con Webpay, historial de compras y un chatbot conectado al servicio de IA.

La aplicación se comunica con los microservicios mediante **GraphQL**, utiliza **Apollo Client** para las consultas y **Material UI** para construir una interfaz responsive con temas claro y oscuro.

## Funcionalidades principales

- Catálogo de cursos con información de precio, categoría, nivel, instructor, rating e imagen.
- Registro e inicio de sesión con validación de formularios.
- Persistencia de sesión y carrito mediante `localStorage`.
- Dashboard privado con:
  - edición de perfil;
  - cursos;
  - historial de compras;
  - navegación responsive.
- Carrito de compras y checkout dividido en pasos.
- Integración con Webpay para iniciar transacciones.
- Chatbot con historial de mensajes y `sessionId` para mantener el contexto.

## Arquitectura

La aplicación está organizada por dominios para mantener cada funcionalidad aislada y facilitar la reutilización de componentes:

```text
src/
├── App.js                 # Rutas principales
├── index.js               # Punto de entrada y ApolloProvider
├── Main/                  # Página principal y catálogo
├── identify/              # Login y registro
├── dashboard/             # Área privada del usuario
├── shopingcart/           # Carrito
├── checkout/              # Checkout y pago
├── botAi/                 # Chatbot
├── shared-theme/          # Tema compartido
└── index.css              # Estilos globales
```

## Rutas principales

| Ruta | Funcionalidad |
|---|---|
| `/` | Página principal y catálogo |
| `/join/login` | Inicio de sesión |
| `/join/register` | Registro |
| `/dashboard/perfil` | Perfil |
| `/dashboard/cursos` | Cursos |
| `/dashboard/compras` | Historial de compras |
| `/checkout` | Checkout |
| `/carrito` | Carrito |

Las rutas se administran con `BrowserRouter`, `Routes`, `Route` y `useNavigate` de React Router.

## Integración con el backend

Apollo Client utiliza clientes independientes para dirigir cada operación al microservicio correspondiente:

| Servicio | Endpoint utilizado |
|---|---|
| Usuarios | `http://localhost:3001/graphql` |
| Cursos | `http://localhost:3002/graphql` |
| Carrito y compras | `http://localhost:3003/graphql` |
| Chatbot IA | `http://localhost:3010/graphql` |
| Webpay | `http://localhost:3003/webpay/create` |

Se utilizan `useQuery` para datos necesarios al cargar una vista, `useLazyQuery` para consultas bajo demanda y `useMutation` para crear o actualizar información.

## React aplicado y decisiones técnicas

- **Componentes funcionales:** las pantallas se dividen en componentes pequeños y reutilizables, como tarjetas de curso, formularios, menús, tarjetas del dashboard y secciones del checkout.
- **`useState`:** administra estado local como formularios, errores, modo visual, paso activo del checkout, diálogo del chatbot y mensajes.
- **`useEffect`:** sincroniza el estado con la API, `localStorage`, preferencias del sistema y redirecciones.
- **Props y composición:** los componentes padres coordinan datos y los hijos se enfocan en representar la interfaz.
- **Renderizado condicional:** se utiliza para estados de carga, errores, autenticación, pasos del checkout y métodos de pago.
- **Listas con `key`:** los cursos y mensajes se renderizan con identificadores para que React reconcilie correctamente los cambios.
- **Material UI:** `ThemeProvider`, `createTheme`, `styled`, `Box`, `Stack`, `Grid2`, formularios, diálogos y breakpoints responsive.
- **Apollo `InMemoryCache`:** permite reutilizar resultados y reducir solicitudes repetidas.
- **`React.StrictMode`:** habilitado desde el punto de entrada para detectar problemas durante el desarrollo.

La optimización se centra en separar responsabilidades, reutilizar componentes y ejecutar consultas solo cuando son necesarias. No se añade memoización indiscriminadamente: `useMemo` y `useCallback` deben incorporarse cuando exista un cálculo costoso o una necesidad concreta de evitar renders.

## Flujo de compra

```text
Catálogo
  → Crear/recuperar carrito
  → Revisar carrito
  → Checkout
  → Marcar carrito como pendiente
  → Crear transacción
  → Redirigir a Webpay
```

## Instalación y ejecución

Requisitos: Node.js, npm y los microservicios del backend disponibles.

```bash
npm install
npm start
```

La aplicación se ejecuta en `http://localhost:3000`.

```bash
npm test       # Pruebas con Jest y React Testing Library
npm run build  # Build de producción
```
