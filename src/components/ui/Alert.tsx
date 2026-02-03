import clsx from 'clsx';
import { HiOutlineInformationCircle, HiOutlineExclamation, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

interface AlertProps {
  variant: 'info' | 'warning' | 'success' | 'error';
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: <HiOutlineInformationCircle className="w-5 h-5 text-blue-500" />,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: <HiOutlineExclamation className="w-5 h-5 text-yellow-500" />,
  },
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: <HiOutlineCheckCircle className="w-5 h-5 text-green-500" />,
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: <HiOutlineXCircle className="w-5 h-5 text-red-500" />,
  },
};

export function Alert({ variant, icon, children, className }: AlertProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={clsx(
        'flex items-center gap-3 px-4 py-3 rounded-lg border',
        styles.container,
        className
      )}
    >
      <span className="flex-shrink-0">{icon || styles.icon}</span>
      <span className="text-sm">{children}</span>
    </div>
  );
}
