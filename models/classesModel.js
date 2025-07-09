const BaseModel = require('./base.model');

class Meeting extends BaseModel {
  static get tableName() {
    return 'classes';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
     
      properties: {
        id: { type: 'integer' },
         class_room_id: { type: 'integer' },
         class_name: { type: 'string'},
        start_time:{ type: 'string', format: 'date-time',nullable:true },
        end_time:{ type: 'string', format: 'date-time',nullable:true },
        is_started: { type: 'boolean',default:false },
        createdat: { type: 'string', format: 'date-time' },
        updatedat: { type: 'string', format: 'date-time' },
      }
    };
  }

    static get relationMappings() {
        return {     
        attendance: {
            relation: BaseModel.HasManyRelation,
            modelClass: () => require("./attendanceModel"),
            join: {
            from: "classes.id",
            to: "attendance.classes_id",
            },
        },
        };
    }



}

module.exports = Meeting;
