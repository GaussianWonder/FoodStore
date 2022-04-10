import { useState } from 'react';
import { useAuthSelector } from '../../store';
import Restaurant from '../../types/restaurant';
import { expectObject } from '../../utils/promise';
import useHasSubject, { forwardMapper, UseHasSubjectProps } from '../useHasSubject';

const useHasRestaurant = () => {
  const auth = useAuthSelector();
  const [opts, setOpts] = useState<UseHasSubjectProps<Restaurant>>({
    resource: 'http://localhost:8080/admin/restaurant',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`,
      },
    },
    resolver: expectObject,
    mapper: forwardMapper,
  });

  return {
    ...useHasSubject(opts),
    opts: [opts, setOpts] as const,
  };
};

export default useHasRestaurant;
