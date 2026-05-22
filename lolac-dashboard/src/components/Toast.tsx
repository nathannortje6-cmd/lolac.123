import { motion } from 'framer-motion';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const Toast = ({ message, type, onDismiss }: ToastProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className={`glass-card max-w-sm border ${
        type === 'success' ? 'border-emerald-500/20' : 'border-rose-500/20'
      } px-5 py-4 shadow-glow`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">{type === 'success' ? 'Success' : 'Error'}</p>
          <p className="mt-1 text-sm text-slate-300">{message}</p>
        </div>
        <button type="button" onClick={onDismiss} className="text-slate-400 transition hover:text-white">
          ✕
        </button>
      </div>
    </motion.div>
  );
};

export default Toast;
