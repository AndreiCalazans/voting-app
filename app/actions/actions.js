
export var notLogged = () => {
  return {
    type: 'NOT_LOGGED'
  };
};

export var currentUser = (name , email) => {
  return {
    type: 'USER_NOW',
    name,
    email
  };
};
export var flashMsg = (messages) => {
  return {
    type: 'FLASH_MESSAGE',
    messages
  };
};

export var deleteMsg = () => {
  return {
    type: 'DELETE_MESSAGE'
  };
};
