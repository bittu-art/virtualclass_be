const { Model } = require("objection");
const dbConfig = require("../config/knexfile");  
const knex = require("knex");
const db=knex(dbConfig)
Model.knex(db);

class BaseModel extends Model {
  static get idColumn() {
    return "id";
  }
}

module.exports = BaseModel;
