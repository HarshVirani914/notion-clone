import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from '../models/document.schema';
import { UserSchema } from 'src/models/user.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TrashDocumentSchema } from '../models/trashDocument.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{ name: 'Document', schema: DocumentSchema }, { name: 'User', schema: UserSchema }, { name: 'TrashDocument', schema: TrashDocumentSchema }]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, CloudinaryService],
  exports : [DocumentService]
})
export class DocumentModule {}
