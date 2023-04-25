import defineAbilityFor from './defineability.js'
import ErrorResponse from '../utils/errorResponse.js'

export default (author, action, subject) => {
  const ability = defineAbilityFor(author)
  if(!ability.can(action, subject)) {
     throw new ErrorResponse({ 
        statusCode: 403,
        message: 'Authorization failded',
      })
  }
}
