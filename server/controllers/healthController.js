export const getHealth = (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    version: '0.1.0',
  })
}
