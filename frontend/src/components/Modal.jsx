import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const Modal = ({ children, isOpen, onClose, title }) => {
  const [animationClass, setAnimationClass] = useState("");

  // Handle escape key and animation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      setAnimationClass("animate-in");
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle close with animation
  const handleClose = () => {
    setAnimationClass("animate-out");
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm transition-opacity duration-200 ${
        animationClass === "animate-in" ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative bg-blue-50 rounded-xl shadow-lg w-full max-w-2xl mx-4 overflow-hidden transition-all duration-200 ${
          animationClass === "animate-in"
            ? "scale-100 translate-y-0"
            : "scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-white border-b border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">{title}</h3>
          <button
            type="button"
            className="rounded-full p-1 text-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-gray-700 bg-white max-h-[80vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
