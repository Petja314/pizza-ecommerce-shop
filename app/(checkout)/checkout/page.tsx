'use client';
import React, { useEffect, useState } from 'react';
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
import { cn } from '@/shared/lib/utils';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutStripeForm from '@/shared/components/shared/checkout/stripe/checkout-stripe-form';
import { Elements } from '@stripe/react-stripe-js';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';

interface Props {
   className?: string;
}

const CheckoutPage: React.FC<Props> = ({ className }) => {
   const [submitting, setSubmitting] = React.useState(false);

   const {
      totalAmount,
      fetchCartItems,
      items,
      updateItemQuantity,
      removeCartItem,
      loading,
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
         firstName: '',
         lastName: '',
         email: '',
         phone: '',
         fullAddress: '',
         address: {
            line_1: '',
            line_2: '',
            post_town: '',
            postcode: '',
            county: '',
         },
         comment: '',
      },
   });
   const onSubmit = async (data: TCheckoutFormValuesSchema) => {
      try {
         setSubmitting(true);
         const url = await createOrder(data);
         toast.success('Order created! 📝 Going to the payment page...', {
            icon: '✅',
         });
         if (url) {
            location.href = url;
         }
      } catch (err) {
         setSubmitting(false);

         toast.error('Order declined , please try again', {
            icon: '❌',
         });
         console.error(err);
      }
      // console.log('data >', data);
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
                        className={cn(
                           loading ? 'opacity-70 pointer-events-none' : ''
                        )}
                        loading={loading}
                        items={items}
                        removeCartItem={removeCartItem}
                        onClickCountButton={onClickCountButton}
                     />
                     <CheckoutPersonalForm
                        className={cn(
                           loading ? 'opacity-70 pointer-events-none' : ''
                        )}
                     />
                     <CheckoutDeliveryForm
                        className={cn(
                           loading ? 'opacity-70 pointer-events-none' : ''
                        )}
                     />
                  </div>
                  {/*RIGHT SIDE*/}
                  <div className={'w-[450px]'}>
                     <CheckoutSidebar
                        totalAmount={totalAmount}
                        loading={loading || submitting}
                     />
                  </div>
               </div>
            </form>
         </FormProvider>
      </Container>
   );
};

export default CheckoutPage;
