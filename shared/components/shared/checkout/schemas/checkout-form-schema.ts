import { z } from 'zod';

// export const checkoutFormSchema = z.object({
//    firstName: z
//       .string()
//       .min(2, { message: 'Name length should be more than 2 symbols' }),
//    lastName: z
//       .string()
//       .min(2, { message: 'Name length should be more than 2 symbols' }),
//    email: z.string().email({ message: 'Invalid email address' }),
//    phone: z.string().min(10, { message: 'Invalid phone number' }),
//    address: z.string().min(5, { message: 'Invalid home address' }),
//    country: z.string().min(5, { message: 'Invalid country name' }),
//    postcode: z.string().min(3, { message: 'Invalid postcode' }),
//    city: z.string().min(5, { message: 'Invalid city / town' }),
//    comment: z.string().optional(),
// });

export const checkoutFormSchema = z.object({
   firstName: z
      .string()
      .min(2, { message: 'Name length should be more than 2 symbols' }),
   lastName: z
      .string()
      .min(2, { message: 'Name length should be more than 2 symbols' }),
   email: z.string().email({ message: 'Invalid email address' }),
   phone: z.string().min(10, { message: 'Invalid phone number' }),
   fullAddress: z.string().min(5, { message: 'Invalid home address' }),
   address: z.object({
      line_1: z.string().min(5, { message: 'Invalid address line 1' }),
      line_2: z.string().optional(),
      post_town: z.string().min(2, { message: 'Invalid town/city' }),
      postcode: z.string().min(3, { message: 'Invalid postcode' }),
      county: z.string().optional(),
   }),
   comment: z.string().optional(),
});

export type TCheckoutFormValuesSchema = z.infer<typeof checkoutFormSchema>;
