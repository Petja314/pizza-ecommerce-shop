import React from 'react';

interface Props {
   code: string;
}

const VerificationUser: React.FC<Props> = ({ code }) => {
   return (
      <div>
         <p>
            Verification code <h2>{code}</h2>
         </p>

         <p>
            <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
               Confirm Registration{' '}
            </a>
         </p>
      </div>
   );
};

export default VerificationUser;
