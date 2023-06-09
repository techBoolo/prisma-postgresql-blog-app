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
  const token = await helpers.generateJWToken({...jwtPayload, id: response.id })

  res.status(201).json({ 
    author: { ...response, token } , 
    message: 'signup success' 
  })
}

const verify_token = async (req, res) => {
  const token = req.body
  const result = await helpers.verifyJWToken(token)
  const { id, name, email, admin } = result
  
  res.status(200).json({ id, name, email, admin })
}

const signin = async (req, res) => {
  const { email, password } = req.body
  helpers.checkIfEmailAndPasswordProvided({ email, password })
  const author = await helpers.getAccountIfExists({ email })
  await helpers.comparePassword(password, author.password)

  const jwtPayload = {
    id: author.id,
    name: author.name,
    email: author.email,
    admin: author.admin
  }
  const token = await helpers.generateJWToken(jwtPayload)
  
  res.status(200).send({ token, ...jwtPayload })
}

export default {
  create,
  verify_token,
  signin,
}
