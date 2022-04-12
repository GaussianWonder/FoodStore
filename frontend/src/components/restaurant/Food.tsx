/* eslint-disable no-unused-vars */
import { useState } from 'react';
import useFirstImage from '../../hooks/unsplash/useFirstImage';
import { useAppDispatch, useAuthSelector } from '../../store';
import { errorNotification } from '../../store/notification';
import FoodType from '../../types/food';
import { numberSetter, stringSetter } from '../../utils/events';
import { expectJson, expectOk } from '../../utils/promise';
import AcceptReject from '../button/AcceptReject';
import EditStrip from '../button/EditStrip';
import IconAt from '../icons/IconAt';
import IconT from '../icons/IconT';
import IconTag from '../icons/IconTag';
import Loader from '../loader/Loader';
import TooltipModal from '../modal/TooltipModal';
import { Input, InputContainer } from '../styled/Inputs';
import Category from './Category';

export interface FoodSelfProps {
  editable: boolean;
  updateSignal: (food: FoodType) => void;
  deleteSignal: (id: number) => void;
}
export type FoodProps = FoodType & FoodSelfProps;
const Food = ({ id, editable, name, description, price, category, updateSignal, deleteSignal }: FoodProps) => {
  const {
    subject: [image],
    isLoading: isImageLoading,
  } = useFirstImage(name);

  const auth = useAuthSelector();
  const appDispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [newName, setNewName] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [newPrice, setNewPrice] = useState<number>(0);

  const resetInput = () => {
    setNewName(name);
    setNewDescription(description);
    setNewPrice(price);
    // (document.getElementById(`food-name-${id}`) as HTMLInputElement).value = name;
    // (document.getElementById(`food-description-${id}`) as HTMLInputElement).value = description;
    // (document.getElementById(`food-price-${id}`) as HTMLInputElement).value = price.toString();
  }

  const changeEditingStateTo = (editingState: boolean) => {
    resetInput();
    setIsEditing(editingState);
  }

  const updateFood = () => {
    setIsLoading(true);
    fetch(`http://localhost:8080/foods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({
        id: id,
        name: newName,
        description: newDescription,
        price: newPrice,
      }),
    })
      .then(expectJson)
      .then((newF: FoodType) => {
        updateSignal(newF);
        changeEditingStateTo(false);
      })
      .catch((error) => {
        appDispatch(
          errorNotification({
            error,
            id: 'delete-food',
            title: 'Delete a food',
            message: 'There was an error while trying to delete your food',
          }),
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteFood = () => {
    setIsLoading(true);
    fetch(`http://localhost:8080/foods/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then(expectOk)
      .then(() => deleteSignal(id))
      .catch((error) => {
        appDispatch(
          errorNotification({
            error,
            id: 'delete-food',
            title: 'Delete a food',
            message: 'There was an error while trying to delete your food',
          }),
        );
      })
      .finally(() => {
        setIsLoading(true);
      });
  }

  if (isEditing) {
    return (
      <div className=''>
        <InputContainer>
          <Input
            id={`food-name-${id}`}
            type="text"
            placeholder="Enter food name"
            disabled={isLoading}
            onChange={stringSetter(setNewName)}
          />

          <span className="absolute inset-y-0 inline-flex items-center right-4">
            <IconAt />
          </span>
        </InputContainer>

        <InputContainer>
          <Input
            id={`food-description-${id}`}
            type="text"
            placeholder="Enter description"
            disabled={isLoading}
            onChange={stringSetter(setNewDescription)}
          />

          <span className="absolute inset-y-0 inline-flex items-center right-4">
            <IconT />
          </span>
        </InputContainer>

        <InputContainer>
          <Input
            id={`food-price-${id}`}
            type="number"
            placeholder="Enter price"
            disabled={isLoading}
            onChange={numberSetter(setNewPrice)}
          />

          <span className="absolute inset-y-0 inline-flex items-center right-4">
            <IconTag />
          </span>
        </InputContainer>

        <div className="flex items-center justify-center pt-4">
          <AcceptReject
            onAccept={updateFood}
            onReject={() => changeEditingStateTo(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-96 grow flex flex-col items-start overflow-x-hidden scrollbar-hide overflow-y-auto rounded-2xl border border-gray-100 shadow hover:ring ring-gray-200"      
    >
      {image && !isImageLoading && (
        <img
          className="object-cover w-full h-56"
          src={image.urls.small}
          alt={image.description}
        />
      )}
      {(!image || isImageLoading) && (
        <div className="object-cover w-full h-56 flex items-center justify-center">
          <Loader />
        </div>
      )}

      <p className="text-xs font-thin text-gray-500 ml-4 mt-1 w-full">{ image?.description ?? '' }</p>

      <div className="px-4 py-2 bg-white">

        <h5 className="text-normal font-medium text-gray-700">{ name }</h5>

        <h5 className="text-normal font-bold text-gray-800">{ price }</h5>

        <p className="mt-1 text-sm font-normal text-gray-500">{ description }</p>

        <Category
          id={category.id}
          name={category.name}
          description={category.description}
        />
      </div>
      
      { editable && 
        <div>
          <TooltipModal
            activator={
              <div className='border-2 border-black border-opacity-30 rounded-full p-1'>
                <div className='opacity-30 hover:opacity-100 transition-opacity duration-100 ease-out'>
                  <EditStrip
                    onEdit={() => changeEditingStateTo(true)}
                    onDelete={deleteFood}
                  />
                </div>
              </div>
            }
            position={{
              left: 17,
              top: -5,
              unit: 'rem',
            }}
          />
        </div>
      }
    </div>
  );
};

Food.defaultProps = {
  editable: false,
  updateSignal: () => {},
  deleteSignal: () => {},
};

export default Food;
