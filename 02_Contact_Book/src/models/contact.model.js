import mongoose,{Schema} from "mongoose";

const contactSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    image:{
        type:String
    },
    email:{
        type:String,
        trim:true
    },
    category:{
        type:String,
        enum:["family","friends","office"],
        require:true
    },
    address:{
        type:String
    }
})

const Contact = mongoose.model("Contact",contactSchema);
export default Contact 