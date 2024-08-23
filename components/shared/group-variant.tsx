'use client';
import React from 'react';
import { cn } from '@/components/lib/utils';

interface Props {
   className?: string;
   items: readonly Variant[];
   onClick?: (value: Variant['value']) => void;
   selectedValue?: Variant['value'];
}
type Variant = {
   name: string;
   value: string;
   disabled?: boolean;
};

const GroupVariant: React.FC<Props> = ({
   className,
   items,
   onClick,
   selectedValue,
}) => {
   return (
      <div
         className={cn(
            className,
            'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none'
         )}
      >
         {items.map((item, index) => (
            <button
               key={item.name}
               onClick={() => onClick?.(item.value)}
               className={cn(
                  'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                  {
                     'bg-white shadow': item.value == selectedValue,
                     'text-gray-500 opacity-50 pointer-events-none':
                        item.disabled,
                  }
               )}
            >
               {item.name}
            </button>
         ))}
      </div>
   );
};

export default GroupVariant;
