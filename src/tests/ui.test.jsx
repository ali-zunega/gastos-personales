import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Modal from "../components/ui/Modal.jsx";

describe("Button (smoke)", () => {
  it("renderiza el texto y dispara el click", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Guardar</Button>);

    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("no dispara el click si está deshabilitado", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Guardar
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Guardar" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("expone aria-busy y queda deshabilitado en estado loading", () => {
    render(<Button loading>Enviando</Button>);

    const boton = screen.getByRole("button", { name: /enviando/i });
    expect(boton).toBeDisabled();
    expect(boton).toHaveAttribute("aria-busy", "true");
  });
});

describe("Input (smoke)", () => {
  it("asocia la etiqueta al campo y refleja lo escrito", async () => {
    const onChange = vi.fn();
    render(<Input label="Correo" onChange={onChange} />);

    const campo = screen.getByLabelText("Correo");
    await userEvent.type(campo, "a");

    expect(onChange).toHaveBeenCalled();
  });

  it("marca el campo como inválido y muestra el mensaje de error", () => {
    render(<Input label="Monto" error="El monto es obligatorio." />);

    const campo = screen.getByLabelText("Monto");
    expect(campo).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "El monto es obligatorio.",
    );
  });
});

describe("Modal (smoke)", () => {
  it("no renderiza contenido cuando está cerrado", () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Nuevo gasto">
        contenido
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("muestra el contenido cuando está abierto", () => {
    render(
      <Modal isOpen onClose={() => {}} title="Nuevo gasto">
        contenido del modal
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("contenido del modal")).toBeInTheDocument();
  });

  it("cierra con la tecla Escape", async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Nuevo gasto">
        contenido
      </Modal>,
    );

    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledOnce();
  });

  it("cierra al hacer click en el backdrop", async () => {
    const onClose = vi.fn();
    render(
      <Modal isOpen onClose={onClose} title="Nuevo gasto">
        contenido
      </Modal>,
    );

    await userEvent.click(screen.getByRole("dialog").parentElement);

    expect(onClose).toHaveBeenCalledOnce();
  });
});
