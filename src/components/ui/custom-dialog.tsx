import { LucideX } from "lucide-react";
import React from "react";

interface CustomDialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center text-black">
      <div className="bg-white p-5 rounded-lg relative min-w-[300px]">
        <section id="header" className="flex flex-row justify-between mb-2">
          <h2 className="text-lg font-bold">{title}</h2>

          <div
            className="bg-none border-none text-lg cursor-pointer"
            onClick={onClose}
          >
            <LucideX />
          </div>
        </section>
        {children}
      </div>
    </div>
  );
};

export default CustomDialog;
