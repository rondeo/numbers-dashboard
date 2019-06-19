import types from './types';

const messages = [
  {
    messageId: "1",
    message: "Test Message 1",
    viewed: false
  },
  {
    messageId: "2",
    message: "Test  Message 2",
    viewed: false
  },
  {
    messageId: "3",
    message: "Test Message 3",
    viewed: false
  }
];

const messagesReducer = (state = messages, action) => {
  switch (action.type) {
    case types.MARK_MESSAGE_AS_READ:
      return state.map((item, index) => {
          if(item.messageId !== action.payload) {
            return item;
          }
          return {
            ...item,
            viewed: true
          }
        }
      );
    default:
      return state;
  }
};

export default messagesReducer;
