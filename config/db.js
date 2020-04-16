// конфигурация базы данных
module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/auth',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
};
