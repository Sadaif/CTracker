import { createStore } from "redux";

const INITIAL_STATE = {
  enterprise: null
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DEFINE_ENTERPRISE":
      return { ...state, enterprise: action.payload };
    default:
      return state;
  }
};

const store = __DEV__
  ? createStore(reducer, console.tron.createEnhancer())
  : createStore(reducer);

export default store;
