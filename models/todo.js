// models/todo.js
"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      Todo.overdue().then((result) => result.forEach((task) => console.log(task.displayableString())));
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      Todo.dueToday().then((result) => result.forEach((task) => console.log(task.displayableString())));
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      Todo.dueLater().then((result) => result.forEach((task) => console.log(task.displayableString())));

    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      return Todo.findAll({ where: { dueDate: { [Op.lt]: new Date() } }, order: [["id", "ASC"]] });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      return Todo.findAll({ where: { dueDate: new Date() }, order: [["id", "ASC"]] });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      return Todo.findAll({ where: { dueDate: { [Op.gt]: new Date() } }, order: [["id", "ASC"]] });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      Todo.update(
        { completed: true },
        { where: { id: id } }
      )
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
