import * as React from 'react';

interface Props {
   orderId: number;
   totalAmount: number;
   paymentUrl: string;
}

const OrderPaymentTemplate: React.FC<Readonly<Props>> = ({
   orderId,
   totalAmount,
   paymentUrl,
}) => (
   <div
      style={{
         backgroundColor: '#f3f4f6',
         padding: '24px',
         fontFamily: 'Arial, sans-serif',
      }}
   >
      <div
         style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
         }}
      >
         <div style={{ backgroundColor: '#1D4ED8', padding: '16px' }}>
            <h1
               style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: 0,
               }}
            >
               Order Confirmation
            </h1>
         </div>
         <div style={{ padding: '24px' }}>
            <h2
               style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1F2937',
                  marginBottom: '16px',
               }}
            >
               Order #{orderId}
            </h2>
            <p
               style={{
                  color: '#4B5563',
                  marginBottom: '24px',
               }}
            >
               Thank you for your order! The total amount to pay is{' '}
               <strong>{totalAmount} £</strong>.
            </p>
            <a
               href={paymentUrl}
               style={{
                  display: 'inline-block',
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#1D4ED8',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '12px 16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
               }}
            >
               Pay for your order
            </a>
         </div>
         <div
            style={{
               backgroundColor: '#f3f4f6',
               padding: '16px',
               textAlign: 'center',
               color: '#6B7280',
               fontSize: '14px',
            }}
         >
            If you have any questions, feel free to{' '}
            <a
               href="mailto:support@example.com"
               style={{ color: '#1D4ED8', textDecoration: 'underline' }}
            >
               contact our support team
            </a>
            .
         </div>
      </div>
   </div>
);

export default OrderPaymentTemplate;
