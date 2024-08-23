import React from 'react';
import { ProductImage } from '@/shared/components/shared/product-image';
import { Title } from '@/shared/components/shared/title';
import { Button } from '@/shared/components/ui';
import GroupVariant from '@/shared/components/shared/group-variant';
import { pizzaSizes } from '@/shared/constants/pizza';

interface Props {
   imageUrl: string;
   name: string;
   ingredients: any[];
   items?: any[];
   onClickAdd?: VoidFunction;
   className?: string;
   textDetails?: string;
   price: number;
   size: number;
}

export const ChoosePizzaForm: React.FC<Props> = ({
   imageUrl,
   name,
   ingredients,
   items,
   onClickAdd,
   className,
   textDetails,
   price,
   size,
}) => {
   return (
      <div className={'flex flex-1'}>
         <ProductImage
            imageUrl={imageUrl}
            size={size}
            alt={`pizza-${name}`}
         ></ProductImage>

         <div className={'w-[490px] bg-[#f7f6f5] p-7'}>
            <Title text={name} size={'md'} className={'font-extrabold mb-1'} />
            <p className={'text-gray-400'}>{textDetails}</p>

            <GroupVariant items={pizzaSizes} />

            <Button className={'mt-10 w-[100%] pt-2'}>
               Добавить в корзину за {price} £{' '}
            </Button>
         </div>
      </div>
   );
};
