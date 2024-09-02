import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
   formLoginSchema,
   TFormLoginValues,
   TFormRegisterValues,
} from '@/shared/components/shared/modals/auth-modal/forms/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '@/shared/components/shared';
import { FormInput } from '@/shared/components/shared/form';
import { Button } from '@/shared/components/ui';
import { useSession, signIn, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Props {
   className?: string;
   onClose?: VoidFunction;
}

const LoginForm: React.FC<Props> = ({ className, onClose }) => {
   const form = useForm<TFormLoginValues>({
      resolver: zodResolver(formLoginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   });
   const onSubmit = async (data: TFormLoginValues) => {
      try {
         const response = await signIn('credentials', {
            ...data,
            redirect: false,
         });
         if (!response?.ok) {
            throw Error();
         }
         toast.success('You successfully signed in to account', {
            icon: '✅',
         });
         onClose?.();
      } catch (err) {
         console.error(err, 'Error [LOGIN]');
         toast.error('Login failed', {
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
                        text="Sign in to account"
                        size="md"
                        className="font-bold"
                     />
                     <p className="text-gray-400">
                        Enter your e-mail , to sign it to your account
                     </p>
                  </div>
               </div>

               <FormInput name="email" label="E-Mail" required />
               <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  required
               />

               <Button
                  loading={form.formState.isSubmitting}
                  className="h-12 text-base"
                  type="submit"
               >
                  {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
               </Button>
            </form>
         </FormProvider>
      </div>
   );
};

export default LoginForm;
