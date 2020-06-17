const reducer = (state, action) => {
  switch (action.type) {
    case "data":
      state = {
        ...state,
        result: action.payload
      };
      break;

    case "view":
      state = {
        ...state,
        view: action.payload
      };
      break;

    case "DB":
      state = {
        ...state,
        inDB: action.payload
      };
      break;

    case "like":
      state = {
        ...state,
        like: action.payload
      };
      break;

    case "dislike":
      state = {
        ...state,
        dislike: action.payload
      };
      break;

    case "liked":
      state = {
        ...state,
        liked: action.payload
      };
      break;

    case "disliked":
      state = {
        ...state,
        disliked: action.payload
      };
      break;

    case "comment":
      state = {
        ...state,
        comment: action.payload
      };
      break;

    default:
      break;
  }
  return state;
};
export default reducer;
