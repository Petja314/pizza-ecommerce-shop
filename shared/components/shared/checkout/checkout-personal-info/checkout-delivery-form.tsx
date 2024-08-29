import React from 'react';
import { WhiteBlock } from '@/shared/components/shared';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

interface Props {
   className?: string;
}

export const CheckoutDeliveryForm: React.FC<Props> = ({ className }) => {
   return (
      <div className={className}>
         <WhiteBlock title={'3. Delivery address'}>
            <div className={'flex flex-col gap-5'}>
               <Input
                  name={'address'}
                  className={'text-base'}
                  placeholder={'Address'}
               />
               <Textarea
                  rows={5}
                  name={'delivery details'}
                  placeholder={'Delivery additional details...'}
                  className={'text-base'}
               />
            </div>
         </WhiteBlock>
      </div>
   );
};
