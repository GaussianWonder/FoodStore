/* eslint-disable no-unused-vars */
import CategoryType from "../../types/category";
import IconCategory from "../icons/IconCategory";

export interface CategorySelfProps {
}
export type CategoryProps = CategoryType & CategorySelfProps;
const Category = ({ name, description }: CategoryProps) => {
  return (
    <div className="block p-2 border border-gray-100 shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200">
      <IconCategory />
      <h6 className="mt-1 font-bold">{ name }</h6>
      <p className="hidden sm:mt-1 sm:text-sm sm:text-gray-600 sm:block">{ description }</p>
    </div>
  );
};

export default Category;
