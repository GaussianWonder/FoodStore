import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export interface ActivatorPositionerProps {
  left: number;
  top: number;
  unit: 'px' | 'rem' | '%';
}
const ActivatorPositioner = styled.span<ActivatorPositionerProps>`
  position: absolute;
  ${({ left, unit }) => (left ? `margin-left: ${left}${unit};` : '')}
  ${({ top, unit }) => (top ? `margin-top: ${top}${unit};` : '')}
`;

ActivatorPositioner.defaultProps = {
  unit: 'px',
};

export interface TooltipModalProps {
  activator: JSX.Element;
  position: ActivatorPositionerProps;
}

const TooltipModal = ({ activator, children, position }: PropsWithChildren<TooltipModalProps>) => {
  return (
    <span className="relative">
      <ActivatorPositioner left={position.left} top={position.top} unit={position.unit} className="group">
        {activator}
        <div className="z-40 absolute scale-50 opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto group-hover:scale-100 duration-150 transform -translate-x-1/2">
          {children}
        </div>
      </ActivatorPositioner>
    </span>
  );
};

TooltipModal.defaultProps = {
  position: {
    left: 0.25,
    top: -0.25,
    unit: 'rem',
  },
};

export default TooltipModal;
