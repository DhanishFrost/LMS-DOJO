const mongoose = require('mongoose');

/*
const Class = new mongoose.Schema({
    classname: {
        required: true,
        type: String,
    },

});*/





const userSchema = new mongoose.Schema({

    id: mongoose.Schema.Types.ObjectId,

    name: {
        required: true,
        type: String,
        trim: true,
    },

    email: {
        required: true,
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator: (value) => {
              const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              return value.match(re);
            },
            message: "Please enter a valid email address",
          },
    },
    password: {
        required: true,
        type: String,
    },

    role: {
        required: true,
        type: String,
    },

    class: {
        
        type: String,
    },


    /* teacherclasses: {
        
        type : [Class],
    
    }*/


    teacherclasses : [{
       type: String
    }],


    selectedSubjects : [{
        type: String
    }]
    
   



});

//const Class = mongoose.model('Class', ClassSchema);
const User = mongoose.model('User', userSchema);
module.exports = User;