import styled from "styled-components";

export interface InputContainerProps {}
export const InputContainer = styled.div.attrs({
  className: 'relative mt-2 bg-gray-50 border border-gray-200 shadow rounded-md p-2 w-[300px]',
})<InputContainerProps>``;

export const Input = styled.input.attrs({
  className: 'w-full pr-12 text-sm border-gray-200 rounded-lg shadow-sm disabled:opacity-30',
})``;