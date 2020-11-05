import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  const { authorization } = req.headers

  /**
      security process:

      1. you get your jsonwebtoken on first login, and value for user is stored on
         redux store (userLogin.userInfo.token === jsonwebtoken generated)

      2. when you visit a protected route, assign an Authorization header value which
         starts with "Bearer" (Authorization header value is created on frontend, when
         you trigger a request of a protected route, the value of the jsonwebtoken
         is the same as the Authorization header value, we just appended "Bearer")

      3. assign value to req.user upon triggering the "protect" middleware

      4. check if your authority is valid to visit a specific route (normal vs admin user),
         made possible with "admin" middleware, verify if req.user exists, then,
         check if that user has isAdmin value set to true which indicates an
         admin role.
   */

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

export { protect, admin }