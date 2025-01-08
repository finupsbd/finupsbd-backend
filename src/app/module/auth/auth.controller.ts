/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';
import sendResponce from '../../utils/sendResponce';
import { ConfigFile } from '../../../config';


const signUp = catchAsync(async (req, res) => {
  const result = await AuthServices.signUp(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'You have been successfully registered.',
    statusCode: StatusCodes.CREATED,
    data: result,
  });
});

const validatePin = catchAsync(async (req, res) => {
  const result = await AuthServices.validatePin(req.body);

  //   res.status(StatusCodes.CREATED).json({
  //     success: true,
  //     message: 'User verify successfully please Login',
  //     statusCode: StatusCodes.CREATED,
  //     data: result,
  //   });
  sendResponce(res, StatusCodes.CREATED, 'User verify successfully', result);
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.login(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: ConfigFile.NODE_ENV === 'production',
    httpOnly: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User login successfully',
    statusCode: StatusCodes.OK,
    data: { accessToken },
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.body);

  sendResponce(
    res,
    StatusCodes.OK,
    'check your email for verification!',
    result
  );
});

const resetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.resetPassword(req.body);

  sendResponce(
    res,
    StatusCodes.OK,
    'Password Reset successfully please login',
    result
  );
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.refreshToken(refreshToken);

  sendResponce(res, StatusCodes.OK, 'Access Token is retrieve', result);
});

const logout = catchAsync(async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const {refreshToken} = req.cookies
  if (token) {
    res.clearCookie(refreshToken)
    // blacklistedTokens.add(token)    

    sendResponce(res, StatusCodes.OK, 'logout Successfully', {});
  }
});

export const AuthController = {
  signUp,
  validatePin,
  login,
  forgetPassword,
  resetPassword,
  refreshToken,
  logout,
};
