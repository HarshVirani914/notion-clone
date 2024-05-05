import { DynamicModule, Module } from '@nestjs/common';
import { PaymentController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from '../models/stripe.schema';
import { CommonService } from 'src/common/common.service';

@Module({
  imports: [ConfigModule, MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }]),],
  providers: [StripeService,CommonService],
  controllers: [PaymentController],
})


export class StripeModule {
 
}
