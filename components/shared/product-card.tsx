import React from 'react';
import Link from 'next/link';
import { Title } from '@/components/shared/title';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    className?: string;
}

export const ProductCard: React.FC<Props> = ({
    className,
    id,
    name,
    price,
    imageUrl,
}) => {
    return (
        <div className={className}>
            <Link href={'/product/'}>
                <div
                    className={
                        'flex justify-center p-6 bg-secondary rounded-lg h-[260px]'
                    }
                >
                    <img
                        src={imageUrl}
                        alt="logo"
                        // className={'w-[125px] h-[125px]'}
                    />
                </div>
            </Link>

            <Title text={name} size={'sm'} className={'mb-1 mt-3 font-bold'} />
            <p className={'text-sm text-gray-400'}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci amet architecto consequuntur facere.
            </p>

            <div className={'flex justify-between items-center mt-4'}>
                <span className={'text-[20px]'}>
                    от <b>{price}</b> £
                </span>

                <Button variant={'secondary'} className={'text-base font-bold'}>
                    <Plus size={20} className={'mr-1'} />
                    Добавить
                </Button>
            </div>
        </div>
    );
};
