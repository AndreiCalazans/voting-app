



export var UserReducer = (state = {isLogged: false} , action) => {
  switch (action.type) {
    case 'IS_LOGGED':
      return {
        ...state,
        isLogged: true
      };
    case 'NOT_LOGGED':
      return {
        ...state,
        isLogged:false
      };
    case "USER_NOW":
      return {
        ...state,
        name: action.name,
        email: action.email
      };
    default:
      return state;
  };
};

export var MessageReducer = (state = [] , action) => {
  switch (action.type) {
    case 'FLASH_MESSAGE':
      return [
        action.messages
      ];
    case 'DELETE_MESSAGE':
      return [];
    default:
      return state;

  }
};
