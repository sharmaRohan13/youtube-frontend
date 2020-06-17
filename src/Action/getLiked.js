const getLiked = data => {
  return {
    type: "liked",
    payload: data
  };
};

export default getLiked;
