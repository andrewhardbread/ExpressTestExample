const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const ToDoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    status: String
});

ToDoSchema.plugin(mongoosePaginate);
const ToDo = mongoose.model('Todo', ToDoSchema);

module.exports = ToDo;