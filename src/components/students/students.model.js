const {mongoose,Schema}= require('mongoose')

const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      length: 10,
      trim: true,
      unique: true,
      validate(value) {
        if (value.length < 10) {
          throw new Error('Phone number must be at least 10 characters long');
        }
      },
    },
    department: {
      type: String,
      required: true,
    },
    batch: {
      type: String,
      required: true,
    },
    semester: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

StudentSchema.virtual('attendence', {
  ref: 'Attendence',
  localField: '_id',
  foreignField: 'studId',
});

module.exports=mongoose.model('Student', StudentSchema)
