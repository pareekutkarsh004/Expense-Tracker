import {mongoose,Schema} from "mongoose";

const ExpenseSchema = new Schema({
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      text:{
        type: String,
        trim: true,
        required: [true, 'Please add some text']
      },
      category:{
        type: String,
        trim: true,
        required: [true, 'Please add a category']
      },
      amount:{
        type: Number,
        required: [true, 'Please add a positive or negative amount']
      },
      isGroupExpense:{
        type: Boolean,
        default: false
      },
      groupId:{
        type: String,
        required: false
      }
},{timestamps: true});

const Expense = mongoose.model('Expense',ExpenseSchema);

export default Expense;