import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required()
})

export const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  published: Joi.boolean().required(),
  authorId: Joi.number().required()
})

export const commentSchema = Joi.object({
  content: Joi.string().required(),
  postId: Joi.number().required()
})
