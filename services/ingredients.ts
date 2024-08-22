import { axiosInstance } from '@/services/instance';
import { Ingridient, Product } from '.prisma/client';
import { ApiRoutes } from '@/services/constants';

export const getAllIngredients = async () => {
    const { data } = await axiosInstance.get<Ingridient[]>(
        ApiRoutes.GET_INGREDIENTS
    );
    return data;
};
