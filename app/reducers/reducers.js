export var UserReducer = (state = {isLogged: false} , action) => {
  switch (action.type) {
    case 'IS_LOGGED':
      return {
        ...state,
        isLogged: true
      };
    case "USER_NOW":
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  };
};
