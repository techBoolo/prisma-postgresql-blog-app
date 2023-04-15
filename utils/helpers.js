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
const getAccountIfExists = async ({ email }) => {
  const account = await isAccountExists({ email })
  if(account) return account
  throw new ErrorResponse({
    statusCode: 404,
    message: 'Account does not exist in the record'
  })
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, +process.env.BcryptSaltRounds) 
}
const isPasswordCorrect = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}
const comparePassword = async (password, hashedPassword) => {
  if(!await isPasswordCorrect(password, hashedPassword)) {
    throw new ErrorResponse({
      statusCode: 403,
      message: 'Authentication error, password'
    })
  }
}

const generateJWToken = async (payload) => {
  return await jwt.sign(
    payload, 
    process.env.JWT_KEY, 
    { expiresIn: '180days' })
}
const verifyJWToken = async (token) => {
  return await jwt.verify(token.authorToken, process.env.JWT_KEY) 
}

const checkIfEmailAndPasswordProvided = ({ email, password }) => {
  if(!email || !password) {
    throw new ErrorResponse({ 
      statusCode: 400,
      message: 'Please, Provide the required fields'
    })
  }
}

export default {
  checkEmailAndPasswordPolicy,
  checkIfAccountTaken,
  hashPassword,
  comparePassword,
  generateJWToken,
  verifyJWToken,
  checkIfEmailAndPasswordProvided,
  getAccountIfExists,
}
