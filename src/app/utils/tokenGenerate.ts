import jwt, { JwtPayload } from 'jsonwebtoken';
import { ConfigFile } from '../../config';
export const accessTokenGenerate = (jwtPayload: JwtPayload, expire: string) => {
  const result = jwt.sign(jwtPayload, ConfigFile.JWT_ACCESS_SECRET as string, {
    expiresIn: expire,
  });
  return result;
};

export const refreshTokenGenerate = (jwtPayload: JwtPayload, expire: string) => {
  const result = jwt.sign(jwtPayload, ConfigFile.JWT_REFRESH_SECRET as string, {
    expiresIn: expire,
  });
  return result;
};
