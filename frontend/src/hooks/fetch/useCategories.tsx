import { useState } from 'react';
import { useAuthSelector } from '../../store';
import Category from '../../types/category';
import { expectObject } from '../../utils/promise';
import useHasSubject, { forwardMapper, UseHasSubjectProps } from '../useHasSubject';

const useCategories = () => {
  const auth = useAuthSelector();
  const [opts, setOpts] = useState<UseHasSubjectProps<Category[]>>({
    resource: 'http://localhost:8080/categories',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    },
    resolver: expectObject,
    mapper: forwardMapper,
  });
  const subjectFetch = useHasSubject(opts);

  return {
    ...subjectFetch,
    opts: [opts, setOpts] as const,
  };
};

export default useCategories;
