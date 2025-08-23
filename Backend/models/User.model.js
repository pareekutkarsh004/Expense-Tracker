import {mongoose,Schema} from "mongoose";

const UserSchema = new Schema( {

        clerkUserId: {
        type: String,
        required: true,
        unique: true
         },
         email: {
        type: String,
        required: true,
        unique: true
         }

    },{timestamps: true}
)

const User = mongoose.model('User', UserSchema);

export default User;



