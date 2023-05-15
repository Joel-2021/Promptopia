import { Schema,model,models } from "mongoose";

const UserSchema=new Schema({
    email:{
        type:String,
        unique:[true,'Email Already Exists!'],
        required:[true,'Email is Required']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
      },
      image:{
        type:String
      }
})
//if it was in express 
// const User=model('User',UserSchema)
// export default User


//Checks if a model exists. If it doesn't then only it is created 
const User= models.User || model('User',UserSchema);
export default User;