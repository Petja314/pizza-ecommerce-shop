'use client';
import React, { useEffect, useRef, useState } from 'react';
import { WhiteBlock } from '@/shared/components/shared';
import { FormInput, FormTextarea } from '@/shared/components/shared/form';
import { AddressFinder } from '@ideal-postcodes/address-finder';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/shared/lib/utils';
import '../../../../../app/globals.css';
import { Input } from '@/shared/components/ui/input';
import { ClearButton } from '@/shared/components/ui/clear-button';

interface Props {
   className?: string;
}
interface AddressTypes {
   line_1: string;
   line_2: string;
   line_3: string;
   post_town: string;
   postcode: string;
   county: string;
}

export const CheckoutDeliveryForm: React.FC<Props> = ({ className }) => {
   const { register, setValue, watch, getValues } = useFormContext();
   const addressInputRef = useRef<HTMLInputElement>(null); // Create a ref for the input field
   const line1Value = watch('address.line_1');

   useEffect(() => {
      if (addressInputRef.current) {
         AddressFinder.setup({
            inputField: addressInputRef.current,
            apiKey: process.env.NEXT_PUBLIC_API_DELIVERY_ADDRESS as string,
            onAddressRetrieved: function (address: any) {
               // Set the form values
               setValue('address.line_1', address.line_1);
               setValue('address.line_2', address.line_2);
               setValue('address.post_town', address.post_town);
               setValue('address.postcode', address.postcode);
               setValue('address.county', address.county);
               setValue('fullAddress', address.county);
               setValue(
                  'fullAddress',
                  `${address.line_1} , ${address.line_2} , ${address.post_town} , ${address.postcode} , ${address.county}`
               );
               // Trigger blur event to close the dropdown
               if (addressInputRef.current) {
                  addressInputRef.current.blur();
                  register('fullAddress');
               }
            },
         });
      }

      // Register input manually to avoid ref conflicts
      if (addressInputRef.current) {
         register('address.line_1');
      }
   }, [setValue, addressInputRef.current]);

   const onClickClear = () => {
      setValue('address.line_1', ''); // Clear the input value
   };

   // console.log('delivery details from > ', getValues());
   return (
      <div className={className}>
         <WhiteBlock title={'3. Delivery address'}>
            <div className={'flex flex-col gap-5'}>
               <div className={'relative'}>
                  <input
                     className={'customInput'}
                     placeholder="Street address"
                     ref={addressInputRef} // Attach ref for AddressFinder
                     value={line1Value || ''} // Ensure the value is updated
                     onChange={(e) =>
                        setValue('address.line_1', e.target.value)
                     } // Sync manual changes
                  />

                  {getValues().address.line_1.length > 0 && (
                     <ClearButton onClick={onClickClear} />
                  )}
               </div>

               <FormInput
                  name={'address.line_2'}
                  className={'text-base'}
                  placeholder={'Apartament suite'}
               />

               <FormInput
                  name={'address.post_town'}
                  className={'text-base'}
                  placeholder={'Town/City'}
               />
               <FormInput
                  name={'address.postcode'}
                  className={'text-base'}
                  placeholder={'Postcode'}
               />
               <FormInput
                  name={'address.county'}
                  className={'text-base'}
                  placeholder={'County'}
               />

               <FormTextarea
                  rows={5}
                  name={'Delivery details'}
                  placeholder={'Delivery additional details...'}
                  className={'text-base'}
               />

               {/*<FormInput*/}
               {/*   name={'country'}*/}
               {/*   className={'text-base'}*/}
               {/*   placeholder={'Country'}*/}
               {/*/>*/}
               {/*<FormInput*/}
               {/*   name={'address'}*/}
               {/*   className={'text-base'}*/}
               {/*   placeholder={'Address'}*/}
               {/*/>*/}

               {/*<FormInput*/}
               {/*   name={'postcode'}*/}
               {/*   className={'text-base'}*/}
               {/*   placeholder={'City'}*/}
               {/*/>*/}
               {/*<FormInput*/}
               {/*   name={'city'}*/}
               {/*   className={'text-base'}*/}
               {/*   placeholder={'Postcode'}*/}
               {/*/>*/}
               {/*<FormTextarea*/}
               {/*   rows={5}*/}
               {/*   name={'Delivery details'}*/}
               {/*   placeholder={'Delivery additional details...'}*/}
               {/*   className={'text-base'}*/}
               {/*/>*/}
            </div>
         </WhiteBlock>
      </div>
   );
};
