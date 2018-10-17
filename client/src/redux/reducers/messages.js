export default (state = [], action) => {
  switch (action.type) {
    case "LOAD_MESS":
      return [...action.data];
    case "ADD_MESS":
      return [...state, action.data];
    default:
      return state;
  }
};
