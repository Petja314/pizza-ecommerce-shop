'use client';
import React from 'react';
import { Container, Title } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { useCart } from '@/shared/hooks';
import Link from 'next/link';
import {
   CheckoutCart,
   CheckoutDeliveryForm,
   CheckoutPersonalForm,
   CheckoutSidebar,
} from '@/shared/components/shared/checkout';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
   checkoutFormSchema,
   TCheckoutFormValuesSchema,
} from '@/shared/components/shared/checkout/schemas/checkout-form-schema';

interface Props {
   className?: string;
}

const CheckoutPage: React.FC<Props> = ({ className }) => {
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

   const form = useForm<TCheckoutFormValuesSchema>({
      resolver: zodResolver(checkoutFormSchema),
      defaultValues: {
         email: '',
         firstName: '',
         lastName: '',
         phone: '',
         address: '',
         comment: '',
      },
   });
   const onSubmit = (data: TCheckoutFormValuesSchema) => {
      console.log('data >', data);
   };

   return (
      <Container className={'mt-10'}>
         <Title
            text={'Checkout'}
            className={'font-extrabold mb-8 text-[36px]'}
         />
         <Link href={'/'}>
            <Button className={'mb-10'} size={'lg'}>
               Back to shop
            </Button>
         </Link>

         <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className={'flex gap-10'}>
                  {/*LEFT SIDE*/}
                  <div className={'flex flex-col gap-10 flex-1 mb-20'}>
                     <CheckoutCart
                        items={items}
                        removeCartItem={removeCartItem}
                        onClickCountButton={onClickCountButton}
                     />
                     <CheckoutPersonalForm />
                     <CheckoutDeliveryForm />
                  </div>
                  {/*RIGHT SIDE*/}
                  <div className={'w-[450px]'}>
                     <CheckoutSidebar totalAmount={totalAmount} />
                  </div>
               </div>
            </form>
         </FormProvider>
      </Container>
   );
};

export default CheckoutPage;
