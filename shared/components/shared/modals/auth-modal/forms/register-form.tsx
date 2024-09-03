import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
   formRegisterSchema,
   TFormRegisterValues,
} from '@/shared/components/shared/modals/auth-modal/forms/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '@/shared/components/shared';
import { FormInput } from '@/shared/components/shared/form';
import { Button } from '@/shared/components/ui';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';

interface Props {
   className?: string;
   onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ className, onClose }) => {
   const form = useForm<TFormRegisterValues>({
      resolver: zodResolver(formRegisterSchema),
      defaultValues: {
         email: '',
         fullName: '',
         password: '',
         confirmPassword: '',
      },
   });

   const onSubmit = async (data: TFormRegisterValues) => {
      // debugger;
      // console.log('data.fullName', data.fullName);
      try {
         debugger;
         await registerUser({
            email: data.email,
            fullName: data.fullName,
            password: data.password,
         });

         toast.error(
            'You successfully registered the account 📝. Confirm your email',
            {
               icon: '✅',
            }
         );

         onClose?.();
      } catch (error) {
         return toast.error('Incorrect E-Mail or Password', {
            icon: '❌',
         });
      }
   };

   return (
      <div className={className}>
         <FormProvider {...form}>
            <form
               className={'flex flex-col gap-5'}
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <div className="flex justify-between items-center">
                  <div className="mr-2">
                     <Title
                        text="Register new account"
                        size="md"
                        className="font-bold"
                     />
                     <p className="text-gray-400">
                        Enter your e-mail , to register your account
                     </p>
                  </div>
               </div>

               <FormInput name="email" label="E-Mail" required />
               <FormInput name="fullName" label="Полное имя" required />
               <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  required
               />

               <FormInput
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  required
               />

               <Button
                  loading={form.formState.isSubmitting}
                  className="h-12 text-base"
                  type="submit"
               >
                  Register
               </Button>
            </form>
         </FormProvider>
      </div>
   );
};
