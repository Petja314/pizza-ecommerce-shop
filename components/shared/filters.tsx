'use client';
import React, { useEffect, useState } from 'react';
import { Title } from '@/components/shared/title';
import { cn } from '@/components/lib/utils';
import { Input } from '@/components/ui/input';
import { RangeSlider } from '@/components/shared/range-slider';
import { CheckboxFiltersGroups } from '@/components/shared/checkbox-filters-groups';
import { useIngredients } from '../hooks/useFilterIngredients';
import { Simulate } from 'react-dom/test-utils';
import { useSet } from 'react-use';

interface Props {
    className?: string;
    priceFrom?: number;
    priceTo?: number;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading, onAddId, selectedIngredients } =
        useIngredients();
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
        new Set<string>([])
    );
    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: 0,
        priceTo: 5000,
    });

    const items = ingredients.map((item) => ({
        value: String(item.id),
        text: item.name,
    }));
    const onChangeSetPrice = (name: keyof PriceProps, value: number) => {
        setPrice({
            ...prices,
            [name]: value,
        });
    };

    useEffect(() => {
        // console.log('selectedIngredients >', selectedIngredients);
        // console.log('pizzaTypes >', pizzaTypes);
        // console.log('sizes >', sizes);
        // console.log('selectedIngredients >', selectedIngredients);
    }, [prices, pizzaTypes, sizes, selectedIngredients]);

    return (
        <div className={cn('', className)}>
            <Title text={'Фильтрация'} className={'font-bold'}></Title>

            {/*TOP CHECKBOXES*/}
            <div className={'flex flex-col gap-4 mt-5'}>
                <CheckboxFiltersGroups
                    title={'Тип теста'}
                    name={'pizza type'}
                    className={'mt-5'}
                    selected={pizzaTypes}
                    onClickCheckbox={togglePizzaTypes}
                    items={[
                        { text: 'Тонкое', value: '1' },
                        { text: 'Традиционное', value: '2' },
                    ]}
                />

                <CheckboxFiltersGroups
                    title={'Размеры'}
                    name={'sizes'}
                    className={'mt-5'}
                    selected={sizes}
                    onClickCheckbox={toggleSizes}
                    items={[
                        { text: '20 cm', value: '20' },
                        { text: '30 cm', value: '30' },
                        { text: '40 cm', value: '40' },
                    ]}
                />
            </div>

            {/*FILTER*/}
            <div className={'mt-5 border-y border-y-neutral-100  py-6 pb-7'}>
                <p className={'font-bold mb-3'}>Цена от и до:</p>
                <div className={'flex gap-3 mb-5'}>
                    <Input
                        type={'number'}
                        placeholder={'0'}
                        min={0}
                        max={1000}
                        value={String(prices.priceFrom)}
                        onChange={(e) =>
                            onChangeSetPrice(
                                'priceFrom',
                                Number(e.target.value)
                            )
                        }
                        className={''}
                    />
                    <Input
                        type={'number'}
                        min={100}
                        max={1000}
                        placeholder={'1000'}
                        value={String(prices.priceTo)}
                        onChange={(e) =>
                            onChangeSetPrice('priceTo', Number(e.target.value))
                        }
                    />
                </div>
                <RangeSlider
                    min={100}
                    max={5000}
                    step={10}
                    value={[prices.priceFrom, prices.priceTo]}
                    onValueChange={([priceFrom, priceTo]) =>
                        setPrice({ priceFrom, priceTo })
                    }
                />
            </div>
            {/*CHECKBOXES INGRIDIENTS*/}

            <CheckboxFiltersGroups
                title={'Ингридиенты'}
                className={'mt-5'}
                limit={5}
                defaultItems={items.slice(0, 6)}
                items={items}
                loading={loading}
                onClickCheckbox={onAddId}
                selected={selectedIngredients}
                name={'ingredients'}
            />
        </div>
    );
};
