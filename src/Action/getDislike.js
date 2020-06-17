const getDislike = data => {
  return {
    type: "dislike",
    payload: data
  };
};

export default getDislike;
