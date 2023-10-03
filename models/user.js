const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

// регулярний вираз для перевірки email
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// створюємо схему - вимоги до об'єкту юзера
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
    password: {
      type: String,
      minlength: 7,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
   
    avatarURL: {
      type: String,
       required: true,
    },

    verify: {
    type: Boolean,
    default: false,
    },
    
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
    
  },
  { versionKey: false, timestamps: true }
);

// middleware, яка оброблює помилку при записі в БД нового юзера
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  password: Joi.string().min(7).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

//
const loginSchema = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
};

// створюємо модель - клас, який буде працювати з колецією юзерів
const User = model("user", userSchema);

module.exports = { schemas, User };
