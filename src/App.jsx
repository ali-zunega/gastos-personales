import { useState } from "react";
import styles from "./App.module.css";
import Logo from "./components/Logo.jsx";
import Button from "./components/ui/Button.jsx";
import Input from "./components/ui/Input.jsx";
import Modal from "./components/ui/Modal.jsx";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    setAmount("");
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Logo variant="full" size={52} />
        <p className={styles.subtitle}>
          Biblioteca de componentes UI — Button, Input y Modal
        </p>
      </header>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Button — variantes</h2>
          <div className={styles.row}>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <h2 className={styles.cardTitle}>Button — tamaños y estados</h2>
          <div className={styles.row}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className={styles.row}>
            <Button loading>Cargando…</Button>
            <Button disabled>Deshabilitado</Button>
          </div>
          <Button fullWidth variant="secondary">
            Full width
          </Button>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Input</h2>
          <div className={styles.form}>
            <Input
              label="Correo electrónico"
              type="email"
              placeholder="tu@correo.com"
            />
            <Input
              label="Monto"
              inputMode="decimal"
              placeholder="0.00"
              hint="Ingresá el monto del gasto en pesos."
            />
            <Input
              label="Categoría"
              placeholder="Requerido"
              error="Debes seleccionar una categoría válida."
            />
            <Input label="Deshabilitado" placeholder="No editable" disabled />
          </div>
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Modal</h2>
          <p className={styles.note}>
            Se renderiza en un portal, cierra con Escape o clic afuera y bloquea
            el scroll del body.
          </p>
          <Button onClick={() => setIsModalOpen(true)}>Abrir modal</Button>
        </section>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Nuevo gasto"
        footer={
          <>
            <Button variant="ghost" onClick={closeModal}>
              Cancelar
            </Button>
            <Button onClick={closeModal}>Guardar</Button>
          </>
        }
      >
        <div className={styles.form}>
          <Input
            label="Monto"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <Input label="Descripción" placeholder="Ej. Supermercado" />
        </div>
      </Modal>
    </main>
  );
}

export default App;
