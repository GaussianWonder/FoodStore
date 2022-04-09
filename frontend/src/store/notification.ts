import { createAction, createReducer } from "@reduxjs/toolkit";

export const persistNotifications = (notifications: Notification[]) => {
  window.localStorage.setItem('notifications', JSON.stringify(notifications));
}

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
}

export const removePersistedNotifications = () => {
  window.localStorage.removeItem('notifications');
}

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

export const newNotification = createAction<Notification, 'notification/new'>('notification/new');
export const removeNotification = createAction<Notification['id'], 'notification/remove'>('notification/remove');

export default createReducer(initState, (builder) => (
  builder
    .addCase(newNotification, (state, action) => {
      state.array = [...state.array, action.payload];
      persistNotifications(state.array);
    })
    .addCase(removeNotification, (state, action) => {
      state.array = state.array.filter(notification => notification.id !== action.payload);
      persistNotifications(state.array);
    })
));
