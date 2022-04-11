import { FileService, FileType } from 'src/file/file.service';
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.shema';
import { CreateTrackDto } from './dto/create-track.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

// В сервисах мы описываем логику
@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private FileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = this.FileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.FileService.createFile(FileType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      picture: picturePath,
      audio: audioPath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(offset).limit(count);
    return tracks;
  }

  async getSingle(id: ObjectId): Promise<Track> {
    // Если требуется полноценный промис - то можно юзать .exec()
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save(); // без await тк нам по сути не важен результат выполнения функции save
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      $or: [
        { name: { $regex: new RegExp(query, 'i') } },
        { artist: { $regex: new RegExp(query, 'i') } },
      ],
    });
    return tracks;
  }
}
