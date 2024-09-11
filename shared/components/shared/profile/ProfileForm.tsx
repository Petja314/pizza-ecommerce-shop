'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import {
   formRegisterSchema,
   TFormRegisterValues,
} from '@/shared/components/shared/modals/auth-modal/forms/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container, Title } from '@/shared/components/shared';
import { FormInput } from '@/shared/components/shared/form';
import { Button } from '@/shared/components/ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
   className?: string;
   data: User;
}

export const ProfileForm: React.FC<Props> = ({ className, data }) => {
   const form = useForm({
      resolver: zodResolver(formRegisterSchema),
      defaultValues: {
         fullName: data.fullName,
         email: data.email,
         password: '',
         confirmPassword: '',
      },
   });
   const onSubmit = async (data: TFormRegisterValues) => {
      try {
         await updateUserInfo({
            email: data.email,
            fullName: data.fullName,
            password: data.password,
         });

         toast.error('Data updated 📝', {
            icon: '✅',
         });
      } catch (error) {
         return toast.error('Error during updating data', {
            icon: '❌',
         });
      }
   };

   const onClickSignOut = () => {
      signOut({
         callbackUrl: '/',
      });
   };

   return (
      <Container className={'my-10 pl-2 pr-2 flex items-center  flex-col '}>
         <Title
            text={'Personal information'}
            size={'md'}
            className={'font-bold'}
         />

         <FormProvider {...form}>
            <form
               className="flex flex-col gap-5 w-96 mt-10 max-sm:w-[100%] "
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <FormInput name="email" label="E-Mail" required />
               <FormInput name="fullName" label="Full name" required />

               <FormInput
                  type="password"
                  name="password"
                  label="New password"
                  required
               />
               <FormInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm password"
                  required
               />

               <Button
                  disabled={form.formState.isSubmitting}
                  className="text-base mt-10"
                  type="submit"
               >
                  Save
               </Button>

               <Button
                  onClick={onClickSignOut}
                  variant="secondary"
                  disabled={form.formState.isSubmitting}
                  className="text-base border border-primary"
                  type="button"
               >
                  Sign out
               </Button>
            </form>
         </FormProvider>
      </Container>
   );
};
