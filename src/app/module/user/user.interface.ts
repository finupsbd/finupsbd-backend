

export type TUser = {
  name: string;
  userId: string;
  email: string;
  phone: string;
  password: string;
  pin: string;
  pinExpiry: Date;
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive?: boolean;
};
