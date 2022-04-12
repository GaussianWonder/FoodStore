import config from './dev-config';

export interface UnsplashImage {
  id: string;
  width: number;
  height: number;
  color: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
  };
  description: string;
}

export interface UnsplashImageSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

export interface UnsplashQueryOpts {
  page: number;
  perPage: number;
  query: string;
}

export const unsplashFetchUrl = ({ page = 1, perPage = 1, query }: UnsplashQueryOpts): string => {
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('per_page', perPage.toString());
  queryParams.append('query', query);
  return `https://api.unsplash.com/search/photos?${queryParams.toString()}`;
};

export const toSingleImage = (response: UnsplashImageSearchResponse): UnsplashImage | null => {
  if (!response || !response.results || !response.results.length) return null;
  return response.results[0];
};

export const unsplashImageOpts = (query: string): UnsplashQueryOpts => ({
  page: 1,
  perPage: 1,
  query: query,
});

export const unsplashHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Client-ID ${config.unsplash.accessKey}`,
};
