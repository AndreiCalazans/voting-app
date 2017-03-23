
export var notLogged = () => {
  return {
    type: 'NOT_LOGGED'
  };
};

export var currentUser = (name) => {
  return {
    type: 'USER_NOW',
    name
  };
};
