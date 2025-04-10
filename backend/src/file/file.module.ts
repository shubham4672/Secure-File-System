import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { PrismaModule } from '../prisma/prisma.module';

// Define file module
@Module({
  imports: [PrismaModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
