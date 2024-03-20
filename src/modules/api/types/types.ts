export type IUser = {
  name: string;
  email: string;
  password: string;
}

export type User = Pick<IUser, "email" | "name" | "password"> & {
  id: number;
}

export type IPost = {
  title: string;
  content: string;
  published: boolean,
  authorId: number;
}

export type IComment = {
  content: string;
  postId: number;
}