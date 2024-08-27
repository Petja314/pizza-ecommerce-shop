import { axiosInstance } from '@/services/instance';
import { Cart } from '.prisma/client';
import { ApiRoutes } from '@/services/constants';
import { CartDto } from '@/services/dto/cart.dto';
import { CreateCartItemValues } from '@/shared/store/cart';

export const getCart = async (): Promise<Cart> => {
   const { data } = await axiosInstance.get<Cart>(ApiRoutes.GET_CART);
   return data;
};
export const updateItemQuantity = async (
   itemId: number,
   quantity: number
): Promise<CartDto> => {
   const { data } = await axiosInstance.patch<CartDto>(
      `${ApiRoutes.GET_CART}/${itemId}`,
      { quantity }
   );
   return data;
};

export const removeCartItem = async (id: number) => {
   const { data } = await axiosInstance.delete(`${ApiRoutes.GET_CART}/${id}`);
   return data;
};

export const addCartItem = async (values: CreateCartItemValues) => {
   const { data } = await axiosInstance.post<CartDto>(`${ApiRoutes.GET_CART}`, {
      ...values,
   });
   return data;
};
