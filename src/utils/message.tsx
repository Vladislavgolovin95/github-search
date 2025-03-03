import { createRoot } from 'react-dom/client';
import { Message } from 'src/components/Message/Message';
import { TypeMessage } from 'src/types/types';

const showMessage = (
  type: TypeMessage, 
  content: string, 
  duration = 2
) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const removeMessage = () => {
    root.unmount();
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  };

  root.render(
    <Message 
      type={type} 
      content={content} 
      duration={duration} 
      onClose={removeMessage} 
    />
  );
};

export const message = {
  show: showMessage,
  success: (content: string, duration?: number) => {
  showMessage(TypeMessage.Success, content, duration)
  },
  error: (content: string, duration?: number) => {
    showMessage(TypeMessage.Error, content, duration)
  },
  info: (content: string, duration?: number) => {
    showMessage(TypeMessage.Info, content, duration)
  }
};