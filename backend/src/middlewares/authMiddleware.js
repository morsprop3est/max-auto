import { verifyToken } from '../utils/jwt.js'
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token required' })
  try {
    const decoded = verifyToken(token)
    if (!decoded || !decoded.isAdmin) return res.status(403).json({ message: 'Forbidden' })
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}