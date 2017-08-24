var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

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


mongoose.model( 'Todo', Todo );
mongoose.model( 'Dog', Dog );
mongoose.connect( 'mongodb://localhost/express-todo' );
