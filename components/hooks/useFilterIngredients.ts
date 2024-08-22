'use client';
import { Ingridient } from '.prisma/client';
import { useEffect, useState } from 'react';
import { Api } from '@/services/api-client';
import { useSet } from 'react-use';

interface ReturnProps {
    selectedIngredients: Set<string>;
    ingredients?: Ingridient[];
    loading: boolean;
    onAddId: () => void;
}

export const useIngredients = () => {
    const [ingredients, setIngredients] = useState<Ingridient[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

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
        onAddId: toggle,
        selectedIngredients,
    };
};
