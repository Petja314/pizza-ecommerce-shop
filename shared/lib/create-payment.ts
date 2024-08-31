import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function createStripePayment(
   productName: string,
   amount: number,
   orderId: string
) {
   try {
      const res = await axios.post(`${baseUrl}/api/stripe`, {
         productName,
         unitAmount: amount,
         currency: 'gbp',
         metadata: {
            orderId: orderId,
         },
      });

      return res.data; // This will include the payment link URL
   } catch (error) {
      console.error('Error creating payment link:', error);
      throw new Error('Payment link creation failed');
   }
}
