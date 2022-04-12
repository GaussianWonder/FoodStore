import { createAction, createReducer } from '@reduxjs/toolkit';
import { errorMessages, ResponseError } from '../utils/promise';

export const persistNotifications = (notifications: Notification[]) => {
  window.localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const getPersistedNotifications = (): Notification[] => {
  const rawArray = window.localStorage.getItem('notifications');

  if (!rawArray) return [];
  try {
    return JSON.parse(rawArray).map((raw: Record<keyof Notification, any>) => {
      return {
        ...raw,
        display: {
          ...raw.display,
          date: new Date(raw.display.date),
        },
      } as Notification;
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const removePersistedNotifications = () => {
  window.localStorage.removeItem('notifications');
};

export interface NotificationDisplay {
  title: string;
  message: string;
  code: number;
  date: Date;
}

export interface Notification {
  id: string;
  display: NotificationDisplay;
}

export interface NotificationsState {
  array: Notification[];
}

const initState: NotificationsState = {
  array: getPersistedNotifications(),
};

export interface ErrorNotificationConstructor {
  error: ResponseError;
  id: Notification['id'];
  title: Notification['display']['title'];
  message?: Notification['display']['message'];
}

export const errorNotification = createAction<ErrorNotificationConstructor, 'notification/error'>('notification/error');
export const newNotification = createAction<Notification, 'notification/new'>('notification/new');
export const removeNotification = createAction<Notification['id'], 'notification/remove'>('notification/remove');

export default createReducer(initState, (builder) =>
  builder
    .addCase(newNotification, (state, action) => {
      state.array = [...state.array, action.payload];
      persistNotifications(state.array);
    })
    .addCase(removeNotification, (state, action) => {
      state.array = state.array.filter((notification) => notification.id !== action.payload);
      persistNotifications(state.array);
    })
    .addCase(errorNotification, (state, action) => {
      const { error, id, title, message } = action.payload;
      const errorNotification: Notification = {
        id,
        display: {
          title,
          message: errorMessages(error.json) ?? message ?? 'Error while trying to perform request',
          code: error.response.status,
          date: new Date(),
        },
      };
      state.array = [...state.array, errorNotification];
      persistNotifications(state.array);
    }),
);
