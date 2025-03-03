import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TypeMessage } from 'src/types/types';
import './styles.css';

interface IMessageProps {
  type?: TypeMessage;
  content: string;
  duration?: number;
  onClose?: () => void;
}

export const Message: React.FC<IMessageProps> = ({ 
  type = TypeMessage.Info, 
  content, 
  duration = 1, 
  onClose 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return createPortal(
    <div className={`message message-${type}`}>
      {content}
    </div>,
    document.body
  );
};