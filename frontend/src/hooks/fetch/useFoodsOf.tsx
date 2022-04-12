import { useEffect, useState } from 'react';
import { useAuthSelector } from '../../store';
import Food from '../../types/food';
import { expectObject } from '../../utils/promise';
import useHasSubject, { forwardMapper, UseHasSubjectProps } from '../useHasSubject';

export interface UseFoodOfHook {
  id?: number;
}

const useFoodsOf = ({ id }: UseFoodOfHook) => {
  const auth = useAuthSelector();
  const [opts, setOpts] = useState<UseHasSubjectProps<Food[]> | null>(null);
  const subjectFetch = useHasSubject(opts);

  useEffect(() => {
    if (id) {
      setOpts({
        resource: `http://localhost:8080/foods/${id}`,
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
    }
  }, [id]);

  return {
    ...subjectFetch,
    opts: [opts, setOpts] as const,
  };
};

export default useFoodsOf;
