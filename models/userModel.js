const BaseModel = require('./base.model');

class Meeting extends BaseModel {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
     
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        user_type: { type: 'string' },       
        createdat: { type: 'string', format: 'date-time' },
        updatedat: { type: 'string', format: 'date-time' },
      }
    };
  }
}

module.exports = Meeting;
