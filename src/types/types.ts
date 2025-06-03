export interface Article {
  id: string;
  timeStamp: number;
  articleTitle: string;
  content: string;
  pictureUrl: string;
  author: string;
  comments: number;
}

export interface NewArticleFormData {
  articleTitle: string;
  content: string;
  image: File | string | null;
}
