import Joi from "joi";

export const userLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const tokenRefresh = Joi.object({
  refreshToken: Joi.string().required().messages({
    "string.required": "Missing required field: refresh_token"
  })
})