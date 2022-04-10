import Food from "./food";

export default interface Restaurant {
  id: number;
  name: string;
  foodList: Food[];
  // user field can be ignored
}
