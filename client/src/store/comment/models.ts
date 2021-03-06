import { Opinion, AddOpinionData } from "../models";

export interface Comment extends Opinion {
  post: string;
  subCommentsCount: number;
}

export type CommentsById = {
  [id: string]: Comment;
};

export interface AddCommentData extends AddOpinionData {
  postId: string;
}
