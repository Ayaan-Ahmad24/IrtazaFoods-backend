const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
