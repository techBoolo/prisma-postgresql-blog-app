import ErrorResponse from './errorResponse.js'
import Author from '../models/author.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const emailRegExp = new RegExp('^.+\@.+\\..+$', 'i')
const emailPolicy = (email) => {
  if(email && emailRegExp.test(email)) 
    return true
}
const passwordPolicy = (password) => {
  if(password && password.length >= 3) 
    return true
}
const checkEmailAndPasswordPolicy = ({ email, password }) => {
  if(!emailPolicy(email) || !passwordPolicy(password)) {
    throw new ErrorResponse({ 
      statusCode: 400, 
      message: 'Please, provide valid required fields' 
    })
  }
}

const isAccountExists = async (query) => {
  return await Author.findAuthor(query)
}
const checkIfAccountTaken = async ({ email }) => {
  if(await isAccountExists({ email })) {
    throw new ErrorResponse({ statusCode: 409, message: 'Account already taken' })
  }
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, +process.env.BcryptSaltRounds) 
}

const generateJWToken = async (payload) => {
  return await jwt.sign(
    payload, 
    process.env.JWT_KEY, 
    { expiresIn: '180days' })
}

export default {
  checkEmailAndPasswordPolicy,
  checkIfAccountTaken,
  hashPassword,
  generateJWToken,
}
