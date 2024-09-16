'use client';
import React from 'react';
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import { Filters } from '@/shared/components/shared/filters';

interface Props {
   className?: string;
}

export const FiltersMobileView: React.FC<React.PropsWithChildren<Props>> = ({
   className,
   children,
}) => {
   return (
      <Sheet>
         <SheetTrigger asChild>{children}</SheetTrigger>
         <SheetContent
            className={
               'flex flex-col justify-between pb-0 bg-[#F4F1EE] w-full '
            }
         >
            <Filters
               className={
                  'overflow-y-auto  overflow-x-hidden flex-1 scrollbar pb-5'
               }
            />
         </SheetContent>
      </Sheet>
   );
};
