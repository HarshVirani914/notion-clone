import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserSignupDto } from "../auth/dto/signupDto.dto";
import { UserLoginDto } from 'src/auth/dto/loginDto.dto';
import { User } from '../models/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateProfileDto } from './dto/updateProfileDto.dto';
import * as jwt from 'jsonwebtoken';
import { CommonService } from 'src/common/common.service';
import { BcryptService } from 'src/common/bcrypt.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        private readonly cloudinaryService: CloudinaryService,
        private readonly commonService: CommonService,
        private readonly bcryptService: BcryptService
    ) { }

    async verifyToken(token: string): Promise<boolean> {
        try {
            console.log("auth service roken ----",token)
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          // If the token is successfully verified, you can return true
          return true;
        } catch (error) {
          // If verification fails, you can handle the error here
          throw new UnauthorizedException('Invalid token');
        }
      }

    async createUser(imagePath: string, userSignupDto: UserSignupDto): Promise<string> {
        try {
            const { username, email, password, profile_image } = userSignupDto;
            const checkEmail = await this.userModel.findOne({ email })
            if (checkEmail) {
                return "Email is duplicate..";
            }
            
            const hashedPassword = await this.bcryptService.hash(password);

            const image_url = await this.cloudinaryService.uploadProfileImage(imagePath)

            const user= await this.userModel.create({
                username,
                email,
                password: hashedPassword,
                profile_image: image_url?.url,
            });

            const stripeCustomer=await this.commonService.createCustomer({email,name:username})
            await this.userModel.updateOne({_id:user._id},{$set:{customerId:stripeCustomer.id}})
            return "user register succesfully";
        } catch (error) {
            console.log('error', error)
            if (error.code == '11000') {
                throw new ConflictException('Duplicate data input')
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }


    async loginUser(userLoginDto: UserLoginDto): Promise<{ token: string, user: UserLoginDto }> {
        try {
            const { email, password } = userLoginDto;
            const user = await this.userModel.findOne({ email: email });
            if (user && (await bcrypt.compare(password, user.password))) {
                const token = this.jwtService.sign({ id: user._id });
                return { token, user };
            }
            else {
                throw new UnauthorizedException("Invalid Email And Password");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    async updateProfile(imagePath: string, updateProfileDto: UpdateProfileDto,currentUser): Promise<Object> {
        try {
            const { username, email, password, confirm_password, profile_image } = updateProfileDto;

            const user = await this.userModel.findById(currentUser.id).exec();
            if (!user) {
                throw new NotFoundException('User not found.');
            }
            const hashedPassword = await this.bcryptService.hash(password);

            const image_url = await this.cloudinaryService.uploadProfileImage(imagePath);
            user.profile_image = image_url?.url || profile_image; // Update profile image if new image is uploaded
           
            const updated_user = await this.userModel.findByIdAndUpdate(currentUser.id, { // Use findByIdAndUpdate to update existing user
                username,
                email,
                password: hashedPassword,
                profile_image: image_url?.url,
            },{new:true});

            return updated_user;
        } catch (error) {
            console.error('Error in updating profile: ', error);
            throw new InternalServerErrorException('Failed to update profile');
        }
    }

    async searchUserByName(name: string): Promise<User[]> {
        const users = await this.userModel.find({ username: { $regex: name, $options: 'i' } }).exec();
        if (!users || users.length === 0) {
            throw new NotFoundException('No users found with the provided name.');
        }
        return users;
    }

    async fetchUsers(): Promise<User[]> {
        try {
            const users = await this.userModel.find({},{password:-1}).exec();
            if (!users || users.length === 0) {
                throw new NotFoundException('No users found.');
            }
            return users;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch users.');
        }
    }

    async findUserById(userId: string): Promise<User> {
        try {
            const user = await this.userModel.findById(userId).exec();
            if (!user) {
                throw new NotFoundException('User not found.');
            }
            return user;
        } catch (error) {
            throw new InternalServerErrorException('Failed to find user.');
        }
    }

    async getUserByEmail(slug: string): Promise<User[]> {

        try {
            const users = await this.userModel.find({email:{$regex:new RegExp(`^${slug}`)}},{userId:"$_id",_id:0,email:1}); 
            return users
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch users.');
        }
    }
}
