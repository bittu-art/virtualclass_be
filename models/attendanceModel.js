const BaseModel = require('./base.model');

class Meeting extends BaseModel {
  static get tableName() {
    return 'attendance';
  }

  static get idColumn() {
    return 'id';
  }
//   classes_id integer NOT NULL,
//     user_id integer NOT NULL,
//     start_time timestamp without time zone,
// 	end_time timestamp without time zone,
  static get jsonSchema() {
    return {
      type: 'object',
     
      properties: {
        id: { type: 'integer' },
         classes_id: { type: 'integer' },
        user_id: { type: 'integer' },
        join_time:{ type: 'string', format: 'date-time',nullable:true },
        leave_time:{ type: 'string', format: 'date-time',nullable:true },
        createdat: { type: 'string', format: 'date-time' },
        updatedat: { type: 'string', format: 'date-time' },
      }
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.HasOneRelation,
        modelClass: () => require("./userModel"),
        join: {
          from: "attendance.user_id",
          to: "users.id",
        },
      },
       
     
    };
  }



}

module.exports = Meeting;
