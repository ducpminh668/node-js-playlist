const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://ducpminh668:123@ds019866.mlab.com:19866/tododatabase');

let todoSchema = new mongoose.Schema({
    item : String
});

let Todo = mongoose.model('Todo', todoSchema);

let urlencondedParser = bodyParser.urlencoded({ extended: false });

let data = [{item : 'get milk'}, {item : 'walk dog'}, {item : 'kick some coding ass'}];

module.exports = function (app) {


    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
           if(err) throw err;
            res.render('todo', { todos : data});
        });
    });

    app.post('/todo', urlencondedParser, function (req, res) {
        let newTodo = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.put('/todo', function (req, res) {

    });

    app.delete('/todo/:item', function (req, res) {
        // let index = data.findIndex(i => i.item === req.params.item.replace(/-/g,' '));
        // data.splice(index,1);
        
        // data = data.filter(function (todo) {
        //    return todo.item.replace(/ /g,'-') !== req.params.item;
        // });

        Todo.find({item : req.params.item.replace(/-/g,' ')}).remove(function (err, data) {
            if(err) throw err;
            res.json(data);
        });
    });
};