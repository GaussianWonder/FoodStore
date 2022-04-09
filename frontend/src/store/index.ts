import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './auth';
import notificationReducer from './notification'

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


export const useAuthSelector = () => useSelector((state: RootState) => state.auth);
export const useNotificationSelector = () => useSelector((state: RootState) => state.notification);
