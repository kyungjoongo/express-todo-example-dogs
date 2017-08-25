var utils = require('../utils');
var mongoose = require('mongoose');
var Dog = mongoose.model('Dog');




exports.dogcreate = function (req, res, next) {

      var dog1 = new Dog({
            name: "dowone",
            nickname: req.body.content,
            owner: 'kyungjoon',
            birthday: new Date()
      });


      dog1.save(function (err, todo, count) {
            if (err)
                  return next(err);
            else
                  console.log("dog1 성공이네");

            res.redirect('/dog/');
      });
};

exports.dogdestroy = function (req, res, next) {
      Dog.findById(req.params.id, function (err, dog) {

            dog.remove(function (err, todo) {
                  if (err) return next(err);

                  res.redirect('/dog/');
            });
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


exports.getDogListToJson = function (req, res, next) {

      Dog.find().exec(function (err, dogs) {

            if (err) {
                  return next(err);
            }

            res.json({"dogList": dogs});
      });
};

exports.dogget = function (req, res, next) {

      console.log("id--->"+ req.params.id);
      Dog.findById(req.params.id, function (err, dog) {

            if (err) return next(err);


            res.json({"dog": dog});
      });
};