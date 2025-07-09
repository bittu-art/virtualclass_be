const BaseModel = require('./base.model');

class Meeting extends BaseModel {
  static get tableName() {
    return 'class_room';
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
        
        createdat: { type: 'string', format: 'date-time' },
        updatedat: { type: 'string', format: 'date-time' },
      }
    };
  }

    static get relationMappings() {
        return {     
        classes: {
            relation: BaseModel.HasManyRelation,
            modelClass: () => require("./classesModel"),
            join: {
            from: "class_room.id",
            to: "classes.class_room_id",
            },
        },
        };
    }



}

module.exports = Meeting;
