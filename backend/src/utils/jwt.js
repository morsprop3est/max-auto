import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: true }, JWT_SECRET, { expiresIn: '7d' })
}
export const verifyToken = (token) => jwt.verify(token, JWT_SECRET)