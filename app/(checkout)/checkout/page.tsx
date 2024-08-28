import React from 'react';
import {
   CheckoutTotalDetailsAmount,
   Container,
   Title,
   WhiteBlock,
} from '@/shared/components/shared';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { ArrowRight, Box, Percent, Truck } from 'lucide-react';
import { Button } from '@/shared/components/ui';

interface Props {
   className?: string;
}

const CheckoutPage: React.FC<Props> = ({ className }) => {
   return (
      <Container className={'mt-10'}>
         <Title
            text={'Checkout'}
            className={'font-extrabold mb-8 text-[36px]'}
         />
         <div className={'flex gap-10'}>
            {/*LEFT SIDE*/}
            <div className={'flex flex-col gap-10 flex-1 mb-20'}>
               <WhiteBlock title={'1. Basket'} endAdornment={''}></WhiteBlock>

               <WhiteBlock title={'2. Personal information'}>
                  <div className={'grid grid-cols-2 gap-5'}>
                     <Input
                        name={'firstName'}
                        className={'text-base'}
                        placeholder={'Name'}
                     />
                     <Input
                        name={'lastName'}
                        className={'text-base'}
                        placeholder={'Surname'}
                     />
                     <Input
                        name={'email'}
                        className={'text-base'}
                        placeholder={'Email'}
                     />
                     <Input
                        name={'phone'}
                        className={'text-base'}
                        placeholder={'Phone'}
                     />
                  </div>
               </WhiteBlock>

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
            {/*RIGHT SIDE*/}
            <div className={'w-[450px]'}>
               <WhiteBlock className={'p-6 sticky'}>
                  <div className={'flex flex-col gap-1'}>
                     <span className={'text-xl'}>Total price:</span>
                     <span className={'text-[32px] font-extrabold'}>76 £</span>
                     <div className="border-b border-gray-200 w-full" />
                  </div>

                  <CheckoutTotalDetailsAmount
                     icon={<Box />}
                     title={'Products prices:'}
                     value={'125'}
                  />
                  <CheckoutTotalDetailsAmount
                     icon={<Percent />}
                     title={'Tax 20%'}
                     value={'13'}
                  />
                  <CheckoutTotalDetailsAmount
                     icon={<Truck />}
                     title={'Delivery'}
                     value={'9.99'}
                  />

                  <Button
                     // disabled={!totalAmount || submitting}
                     className={
                        'w-full h-12 rounded-2xl mt-6 text-base font-bold'
                     }
                     type={'submit'}
                  >
                     {/*<ArrowRight className={'w-5 ml-2'} />*/}
                     Place order
                  </Button>
               </WhiteBlock>
            </div>
         </div>
      </Container>
   );
};

export default CheckoutPage;
