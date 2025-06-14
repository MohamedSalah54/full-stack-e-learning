import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { StripeModule } from '../stripe/stripe.module';
import { PaymentModel } from 'src/db/payment/payment.model';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    PaymentModel,
    StripeModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
