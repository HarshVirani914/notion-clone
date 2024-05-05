import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user.schema';
import { PageController } from './page.controller';
import { PageService } from './page.service';
import { PageSchema } from './dto/Page.dto';
import { JwtUserMiddleware } from 'src/auth/auth.middleware';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CommonService } from 'src/common/common.service';
// import { JwtStrategy } from 'src/auth/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Page', schema: PageSchema }, { name: 'User', schema: UserSchema }]),
  ],
  controllers: [PageController],
  providers: [PageService,AuthService,JwtService,CloudinaryService,CommonService]
})

export class PageModule {}
