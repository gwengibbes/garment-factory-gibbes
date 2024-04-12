const { Schema, model, models } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
//Username property with type String, make it required and make each username unique
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
//Password property with type String, make it required, make the required minimum length be 5 characters and the max 20 characters
    password: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 20,
    },
  },
  {
  //Method property where the password is checked and compared before being approved
    methods: {
      checkPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  }
);

// hashes the password before it's stored in mongo
UserSchema.pre("save", async function (next) {
  // the isNew check prevents mongoose from re-hashing the password when the user is updated for any reason
  if (this.isNew)
    this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = models.User || model("User", UserSchema);
