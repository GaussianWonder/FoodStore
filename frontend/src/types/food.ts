import Category from './category';

export default interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
}
