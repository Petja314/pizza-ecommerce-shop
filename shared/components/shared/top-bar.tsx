import React from 'react';
import { Categories } from '@/shared/components/shared/categories';
import { SortPopup } from '@/shared/components/shared/sort-popup';
import { cn } from '@/shared/lib/utils';
import { Container } from '@/shared/components/shared/container';
import { Category } from '.prisma/client';

interface Props {
   variations: Category[];
   className?: string;
   sortedCategories: Category[];
}

export const TopBar: React.FC<Props> = ({
   className,
   variations,
   sortedCategories,
}) => {
   return (
      <div
         className={cn(
            'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10 ',
            className
         )}
      >
         <Container className={'flex items-center justify-between '}>
            <Categories variations={variations} />
            {/*<SortPopup sortedCategories={sortedCategories} />*/}
         </Container>
      </div>
   );
};
