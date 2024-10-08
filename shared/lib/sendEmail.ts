import { Resend } from 'resend';
import React from 'react';

export const sendEmail = async (
   to: string,
   subject: string,
   template: React.ReactNode
) => {
   debugger;
   console.log('SEND EMAIL');
   const resend = new Resend(process.env.RESEND_API_KEY);
   const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      react: template,
   });
   if (error) {
      throw new Error('Error occurred during sending the email');
   }
   return data;
};
