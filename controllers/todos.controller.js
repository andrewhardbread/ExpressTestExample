// Accessing the Service that we just created

const TodoService = require('../services/todo.service');

// Saving the context of this module inside the _the variable

_this = this;


// Async Controller function to get the To do List

exports.getTodos = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    try{

        const todos = await TodoService.getTodos({}, page, limit);

        // Return the todos list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: todos, message: "Successfully Received Todos"});

    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

    }
};

exports.createTodo = async function(req, res, next){

    // Req.Body contains the form submit values.

    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    };

    try{

        // Calling the Service function with the new object from the Request Body

        const createdTodo = await TodoService.createTodo(todo);
        return res.status(201).json({status: 201, data: createdTodo, message: "Successfully Created ToDo"})
    }catch(e){

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: "Todo Creation was Unsuccessfull"})
    }
};

exports.updateTodo = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    const id = req.body._id;

    console.log(req.body);

    const todo = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    };

    try{
        const updatedTodo = await TodoService.updateTodo(todo);
        return res.status(200).json({status: 200, data: updatedTodo, message: "Successfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
};

exports.removeTodo = async function(req, res, next){

    const id = req.params.id;

    try{
        const deleted = await TodoService.deleteTodo(id);
        return res.status(204).json({status:204, message: "Successfully Todo Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

};