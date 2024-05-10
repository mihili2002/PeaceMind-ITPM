const mongoose = require("mongoose")

const AdminloginSchema = mongoose.Schema({

    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    role :{
        type : String,
        default : 'User'
    },
    // username :{
    //     type : String,
        
    // }
}
// ,{
//     timestamps : true,
// }
)

const Adminlogin = mongoose.model("Adminlogin",AdminloginSchema)

module.exports =Adminlogin;