import { InjectModel } from '@nestjs/mongoose';
import { BaseRepo } from '../base.repo';
import { Model } from 'mongoose';
import { Payment, TPayment } from './payment.model';

export class PaymentRepo extends BaseRepo<TPayment> {
  constructor(
    @InjectModel(Payment.name) private readonly paymentModel: Model<TPayment>,
  ) {
    super(paymentModel);
  }
}
