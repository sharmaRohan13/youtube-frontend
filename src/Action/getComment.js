const getComment = data => {
  return {
    type: "comment",
    payload: data
  };
};

export default getComment;
