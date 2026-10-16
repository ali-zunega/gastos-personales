import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Con `globals: false`, React Testing Library no auto-registra el cleanup.
// Lo registramos una sola vez para toda la suite (evita fugas de portales
// y nodos entre tests).
afterEach(cleanup);
