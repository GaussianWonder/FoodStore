import { useState } from 'react';
import { expectObject } from '../../utils/promise';
import {
  toSingleImage,
  unsplashFetchUrl,
  unsplashHeaders,
  UnsplashImage,
  unsplashImageOpts,
  UnsplashImageSearchResponse,
} from '../../utils/unsplash';
import useHasSubject, { UseHasSubjectProps } from '../useHasSubject';

const useFirstImage = (imageName: string) => {
  const fetchOpts = unsplashImageOpts(imageName);
  const [opts, setOpts] = useState<UseHasSubjectProps<UnsplashImageSearchResponse, UnsplashImage | null>>({
    resource: unsplashFetchUrl(fetchOpts),
    options: {
      method: 'GET',
      headers: unsplashHeaders,
    },
    resolver: expectObject,
    mapper: toSingleImage,
  });
  const subjectFetch = useHasSubject(opts);

  return {
    ...subjectFetch,
    opts: [opts, setOpts] as const,
  };
};

export default useFirstImage;
