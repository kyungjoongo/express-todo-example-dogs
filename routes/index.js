var utils = require('../utils');
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var Dog = mongoose.model('Dog');

exports.index = function (req, res, next) {
      var user_id = req.cookies ? req.cookies.user_id : undefined;


      Todo.find({user_id: user_id}).sort('-updated_at').exec(function (err, todos) {
            if (err) return next(err);

            res.render('index', {
                  title: 'Express Todo Example',
                  todos: todos
            });
      });
};



exports.create = function (req, res, next) {
      var todo = new Todo({
            user_id: req.cookies.user_id,
            content: req.body.content,
            updated_at: Date.now()
      });

      todo.save(function (err, todo, count) {
            if (err)
                  return next(err);
            else
                  console.log("성공이네");

            res.redirect('/');
      });
};


exports.dogcreate = function (req, res, next) {

      var dog1 = new Dog({
            name    : "dowone",
            nickname    : 'dnagkeun',
            owner : 'kyungjoon',
            birthday : new Date()
      });


      dog1.save(function (err, todo, count) {
            if (err)
                  return next(err);
            else
                  console.log("dog1 성공이네");

            res.redirect('/dog/');
      });
};

exports.dogindex = function (req, res, next) {


      Dog.find().exec(function (err, dogs) {

            if (err) return next(err);

            res.render('dogindex', {
                  title: 'Express Todo Example',
                  dogs: dogs
            });
      });
};


exports.destroy = function (req, res, next) {
      Todo.findById(req.params.id, function (err, todo) {
            var user_id = req.cookies ?
                  req.cookies.user_id : undefined;

            if (todo.user_id !== user_id) {
                  return utils.forbidden(res);
            }

            todo.remove(function (err, todo) {
                  if (err) return next(err);

                  res.redirect('/');
            });
      });
};

exports.edit = function (req, res, next) {
      var user_id = req.cookies ?
            req.cookies.user_id : undefined;

      Todo.find({user_id: user_id}).sort('-updated_at').exec(function (err, todos) {
            if (err) return next(err);

            res.render('edit', {
                  title: 'Express Todo Example',
                  todos: todos,
                  current: req.params.id
            });
      });
};

exports.update = function (req, res, next) {
      Todo.findById(req.params.id, function (err, todo) {
            var user_id = req.cookies ?
                  req.cookies.user_id : undefined;

            if (todo.user_id !== user_id) {
                  return utils.forbidden(res);
            }

            todo.content = req.body.content;
            todo.updated_at = Date.now();
            todo.save(function (err, todo, count) {
                  if (err) return next(err);

                  res.redirect('/');
            });
      });
};

// ** express turns the cookie key to lowercase **
exports.current_user = function (req, res, next) {
      var user_id = req.cookies ?
            req.cookies.user_id : undefined;

      if (!user_id) {
            res.cookie('user_id', utils.uid(32));
      }

      next();
};
