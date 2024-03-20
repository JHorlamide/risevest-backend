import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  published: Joi.boolean().required(),
})

export const commentSchema = Joi.object({
  content: Joi.string().required(),
})
