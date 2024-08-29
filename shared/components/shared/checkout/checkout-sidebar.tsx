import React from 'react';
import {
   CheckoutTotalDetailsAmount,
   WhiteBlock,
} from '@/shared/components/shared';
import { Box, Percent, Truck } from 'lucide-react';
import { Button } from '@/shared/components/ui';

interface Props {
   className?: string;
   totalAmount: number;
}

const VAT = 20;
const DELIVERY_PRICE = 5;

export const CheckoutSidebar: React.FC<Props> = ({
   className,
   totalAmount,
}) => {
   const vatPrice = (totalAmount * VAT) / 100;
   const totalBasketPrice = totalAmount + vatPrice + DELIVERY_PRICE;

   return (
      <div className={className}>
         <WhiteBlock className={'p-6 sticky'}>
            <div className={'flex flex-col gap-1'}>
               <span className={'text-xl'}>Total price:</span>
               <span className={'text-[32px] font-extrabold'}>
                  {totalBasketPrice} £
               </span>
               <div className="border-b border-gray-200 w-full" />
            </div>

            <CheckoutTotalDetailsAmount
               icon={<Box />}
               title={'Products prices:'}
               value={totalAmount}
            />
            <CheckoutTotalDetailsAmount
               icon={<Percent />}
               title={'Tax 20%'}
               value={vatPrice}
            />
            <CheckoutTotalDetailsAmount
               icon={<Truck />}
               title={'Delivery'}
               value={DELIVERY_PRICE}
            />

            <Button
               // disabled={!totalAmount || submitting}
               className={'w-full h-12 rounded-2xl mt-6 text-base font-bold'}
               type={'submit'}
            >
               {/*<ArrowRight className={'w-5 ml-2'} />*/}
               Place order
            </Button>
         </WhiteBlock>
      </div>
   );
};
