const getDB = data => {
  return {
    type: "DB",
    payload: data
  };
};

export default getDB;
