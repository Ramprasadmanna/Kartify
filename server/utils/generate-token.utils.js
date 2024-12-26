import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    // expiresIn: '10s',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure:  process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000,
    // maxAge: 10 * 1000,
  });
};

export default generateToken;