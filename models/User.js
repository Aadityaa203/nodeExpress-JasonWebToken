
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "please enter a password"],
        minlength: [6, "minimum lenth is 6 characters"]
    }
});

// fire a function after doc saved to database
// userSchema.post("save", function (doc, next){
//     console.log("new user was created and saved", doc);
//     next(); 
// });

// fire a function before a document is saved to the database
userSchema.pre("save", async function(next){
    //console.log("user about to be created and saved", this);
    // Adding password for hackers
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;