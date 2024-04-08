"use client";

import { CreateForm } from "./form/create";
import { ModalProvider } from "../../common/modal/ModalContext";
import { TabColumnData } from "./tab-column-data";
import { useToggle } from "react-use";

export const MainPage = () => {
  return (
    <ModalProvider>
      <div>
        <TabColumnData />
        <CreateForm />
      </div>
    </ModalProvider>
  );
};
