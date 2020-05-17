var initialState = {
    location: "",
    data: {},
    dates: [],
    temps: [],
    selected: {
      date: "",
      temp: null
    }
  };
  
  export default function mainReducer(state = initialState, action) {
    switch (action.type) {
      case "CHANGE_LOCATION":
        return Object.assign({}, state, {
          location: action.location
        });
      default:
        return state;
    }
  }
  