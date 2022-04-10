import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Bobogok:gg73w8@cluster0.dsvls.mongodb.net/player?retryWrites=true&w=majority',
    ),
    TrackModule,
  ],
})
export class AppModule {}
