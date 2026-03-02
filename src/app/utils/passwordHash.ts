import bcrypt from 'bcrypt';
import { ConfigFile } from '../../config';

export const passwordHash = async (password: string) => {
  console.log(password);
  const result = await bcrypt.hash(password, Number(ConfigFile.BCRYPT_SALT_ROUNDS));
  return result;
};

export const comparePassword = async (myPlaintextPassword: string, hashPassword: string) => {
  console.log(myPlaintextPassword, hashPassword);
  const result = await bcrypt.compare(myPlaintextPassword, hashPassword);
  return result;
};
