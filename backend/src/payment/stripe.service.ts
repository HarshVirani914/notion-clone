import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Payment } from '../models/stripe.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private configService: ConfigService,
        @InjectModel('Payment') private paymentModel: Model<Payment>,
        private readonly commonService: CommonService
    ) {}

    async createCheckoutSession(): Promise<string> {
        try {
            
            const session=  await this.commonService.createCheckoutSession({customerId:"cus_Q3E365HFVGBp5V",accountId:""})
            return session.url;

        } catch (error) {
            throw new Error('Error creating checkout session');
        }
    }

    async storePayment(userId: string, username: string, email: string, amount: string): Promise<void> {
        console.log(userId,
            username,
            email,
            amount);

        const payment = new this.paymentModel({
            userId,
            username,
            email,
            amount
        });
        await payment.save();
    }


  async createPayment(paymentData: Payment): Promise<Payment> {
    try
    {
        const createdPayment = new this.paymentModel(paymentData);
        return createdPayment.save();
    }
    catch(err)
    {
        console.log(err);
        
    }
  }

  async getAllPaymentsByUserId(userId: string): Promise<Payment[]> {
    try
    {
        return this.paymentModel.find({ userId }).exec();
    }
    catch(err)
    {
        throw new Error('Error in fetching data');
    }
  }
}
