export interface BookResponse {
  kind: string;
  totalItems: number;
  items?: {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      averageRating: number | undefined;
      imageLinks:
        | {
            smallThumbnail: string | undefined;
            thumbnail: string | undefined;
          }
        | undefined;
      industryIdentifiers:
        | {
            type: string | undefined;
            identifier: string | undefined;
          }[]
        | undefined;
    };
  }[];
}
