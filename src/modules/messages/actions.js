import types from './types';

export const markAsRead = messageId => {
  return {
    type: types.MARK_MESSAGE_AS_READ,
    payload: messageId
  }
};
