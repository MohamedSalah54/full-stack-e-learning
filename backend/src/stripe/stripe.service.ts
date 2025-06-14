// stripe/stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
  }

  async createPaymentIntent(amount: number, currency = 'usd') {
    return this.stripe.paymentIntents.create({
      amount: amount * 100, 
      currency,
      payment_method_types: ['card'],
    });
  }
}
