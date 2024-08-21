'use client';
import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from '@/components/shared/filter-checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (value: string[]) => void;
    defaultValue?: string[];
    className?: string;
}

export const CheckboxFiltersGroups: React.FC<Props> = ({ className, title, items, defaultItems, limit = 6, searchInputPlaceholder = 'Поиск...', onChange, defaultValue }) => {
    const [showAll, setShowAll] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState('');

    const list = showAll ? items.filter((item) => item.text.toLowerCase().includes(searchValue)) : defaultItems?.slice(0, limit);
    const onChangeSearchInput = (e: any) => {
        setSearchValue(e.target.value);
    };

    console.log('items', items.length > limit);
    console.log('limit', limit);
    return (
        <div className={className}>
            <p className={'font-bold mb-3'}>{title}</p>

            {showAll && (
                <div className={'mb-5'}>
                    <Input placeholder={searchInputPlaceholder} className={'bg-gray-50 border-none'} onChange={onChangeSearchInput} />
                </div>
            )}

            <div className={'flex flex-col gap-1 max-h-96 pr-2 overflow-auto scrollbar'}>
                {list.map((item, index) => (
                    <FilterCheckbox key={index} text={item.text} value={item.value} endAdornment={item.endAdornment} checked={false} onCheckedChange={(ids) => console.log(ids)} />
                ))}

                {items.length > limit && (
                    <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                        <button onClick={() => setShowAll(!showAll)} className={'text-primary mt-3'}>
                            {showAll ? 'Скрыть' : ' +Показать все'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
