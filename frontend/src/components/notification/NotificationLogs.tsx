import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useDetectRightEdge from "../../hooks/onRightEdge";
import { useNotificationSelector } from "../../store";
import { Notification as StoreNotification } from "../../store/notification";
import IconBell from "../icons/IconBell";
import IconX from "../icons/IconX";
import Notification from "./Notification";

interface ContainerProps {
  isFocused: boolean;
  isActive: boolean;
}
const Container = styled.div.attrs({
  className: 'w-screen h-screen top-0 fixed z-40',
})<ContainerProps>`
  ${props => !props.isActive && `opacity: 0; pointer-events: none;`}
  ${props => props.isActive && `opacity: 100;`}
  ${props => !props.isFocused && `backdrop-filter: blur(2px);`}
  ${props => props.isFocused && `backdrop-filter: blur(5px); pointer-events: auto;`}
  z-index: 42;
  transition: all 0.1s ease-in-out;
`;

interface ToggleContainerProps {
  show: boolean;
}
const ToggleContainer = styled.div.attrs({
  className: 'w-screen fixed top-10 left-0 flex flex-row-reverse',
})<ToggleContainerProps>`
  ${props => !props.show && `transform: translate(30px, 0px);`}
  ${props => props.show && `transform: translate(-30px, 0px);`}
  transition: all 0.1s ease-in-out;
  z-index: 41;
`;

const NotificationLogs = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const logContainer = useRef(null);
  const [showToggle] = useDetectRightEdge();

  const notifications = useNotificationSelector();

  const [focusedNotification, setFocusedNotification] = useState<StoreNotification | null>(null);

  const focusNotification = (index: number) => {
    setIsFocused(true);
    setFocusedNotification(notifications.array[index])
  }

  const unfocusNotification = () => {
    setIsFocused(false);
    setFocusedNotification(null);
  }

  useEffect(() => {
    unfocusNotification();
  }, [notifications]);

  return (
    <div className="fixed top-0 left-0 z-40">
      <ToggleContainer show={showToggle && !isActive}>
        <div
          className="absolute cursor-pointer translate-y-1/2 bg-white"
          onClick={() => setIsActive(true)}
        >
          <IconBell />
        </div>
      </ToggleContainer>
      <Container
        isFocused={isFocused}
        isActive={isActive}
      >
        <div ref={logContainer} className="w-full absolute right-0 flex flex-row-reverse">
          {/* Log container */}
          <div className="w-2xl bg-gray-50 h-screen p-8 border border-gray-200 shadow">
            <div className="flex items-center justify-between">
              <p className="focus:outline-none text-2xl font-semibold leading-6 text-gray-800">Logs</p>
              <button
                role="button"
                aria-label="close modal"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-md cursor-pointer flex items-center justify-center"
                onClick={() => setIsActive(false)}
              >
                <IconX />
              </button>
            </div>

            {
              notifications.array.map(({ id, display: {title, message, code, date} }, index) => (
                <div
                  key={`notification-${id}-${index}`}
                  onMouseEnter={() => focusNotification(index)}
                  onMouseLeave={() => unfocusNotification()}
                >
                  <Notification
                    id={id}
                    title={title}
                    message={message}
                    code={code}
                    date={date}
                  />
                </div>
              ))
            }

            { !notifications.array.length &&
              <Notification
                id='empty'
                title='No notifications'
                message='Do something to get started'
                code={0}
                date={new Date()}
                local={true}
              />
            }

          </div>
          { isFocused && focusedNotification &&
            <div className="hidden md:flex flex-col items-center justify-center m-auto p-4 rounded-lg shadow border border-gray-100 bg-white">
              <span className="text-gray-700"> { focusedNotification.display.date.toDateString() } </span>
              <Notification
                id={focusedNotification.id}
                title={focusedNotification.display.title}
                message={focusedNotification.display.message}
                code={focusedNotification.display.code}
                date={focusedNotification.display.date}
                truncateText={false}
              />
            </div>
          }
        </div>
      </Container>
    </div>
  );
}

export default NotificationLogs;