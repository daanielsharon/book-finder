export interface BookResponse {
  id: string;
  title: string;
  authors: string[];
  rating?: number;
  thumbnail: {
    size: {
      small: string;
      normal: string;
    };
  };
}
