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
import { PostsService } from 'src/services/posts.service';
import { PostModel } from 'src/models/postModel';
import { Pagination } from 'src/common/pagination';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/')
  async findAll(): Promise<PostModel[]> {
    const posts = await this.postsService.findAll();
    return posts;
  }

  @Post('/')
  async create(@Body() dto: CreatePostDto): Promise<PostModel> {
    const post = await this.postsService.create(dto);
    return post;
  }

  @Post('/find')
  async findBy(@Body() dto: FindPostsDto): Promise<Pagination<PostModel>> {
    const posts = await this.postsService.findBy(dto);
    return posts;
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
  ): Promise<PostModel> {
    const post = await this.postsService.update(id, dto);
    return post;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.postsService.delete(id);
  }
}
