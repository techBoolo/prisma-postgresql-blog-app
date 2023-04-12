import Author from '../models/author.js'
import helpers from '../utils/helpers.js'

const create = async (req, res) => {
  const signupInfo = req.body
  const { email, password } = signupInfo

  await helpers.checkEmailAndPasswordPolicy({ email, password })
  await helpers.checkIfAccountTaken({ email })
  
  const hashedPassword = await helpers.hashPassword(password)
  const jwtPayload = {
    name: signupInfo.name, 
    email,
  }
  const authorInfo = {
    ...jwtPayload,
    password: hashedPassword
  }
  const response = await Author.create(authorInfo)
  const token = await helpers.generateJWToken(jwtPayload)

  res.status(201).json({ 
    author: { ...response, token } , 
    message: 'signup success' 
  })
}

const verify_token = async (req, res) => {
  const token = req.body
  const result = await helpers.verifyJWToken(token)
  const { name, email } = result
  
  res.status(200).json({ name, email })
}

export default {
  create,
  verify_token
}
