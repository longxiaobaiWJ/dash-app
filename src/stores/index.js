export default function initReducer(
  state = {
    list: [],
    counter: 9,
  },
  action
) {
  let value = null;
  switch (action.type) {
    case "ADD_ACTION":
      value = action.payload;
      return {
        list: state.list.concat(value),
        counter: 20,
      };
    case "DELETE_ACTION":
      value = action.payload;
      return {
        list: value.list,
        counter: 20,
      };
    case "UPDATE_ACTION":
      value = action.payload;
      return {
        list: value.list,
        counter: 20,
      };
    case "SOME_ACTION":
      return {
        list: [],
        counter: 20,
      };
    case "SEARCH_ACTION":
      return {
        list: action.payload,
        counter: 20,
      };
    default:
      // if action type is not matched, return the current state
      return state;
  }
}
