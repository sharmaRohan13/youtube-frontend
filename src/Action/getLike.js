const getLike = data => {
  return {
    type: "like",
    payload: data
  };
};

export default getLike;
