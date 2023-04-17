import helpers from '../utils/helpers.js'
import ErrorResponse from '../utils/errorResponse.js'

export default async (req, res, next) => {
  const authorToken = await helpers.getTokenFromHeader(req)

  try {
    const result = await helpers.verifyJWToken({ authorToken })
    req.userData = {
      id: result.id,
      name: result.name,
      email: result.email
    }
    next()
  } catch (err) {
    throw new ErrorResponse({ 
      statusCode: 401, 
      message: `Please login or provide valid credential, ${err.message}`
    })
  }
}
