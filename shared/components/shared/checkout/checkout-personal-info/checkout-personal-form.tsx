'use client';
import React from 'react';
import { WhiteBlock } from '@/shared/components/shared';
import { Input } from '@/shared/components/ui/input';
import { FormInput } from '@/shared/components/shared/form';

interface Props {
   className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className }) => {
   return (
      <WhiteBlock title={'2. Personal information'} className={''}>
         <div className={'grid grid-cols-2 gap-5 max-sm:flex max-sm:flex-col '}>
            <FormInput
               name={'firstName'}
               className={'text-base'}
               placeholder={'Name'}
            />
            <FormInput
               name={'lastName'}
               className={'text-base'}
               placeholder={'Surname'}
            />
            <FormInput
               name={'email'}
               className={'text-base'}
               placeholder={'Email'}
            />
            <FormInput
               name={'phone'}
               className={'text-base'}
               placeholder={'Phone'}
            />
         </div>
      </WhiteBlock>
   );
};
