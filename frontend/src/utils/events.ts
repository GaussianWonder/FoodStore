import { ChangeEvent, MouseEventHandler } from 'react';

export const stopMouseEvent: MouseEventHandler<any> = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

export const stringSetter =
  (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

export const numberSetter =
  (setter: React.Dispatch<React.SetStateAction<number>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(+e.target.value);
  };

// eslint-disable-next-line no-unused-vars
type InputResultMapper<T> = (value: string) => T;

export const inputSetter =
  <T>(setter: React.Dispatch<React.SetStateAction<T>>, mapper: InputResultMapper<T>) =>
  (e: ChangeEvent<any>) => {
    setter(mapper(e.target.value));
  };
