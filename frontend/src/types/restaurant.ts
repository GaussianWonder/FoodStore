import { User } from '../store/auth';
import Food from './food';

export default interface Restaurant {
  id: number;
  name: string;
  foodList: Food[];
  user: User,
  // user field can be ignored
}
