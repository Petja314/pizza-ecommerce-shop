import React from 'react';
import { cn } from '@/components/lib/utils';

interface Props {
   className?: string;
   size: number | 20 | 30 | 40;
   imageUrl: string;
   alt: string;
}

export const ProductImage: React.FC<Props> = ({
   className,
   size,
   imageUrl,
   alt,
}) => {
   return (
      <div
         className={cn(
            'flex items-center justify-center flex-1 relative w-full',
            className
         )}
      >
         <img
            src={imageUrl}
            alt={alt}
            className={cn(
               'relative left-2 top-2 transition-all z-10 duration duration-300',
               {
                  'w-[300px] h-[300px]': size == 20,
                  'w-[400px] h-[400px]': size == 30,
                  'w-[500px] h-[500px]': size == 40,
               }
            )}
         />
      </div>
   );
};
