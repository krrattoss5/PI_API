const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { DB_URL } = process.env;

if (!DB_URL) {
  throw new Error("DB_URL environment variable not set!");
}

const sequelize = new Sequelize(DB_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Esto es importante si tu certificado SSL no está firmado por una CA pública.
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Pokemon, Type } = sequelize.models;

Pokemon.belongsToMany(Type, { through: "PokemonType" });
Type.belongsToMany(Pokemon, { through: "PokemonType" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
