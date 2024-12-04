import axios from "axios";
import { cache } from "../utils/cache.js";
import { config } from "../config.js";
import type { PhotoResponse, PixabayImageResponse } from "../types/index.js";

export class PixabayService {
  private static instance: PixabayService;

  private constructor() {}

  public static getInstance(): PixabayService {
    if (!PixabayService.instance) {
      PixabayService.instance = new PixabayService();
    }
    return PixabayService.instance;
  }

  async getPhotos(count: number): Promise<PhotoResponse[]> {
    if (!Number.isInteger(count) || count < 3 || count > 200) {
      throw new Error("Count must be between 3 and 200");
    }

    const cacheKey = `photos_${count}`;
    const cachedPhotos = cache.get<PhotoResponse[]>(cacheKey);

    if (cachedPhotos) {
      return cachedPhotos;
    }

    try {
      const response = await axios.get<PixabayImageResponse>(
        config.pixabayBaseUrl,
        {
          params: {
            key: config.pixabayApiKey,
            per_page: count,
            safesearch: true,
          },
        }
      );

      if (!response.data.hits?.length) {
        return [];
      }

      const photos = response.data.hits.map((hit) => ({
        id: hit.id,
        previewUrl: hit.webformatURL,
        downloadUrl: hit.largeImageURL,
      }));

      cache.set(cacheKey, photos, 86400); // for 24 hrs
      return photos;
    } catch {
      throw new Error("Failed to fetch photos");
    }
  }
}
