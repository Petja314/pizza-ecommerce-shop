import * as React from 'react';
import { CartItemDto } from '@/services/dto/cart.dto';

interface Props {
   orderId: number;
   webUrl: string;
   items: CartItemDto[];
}

const styles = {
   ul: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
   },
   li: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px',
      marginBottom: '8px',
      borderRadius: '8px',
      backgroundColor: '#f8f8f8',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
   },
   index: {
      fontWeight: 'bold',
      marginRight: '10px',
      color: '#333',
   },
   productName: {
      flex: 2,
      marginRight: '10px',
      color: '#555',
   },
   price: {
      flex: 1,
      marginRight: '10px',
      color: '#007BFF',
   },
   quantity: {
      flex: 1,
      marginRight: '10px',
      color: '#28A745',
   },
   totalPrice: {
      flex: 1,
      fontWeight: 'bold',
      color: '#DC3545',
   },
};

const OrderSuccessEmail: React.FC<Readonly<Props>> = ({
   orderId,
   webUrl,
   items,
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
         <div style={{ backgroundColor: '#1dd85e', padding: '16px' }}>
            <h1
               style={{
                  color: '#ffffff',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: 0,
               }}
            >
               Thank you for your order!
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
               <strong>Your order was successfully made!</strong>.
            </p>

            <ul style={styles.ul}>
               {items.map((product, index) => (
                  <li key={product.orderId} style={styles.li}>
                     <span style={styles.index}>{index + 1}.</span>
                     <span style={styles.productName}>
                        <b>Product:</b> {product.variations.product.name}
                     </span>
                     <span style={styles.price}>
                        <b>Price:</b> {product.variations.price} £
                     </span>
                     <span style={styles.quantity}>
                        <b>Quantity:</b> {product.quantity}
                     </span>
                     <span style={styles.totalPrice}>
                        <b>Total:</b>{' '}
                        {product.quantity * product.variations.price} £
                     </span>
                  </li>
               ))}
            </ul>

            <a
               href={webUrl}
               style={{
                  display: 'inline-block',
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#1dd85e',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  padding: '12px 16px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
               }}
            >
               Visit website
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
               style={{ color: '#1dd85e', textDecoration: 'underline' }}
            >
               contact our support team
            </a>
            .
         </div>
      </div>
   </div>
);

export default OrderSuccessEmail;
