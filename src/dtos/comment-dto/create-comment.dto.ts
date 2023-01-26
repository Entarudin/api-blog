export class CreateCommentDto {
  readonly userId: string;
  readonly postId: string;
  readonly text: string;
}
