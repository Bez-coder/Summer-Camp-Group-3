import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JwtGenerator = (id) => {
  const payload = {
    user: id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1hr' });
};

export default JwtGenerator;