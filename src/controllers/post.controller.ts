import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto, UpdatePostDto, FindPostsDto } from '../dtos/post-dto';
import { PostService } from 'src/services/post.service';
import { PostModel } from 'src/models/postModel';
import { Pagination } from 'src/common/typegoose';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostService) {}

  @Get('/')
  async findAll(): Promise<PostModel[]> {
    const posts = await this.postService.findAll();
    return posts;
  }

  @Post('/')
  async create(@Body() dto: CreatePostDto): Promise<PostModel> {
    const post = await this.postService.create(dto);
    return post;
  }

  @Post('/find')
  async findBy(@Body() dto: FindPostsDto): Promise<Pagination<PostModel>> {
    const posts = await this.postService.findBy(dto);
    return posts;
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ): Promise<PostModel> {
    const post = await this.postService.update(id, dto);
    return post;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.postService.delete(id);
  }
}
