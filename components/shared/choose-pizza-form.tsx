import React from 'react';
import { ProductImage } from '@/components/shared/product-image';
import { Title } from '@/components/shared/title';
import { Button } from '@/components/ui';

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

            <Button className={'mt-10 w-[100%] pt-2'}>
               Добавить в корзину за {price} £{' '}
            </Button>
         </div>
      </div>
   );
};
