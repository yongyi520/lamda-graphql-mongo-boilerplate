const { MONGOURL } = process.env;

const CONFIG = {
  // SESSION_SECRET,
  MONGOURL
};

module.exports = { ...CONFIG };