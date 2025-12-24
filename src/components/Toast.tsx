import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";

type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastStyles = {
  success: {
    wrapper: "bg-green-500/20 border border-green-500 text-green-200",
    icon: <FaCheck className="w-5 h-5" />,
  },
  error: {
    wrapper: "bg-red-900/10 border border-red-500/30 text-red-300",
    icon: <FaTimes className="w-5 h-5" />,
  },
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const style = toastStyles[type];

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 30, filter: "blur(6px)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`pointer-events-none flex items-center gap-3 px-6 py-3 rounded-lg shadow-lg ${style.wrapper}`}
    >
      {style.icon}
      <span className="text-sm font-sans">{message}</span>
    </motion.div>
  );
};

export default Toast;
