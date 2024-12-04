export interface PhotoResponse {
  id: number;
  previewUrl: string;
  downloadUrl: string;
}

export interface PixabayImageResponse {
  hits: Array<{
    id: number;
    webformatURL: string;
    largeImageURL: string;
  }>;
}

export interface Order {
  email: string;
  fullName: string;
  fullAddress: string;
  imageUrls: string[];
  frameColor: string;
  userId: string;
}
