import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ConfirmEmailDto,
  ForgetPasswordDto,
  LoginDto as SigninDto,
  ResetPasswordDto,
  SignupDto,
  UpdateUserDto,
  ChangePasswordDto,
} from './dto';
import { AuthService } from './auth.service';
import { Messages } from 'src/common/enum';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);
    return {
      success: true,
      message: 'User created successfully',
      data: user,
    };
  }

  @Post('/login')
  @HttpCode(200)
  async signin(@Body() signinDto: SigninDto) {
    const { accessToken, user } = await this.authService.signin(signinDto);

    return {
      success: true,
      message: 'Logged in successfully',
      accessToken,
      user,
    };
  }

  @Post('/confirm')
  @HttpCode(200)
  async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDto) {
    const result = await this.authService.confirmEmail(confirmEmailDto);
    return {
      success: true,
      ...result,
    };
  }

  @Post('forget-password')
  @HttpCode(200)
  async forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    await this.authService.forgetPassword(forgetPasswordDto);
    return {
      success: true,
      message: Messages.email.isSent,
    };
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);
    return {
      success: true,
      message: Messages.user.updatedSuccessfully,
    };
  }

  @Post('/resend')
  @HttpCode(200)
  async resendOtp(@Body() body: { email: string }) {
    const message = await this.authService.resendOtp(body.email);
    return {
      success: true,
      message,
    };
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: any) {
    return {
      success: true,
      user: req.user,
    };
  }

  @Patch('/profile/:id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.authService.updateUser(userId, updateUserDto);
  }

   @Patch('/change-password/:id')
  async changePassword(
    @Param('id') userId: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return await this.authService.changePassword(userId, dto);
  }
}
