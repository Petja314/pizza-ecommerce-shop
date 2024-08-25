import React from 'react';
import { cn } from '@/shared/lib/utils';
import { CircleCheck } from 'lucide-react';

interface Props {
   id?: number;
   name?: string;
   price?: number;
   imageUrl?: string;
   className?: string;
   onClick?: () => void;
   active?: boolean;
}

export const IngredientItems: React.FC<Props> = ({
   id,
   name,
   price,
   imageUrl,
   className,
   onClick,
   active,
}) => {
   return (
      <div
         className={cn(
            'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
            { 'border border-primary': active },
            className
         )}
         onClick={onClick}
      >
         {active && (
            <CircleCheck className={'absolute top-2 right-2 text-primary'} />
         )}
         <img
            src={imageUrl}
            alt={`product-ingredient-${name}`}
            width={110}
            height={110}
         />
         <span className={'text-xs mb-1'}>{name}</span>
         <span className={'font-bold'}>{price} £</span>
      </div>
   );
};
