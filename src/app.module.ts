import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolsModule } from './schools/schools.module';

@Module({
  imports: [SchoolsModule, MongooseModule.forRoot(
    'mongodb+srv://shafaat200:8hs2JBssddN3A8GE@cluster0.npokwbg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
