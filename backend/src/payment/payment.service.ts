import { Injectable, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StripeService } from '../stripe/stripe.service';
import { Payment, TPayment } from 'src/db/payment/payment.model';

@Injectable()
export class PaymentService {
    constructor(
        private readonly stripeService: StripeService,
        @InjectModel(Payment.name) private paymentModel: Model<TPayment>,
    ) { }

    async initiatePayment(userId: string, courseId: string, amount: number) {
        try {
            // Basic validation
            if (!userId || !courseId || !amount || amount <= 0) {
                throw new BadRequestException('Missing or invalid payment data');
            }

            const paymentIntent = await this.stripeService.createPaymentIntent(amount);

            const payment = await this.paymentModel.create({
                userId,
                courseId,
                amount,
                status: 'pending',
                paymentMethod: 'stripe',
                transactionId: paymentIntent.id,
            });

            return {
                clientSecret: paymentIntent.client_secret,
                payment,
            };
        } catch (error) {
            console.error('Error initiating payment:', error.message);
            throw new InternalServerErrorException('Failed to initiate payment');
        }
    }

    async updatePaymentStatus(transactionId: string, status: string) {
        try {
            if (!transactionId || !status) {
                throw new BadRequestException('Transaction ID and status are required');
            }

            const validStatuses = ['paid', 'pending', 'failed'];
            if (!validStatuses.includes(status)) {
                throw new BadRequestException('Invalid payment status');
            }

            const payment = await this.paymentModel
                .findOne({ transactionId })
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title description')
            if (!payment) {
                throw new NotFoundException('Payment not found');
            }

            payment.status = status;
            await payment.save();

            return {
                message: 'Payment status updated successfully',
                payment,
            };
        } catch (error) {
            console.error('Error updating payment status:', error.message);
            throw error instanceof BadRequestException || error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to update payment status');
        }
    }

    async getPaymentStatus(transactionId: string) {
        try {
            if (!transactionId) {
                throw new BadRequestException('Transaction ID is required');
            }

            const payment = await this.paymentModel
                .findOne({ transactionId })
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title description')
            if (!payment) {
                throw new NotFoundException('Payment not found');
            }

            return {
                status: payment.status,
                courseId: payment.courseId,
                userId: payment.userId,
                amount: payment.amount,
            };
        } catch (error) {
            console.error('Error fetching payment status:', error.message);
            throw error instanceof BadRequestException || error instanceof NotFoundException
                ? error
                : new InternalServerErrorException('Failed to fetch payment status');
        }
    }

    async getPaymentsByUser(userId: string) {
        try {
            if (!userId) {
                throw new BadRequestException('User ID is required');
            }

            return await this.paymentModel
                .find({ userId })
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title description')
        } catch (error) {
            console.error('Error fetching user payments:', error.message);
            throw new InternalServerErrorException('Failed to fetch user payments');
        }
    }

    async getPaymentsByCourse(courseId: string) {
        try {
            if (!courseId) {
                throw new BadRequestException('Course ID is required');
            }

            return await this.paymentModel
                .find({ courseId })
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title description')
        } catch (error) {
            console.error('Error fetching course payments:', error.message);
            throw new InternalServerErrorException('Failed to fetch course payments');
        }
    }

    async getAllPayments() {
        try {
            return await this.paymentModel
                .find()
                .populate('userId', 'firstName lastName email')
                .populate('courseId', 'title description')
        } catch (error) {
            console.error('Error fetching all payments:', error.message);
            throw new InternalServerErrorException('Failed to fetch all payments');
        }
    }
}
