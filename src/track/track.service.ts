/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.shema';
import { CreateTrackDto } from './dto/create-track.dto';
import * as mongoose from 'mongoose';

// В сервисах мы описываем логику
@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(dto: CreateTrackDto): Promise<Track> {
    const track = new this.trackModel({ ...dto, listens: 0 });
    return track.save();
  }

  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find().exec();
    return tracks;
  }

  async getSingle(id: mongoose.Schema.Types.ObjectId): Promise<Track> {
    // Если требуется полноценный промис - то можно юзать .exec()
    const track = await this.trackModel.findById(id).exec();
    return track;
  }

  async delete(
    id: mongoose.Schema.Types.ObjectId,
  ): Promise<mongoose.Schema.Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }
}
