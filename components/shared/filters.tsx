import React from 'react';
import { Title } from '@/components/shared/title';
import { cn } from '@/components/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterCheckbox } from '@/components/shared/filter-checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { RangeSlider } from '@/components/shared/range-slider';
import { CheckboxFiltersGroups } from '@/components/shared/checkbox-filters-groups';

interface Props {
    className?: string;
}

const options = [
    {
        text: 'Сырный соус',
        value: '1',
    },
    {
        text: 'Барбекю соус',
        value: '2',
    },
    {
        text: 'Кисло-сладкий соус',
        value: '3',
    },
    {
        text: 'Чесночный соус',
        value: '4',
    },
    {
        text: 'Томатный соус',
        value: '5',
    },
    {
        text: 'Горчичный соус',
        value: '6',
    },
    {
        text: 'Медово-горчичный соус',
        value: '7',
    },
    {
        text: 'Острый соус',
        value: '8',
    },
    {
        text: 'Ранч соус',
        value: '9',
    },
    {
        text: 'Песто соус',
        value: '10',
    },
    {
        text: 'Горчичный соус',
        value: '6',
    },
    {
        text: 'Медово-горчичный соус',
        value: '7',
    },
    {
        text: 'Острый соус',
        value: '8',
    },
    {
        text: 'Ранч соус',
        value: '9',
    },
    {
        text: 'Песто соус',
        value: '10',
    },
];
const optionsDefault = [
    {
        text: 'Сырный соус',
        value: '1',
    },
    {
        text: 'Барбекю соус',
        value: '2',
    },
    {
        text: 'Кисло-сладкий соус',
        value: '3',
    },
    {
        text: 'Чесночный соус',
        value: '4',
    },
    {
        text: 'Томатный соус',
        value: '5',
    },
    {
        text: 'Горчичный соус',
        value: '6',
    },
    {
        text: 'Медово-горчичный соус',
        value: '7',
    },
    {
        text: 'Острый соус',
        value: '8',
    },
    {
        text: 'Ранч соус',
        value: '9',
    },
    {
        text: 'Песто соус',
        value: '10',
    },
    {
        text: 'Горчичный соус',
        value: '6',
    },
    {
        text: 'Медово-горчичный соус',
        value: '7',
    },
    {
        text: 'Острый соус',
        value: '8',
    },
    {
        text: 'Ранч соус',
        value: '9',
    },
    {
        text: 'Песто соус',
        value: '10',
    },
];

export const Filters: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('', className)}>
            <Title text={'Фильтрация'} className={'font-bold'}></Title>

            {/*TOP CHECKBOXES*/}
            <div className={'flex flex-col gap-4 mt-5'}>
                <FilterCheckbox text={'Можно собирать'} value={'1'} />
                <FilterCheckbox text={'Новинки'} value={'2'} />
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
                        defaultValue={0}
                        className={''}
                    />
                    <Input
                        type={'number'}
                        min={100}
                        max={1000}
                        placeholder={'1000'}
                        defaultValue={500}
                    />
                </div>
                <RangeSlider min={100} max={5000} step={10} value={[0, 5000]} />
            </div>
            {/*CHECKBOXES INGRIDIENTS*/}

            <CheckboxFiltersGroups
                title={'Ингридиенты'}
                className={'mt-5'}
                limit={5}
                defaultItems={optionsDefault}
                items={options}
            />
        </div>
    );
};
