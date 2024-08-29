import { z } from 'zod';

export const checkoutFormSchema = z.object({
   firstName: z
      .string()
      .min(2, { message: 'Name length should be more than 2 symbols' }),
   lastName: z
      .string()
      .min(2, { message: 'Name length should be more than 2 symbols' }),
   email: z.string().email({ message: 'Invalid email address' }),
   phone: z.string().min(10, { message: 'Invalid phone number' }),
   address: z.string().min(5, { message: 'Invalid home address' }),
   comment: z.string().optional(),
});

export type TCheckoutFormValuesSchema = z.infer<typeof checkoutFormSchema>;
