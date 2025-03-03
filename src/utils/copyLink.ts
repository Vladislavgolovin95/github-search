import clipboardCopy from 'clipboard-copy';
import { MESSAGE } from 'src/constants/constants';
import { message } from './message';

export const copyLink = async (url: string) => {
  try {
    await clipboardCopy(url);
    message.success(MESSAGE.copySuccsess);
  } catch (error: unknown) {
    if (error instanceof Error) {
      message.error(MESSAGE.copyError);
    };

  message.error(MESSAGE.copyError);
  }
};