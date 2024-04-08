import React, { createContext, useContext, useState } from "react";

interface ModalStateType {
  visible: boolean;
  tab_id: string | number | null;
  todo_id: string | number | null;
}

interface ModalContextType {
  modalForm: ModalStateType;
  setModalForm: React.Dispatch<React.SetStateAction<ModalStateType>>;
}

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const { modalForm, setModalForm } = context;

  const closeForm = () => {
    setModalForm({
      visible: false,
      tab_id: null,
      todo_id: null,
    });
  };

  const setForm = (id: number | string) =>
    setModalForm({
      visible: true,
      tab_id: id,
      todo_id: null,
    });

  const isVisible = modalForm?.visible;

  const tabId = modalForm?.tab_id;

  return { tabId, setForm, closeForm, isVisible };
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalForm, setModalForm] = useState<ModalStateType>({
    visible: false,
    tab_id: null,
    todo_id: null,
  });

  return (
    <ModalContext.Provider value={{ modalForm, setModalForm }}>
      {children}
    </ModalContext.Provider>
  );
};
