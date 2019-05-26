const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI
  },
  default: {
    SECRET: "MUSICISTHEANSWER",
    DATABASE: "mongodb://mongo:27017/aud_io"
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
};
