import mongoose, {type Document} from "mongoose";
interface TaskInt extends Document{
    title: string
    description: string
    category: string
    dueDate: string
    completed: boolean
    userId: mongoose.Types.ObjectId
}

const TaskSchema = new mongoose.Schema<TaskInt>({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  dueDate: {
    type: String,
    required: true,
  },

  completed: {
    type: Boolean,
    required: true,
    default: false
  }, 
},

{timestamps: true}
);

export const Task = mongoose.model<TaskInt>("Task", TaskSchema)


