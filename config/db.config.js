const mongoose = require('mongoose');
require('dotenv').config();

const getDataBaseName = (enviroment) => {
  switch (enviroment) {
    case 'dev':
      return process.env.DB_NAME_DEV;
    case 'prod':
      return process.env.DB_NAME_PROD;
    case 'test':
      return process.env.DB_NAME_TEST;

    default:
      return process.env.DB_NAME_DEV;
  }
};

const dbConexion = async () => {
  const user = process.env.DB_USER;
  const pass = process.env.DB_PASS;
  const cluster = process.env.DB_CLUSTER;
  const databaseName = getDataBaseName(process.env.NODE_ENV);
  try {
    const uri = `mongodb+srv://${user}:${pass}${cluster}/${databaseName}`;
    const conexionMongoose = await mongoose.connect(uri, {
      UseNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB Conectada a ${databaseName}`);
    return conexionMongoose;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

module.exports = { dbConexion, getDataBaseName };
