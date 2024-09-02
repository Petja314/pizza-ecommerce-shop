import { z } from 'zod';

export const passwordSchema = z
   .string()
   .min(4, { message: 'Invalid password' });
export const formLoginSchema = z.object({
   email: z.string().email({ message: 'Invalid email' }),
   password: z
      .string()
      .min(6, { message: 'Password needs to be minimum 6 symbols' }),
});

export const formRegisterSchema = formLoginSchema
   .merge(
      z.object({
         fullName: z.string().min(2, { message: 'Enter name and lastname' }),
         confirmPassword: passwordSchema,
      })
   )
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Password is not matching',
      path: ['confirmPassword'],
   });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
