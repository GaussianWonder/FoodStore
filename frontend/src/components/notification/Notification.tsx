import { useMemo } from 'react';
import { useAppDispatch } from '../../store';
import { NotificationDisplay, Notification as StoreNotification, removeNotification } from '../../store/notification';
import { toShortDate } from '../../utils/date';
import IconCheck from '../icons/IconCheck';
import IconInfo from '../icons/IconInfo';
import IconX from '../icons/IconX';

interface NotificationOwnProps {
  truncateText?: boolean;
  local?: boolean;
}

export type NotificationProps = NotificationDisplay &
  NotificationOwnProps & {
    id: StoreNotification['id'];
  };

// eslint-disable-next-line no-unused-vars
const Notification = ({ id, title, message, code, truncateText, date, local }: NotificationProps) => {
  const appDispatch = useAppDispatch();

  const iconType = useMemo(() => {
    if (code >= 200 && code < 300) {
      // Ok
      return <IconCheck />;
    } else if (code < 400) {
      // Redirect or Info
      return <IconInfo />;
    } else {
      // Error
      return <IconX />;
    }
  }, [code]);

  const deleteNotification = () => {
    if (local) return;

    appDispatch(removeNotification(id));
  };

  return (
    <div className="w-full p-3 mt-4 bg-white rounded flex items-center">
      <div
        className="focus:outline-none w-8 h-8 border rounded-full border-indigo-200 flex flex-shrink-0 items-center justify-center cursor-pointer"
        onClick={deleteNotification}
      >
        {iconType}
      </div>
      <div className="pl-3 w-full flex flex-col gap-1 text-gray-600">
        <h5 className="font-medium text-md text-gray-700">{title}</h5>
        {truncateText ? (
          <p className="w-sm max-w-sm truncate focus:outline-none text-sm leading-none">{message}</p>
        ) : (
          <p className="focus:outline-none text-sm leading-none">{message}</p>
        )}
        <p className="flex gap-1">
          <span className="text-sm font-thin text-gray-400">{id}</span>
          <span className="text-sm font-light text-gray-400">{code}</span>
          <span className="text-sm font-light text-gray-400">{toShortDate(date)}</span>
        </p>
      </div>
    </div>
  );
};

Notification.defaultProps = {
  truncateText: true,
  local: false,
};

export default Notification;
