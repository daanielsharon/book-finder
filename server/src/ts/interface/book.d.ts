export interface BookResponse {
  kind: string;
  totalItems: number;
  items: {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      averageRating: number;
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
      };
    };
  }[];
}
