import Food from './food';

export default interface Category {
  id: number;
  name: string;
  description: string;
  foods?: Food[];
}
