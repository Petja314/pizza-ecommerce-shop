'use client';

import React from 'react';
import Image from 'next/image';
import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetFooter,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from '@/shared/components/ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem, Title } from '@/shared/components/shared';
import { getCartItemsDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/shared/hooks';
import { Label } from '@radix-ui/react-select';

interface Props {
   className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
   children,
}) => {
   const {
      totalAmount,
      fetchCartItems,
      items,
      updateItemQuantity,
      removeCartItem,
   } = useCart();

   const onClickCountButton = (
      id: number,
      quantity: number,
      type: 'plus' | 'minus'
   ) => {
      // console.log('onClickCountButton > ', { id, quantity, type });
      const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
   };
   // max-sm:w-full
   return (
      <Sheet>
         <SheetTrigger asChild>{children}</SheetTrigger>
         <SheetContent
            className={'flex flex-col justify-between pb-0 bg-[#F4F1EE] w-full'}
         >
            <div
               className={cn(
                  'flex flex-col h-full ',
                  !totalAmount && 'justify-center'
               )}
            >
               {!totalAmount && (
                  <div
                     className={
                        'flex flex-col items-center justify-center w-72 mx-auto '
                     }
                  >
                     <Image
                        src={'/assets/images/empty-box.png'}
                        alt={'empty cart'}
                        width={120}
                        height={120}
                     />
                     <Title
                        text={'Empty checkout'}
                        size={'sm'}
                        className={'text-center font-bold my-2'}
                     />
                     <p className={'text-center text-neutral-500 mb-5'}>
                        Add at least one item , to make a purchase
                     </p>

                     <SheetClose>
                        <Button className={'w-56 h-12 text-base '} size={'lg'}>
                           <ArrowLeft className={'w-5 mr-2'} />
                           Back to store
                        </Button>
                     </SheetClose>
                  </div>
               )}

               {totalAmount > 0 && (
                  <>
                     <SheetHeader>
                        <SheetTitle>
                           Items in basket :{' '}
                           <span className={'font-bold'}>{items.length}</span>
                        </SheetTitle>
                     </SheetHeader>

                     <div
                        className={'-mx-6 mt-5 overflow-auto flex-1 scrollbar'}
                     >
                        {items.map((item) => (
                           <div className={'mb-2'} key={item.id}>
                              <CartDrawerItem
                                 onClickRemove={() => removeCartItem(item.id)}
                                 onClickCountButton={(type) =>
                                    onClickCountButton(
                                       item.id,
                                       item.quantity,
                                       type
                                    )
                                 }
                                 id={item.id}
                                 imageUrl={item.imageUrl}
                                 details={getCartItemsDetails(
                                    item.ingridients,
                                    item.pizzaType as PizzaType,
                                    item.pizzaSize as PizzaSize
                                 )}
                                 disabled={item.disabled}
                                 name={item.name}
                                 price={item.price}
                                 quantity={item.quantity}
                              />
                           </div>
                        ))}
                     </div>

                     <SheetFooter className={'-mx-6 bg-white p-8 '}>
                        <div className={'flex flex-col w-full'}>
                           <div className={'flex mb-4'}>
                              <span
                                 className={
                                    'flex flex-1 text-lg text-neutral-500'
                                 }
                              >
                                 Total
                                 <div
                                    className={
                                       'flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2'
                                    }
                                 ></div>
                              </span>
                              <span className={'font-bold text-lg'}>
                                 {totalAmount} £
                              </span>
                           </div>
                           <Link href={'/checkout'}>
                              <Button
                                 type={'submit'}
                                 className={'w-full h-12 text-base'}
                              >
                                 Place order
                                 <ArrowRight className={'w-5 ml-2'} />
                              </Button>
                           </Link>
                        </div>
                     </SheetFooter>
                  </>
               )}
            </div>
         </SheetContent>
      </Sheet>
   );
};
