var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connect( 'mongodb://kyungjoongo:ka1114@ds151973.mlab.com:51973/amazon001',{authMechanism: 'ScramSHA1'});
autoIncrement.initialize(connection);

var Todo = new Schema({
    user_id    : String,
    content    : String,
    updated_at : Date
});


var Dog = new Schema({
      name    : String,
      nickname    : String,
      owner : String,
      birthday : Date
});

//자동증가 플러그인 add
Dog.plugin(autoIncrement.plugin, 'Dog');


mongoose.model( 'Todo', Todo );
mongoose.model( 'Dog', Dog );







/*mongoose.connect( 'mongodb://localhost/express-todo' );*/
/*db = mongojs('mongodb://username:password@ds31341.mongolab.com:32132/mydb', ["mycollection"], {authMechanism: 'ScramSHA1'});*/


