import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Bobogok:gg73w8@cluster0.dsvls.mongodb.net/player?retryWrites=true&w=majority',
    ),
    TrackModule,
    FileModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
