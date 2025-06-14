import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('initiate')
    async initiate(@Body() body: any) {
        const { userId, courseId, amount } = body;
        const payment = await this.paymentService.initiatePayment(userId, courseId, amount)
        return {
            message: "payment initiated successfully",
            statusCode: 201,
            data: payment
        }
        
    }

    @Post('update-status')
    async update(@Body() body: any) {
        const { transactionId, status } = body;
        const payment = await this.paymentService.updatePaymentStatus(transactionId, status)
        return {
            message: "payment status updated successfully",
            statusCode: 201,
            data: payment
        }
    }

    @Get('transaction/:transactionId')
    async getStatus(@Param('transactionId') transactionId: string) {
        const status = await this.paymentService.getPaymentStatus(transactionId)
        return {
            message: "payment status retrieved successfully",
            statusCode: 200,
            data: status
        }
    }


    @Get('user/:userId')
    async getUserPayments(@Param('userId') userId: string) {
        const payments = await this.paymentService.getPaymentsByUser(userId)
        return{
            message:"payment reviewed successfully",
            statusCode:200,
            data:payments
        }
    }


    @Get('course/:courseId')
    async getCoursePayments(@Param('courseId') courseId: string) {
        const payments = await this.paymentService.getPaymentsByCourse(courseId)
        return{
            message:"payment reviewed successfully",
            statusCode:200,
            data:payments
        }
    }


    @Get('admin/all')
    async getAllPayments() {
        const payments = await this.paymentService.getAllPayments()
        return {
            message: "payment reviewed successfully",
            statusCode: 200,
            data: payments
        }
    }

}
