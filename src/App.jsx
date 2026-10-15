import "./App.css";
import Logo from "./components/Logo.jsx";

function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      <section
        style={{
          background: "var(--valoora-surface)",
          borderRadius: "var(--valoora-radius)",
          padding: "32px 36px",
          boxShadow: "0 20px 60px rgba(76,29,149,0.18)",
          textAlign: "center",
          maxWidth: 480,
        }}
      >
        <Logo variant="full" size={56} />
        <h1 style={{ margin: "18px 0 8px" }}>Gestión de gastos personales</h1>
        <p style={{ margin: 0, color: "var(--valoora-ink-soft)" }}>
          Identidad con tus assets: favicon + icono + lockup completo.
        </p>
        <div
          style={{
            display: "flex",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Logo variant="app" size={48} />
          <Logo variant="mark" size={48} />
          <Logo variant="app" size={32} />
          <Logo variant="app" size={16} />
        </div>
      </section>
    </main>
  );
}

export default App;
