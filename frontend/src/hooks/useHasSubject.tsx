import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { expectJson, ResponseResolver } from '../utils/promise';

// eslint-disable-next-line no-unused-vars
export type Mapper<T, U> = (t: T) => U;
export type ForwardMapper<T> = Mapper<T, T>;
export function forwardMapper<T>(t: T): T {
  return t;
}

export interface UseHasSubjectProps<T, U = T> {
  resource: string;
  options?: RequestInit;
  resolver: ResponseResolver<T>;
  mapper: Mapper<T, U | null>;
}

export interface UseHasSubjectReturn<U> {
  has: [boolean, Dispatch<SetStateAction<boolean>>];
  subject: [U | null, Dispatch<SetStateAction<U | null>>];
  isLoading: boolean;
}

// eslint-disable-next-line no-unused-vars
export type UseHasSubjectHook<T, U = T> = (opts: UseHasSubjectProps<T, U>) => UseHasSubjectReturn<U>;

const useHasSubject = <T, U>(opts?: UseHasSubjectProps<T, U> | null) => {
  const { resource, options, resolver, mapper } = opts || {
    resource: '',
    resolver: expectJson,
    mapper: () => null,
  };

  const [hasSubject, setHasSubject] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subject, setSubject] = useState<U | null>(null);

  const setFromResponse = (rawSubject: T) => {
    setHasSubject(true);
    setSubject(mapper(rawSubject));
    setIsLoading(false);
  };

  const unsetSubject = () => {
    setHasSubject(false);
    setSubject(null);
    setIsLoading(false);
  };

  const fetchSubject = () => {
    if (!opts) return () => {};

    setIsLoading(true);
    const controller = new AbortController();
    const { signal } = controller;

    fetch(resource, {
      ...options,
      signal,
    })
      .then(resolver)
      .then(setFromResponse)
      .catch(unsetSubject);

    return () => {
      controller.abort();
      setIsLoading(false);
    };
  };

  // useEffect(fetchSubject, []);
  useMemo(fetchSubject, [resource, options]);
  // Resolver and mapper should stay static. There is no need for such dynamic and dramatic effects.

  return {
    has: [hasSubject, setHasSubject] as const,
    subject: [subject, setSubject] as const,
    isLoading,
  };
};

export default useHasSubject;
