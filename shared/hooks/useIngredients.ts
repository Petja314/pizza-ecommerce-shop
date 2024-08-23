import { useEffect, useState } from 'react';
import { Ingridient } from '.prisma/client';
import { useSet } from 'react-use';
import { Api } from '@/services/api-client';

export const useIngredients = () => {
   const [ingredients, setIngredients] = useState<Ingridient[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchIngredients() {
         try {
            setLoading(true);
            const ingredients = await Api.ingredients.getAllIngredients();
            setIngredients(ingredients);
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      }

      fetchIngredients();
   }, []);

   return {
      ingredients,
      loading,
   };
};
