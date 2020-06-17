import { createStore } from "redux";
import reducer from "../Reducer/reducer";

const initialState = {
  result: null,
  view: "list",
  comment: [],
  like: null,
  dislike: null,
  liked: null,
  disliked: null,
  inDB: null,
  showComment: null
};

const store = createStore(reducer, initialState);

export default store;
