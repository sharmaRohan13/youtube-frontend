const getDidliked = data => {
  return {
    type: "disliked",
    payload: data
  };
};

export default getDidliked;
