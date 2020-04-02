const { MONGODBU, MONGODBP, MONGODBNAME } = process.env;

const CONFIG = {
  // SESSION_SECRET,
  MONGODBU,
  MONGODBP,
  MONGODBNAME
};

module.exports = { ...CONFIG };