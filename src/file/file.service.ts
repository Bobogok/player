import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop(); //достаем расширение файла
      const fileName = uuid.v4() + '.' + fileExtension; // создаем новое название
      const filePath = path.resolve(__dirname, '..', 'static', type); // закидываем в папку со статикой

      if (!fs.existsSync(filePath)) {
        // проверим на существование папки, если что создаем новую
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeFile(fileName: string) {}
}
