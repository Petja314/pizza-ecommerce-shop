import React from 'react';
import {
   CheckoutTotalDetailsAmount,
   WhiteBlock,
} from '@/shared/components/shared';
import { Box, Percent, Truck } from 'lucide-react';
import { Button } from '@/shared/components/ui';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { basketTotalAmount } from '@/shared/lib';

interface Props {
   className?: string;
   totalAmount: number;
   loading: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({
   className,
   totalAmount,
   loading,
}) => {
   const { totalVATPrice, totalBasketPrice, DELIVERY_PRICE, VAT } =
      basketTotalAmount(totalAmount);

   return (
      <div className={className}>
         <WhiteBlock className={'p-6 sticky'}>
            <div className={'flex flex-col gap-1'}>
               <span className={'text-xl'}>Total price:</span>

               {loading ? (
                  <Skeleton className={'w-32 h-11'} />
               ) : (
                  <span className={'text-[32px] font-extrabold'}>
                     {totalBasketPrice} £
                  </span>
               )}
               <div className="border-b border-gray-200 w-full" />
            </div>

            <CheckoutTotalDetailsAmount
               icon={<Box />}
               title={'Products prices:'}
               value={
                  loading ? (
                     <Skeleton className={'h-6 w-14 rounded-sm'} />
                  ) : (
                     `${totalAmount} £`
                  )
               }
            />
            <CheckoutTotalDetailsAmount
               icon={<Percent />}
               title={`VAT ${VAT}%`}
               value={
                  loading ? (
                     <Skeleton className={'h-6 w-14 rounded-sm'} />
                  ) : (
                     `${totalVATPrice} £`
                  )
               }
            />
            <CheckoutTotalDetailsAmount
               icon={<Truck />}
               title={'Delivery'}
               value={
                  loading ? (
                     <Skeleton className={'h-6 w-14 rounded-sm'} />
                  ) : (
                     `${DELIVERY_PRICE} £`
                  )
               }
            />

            <Button
               loading={loading}
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
