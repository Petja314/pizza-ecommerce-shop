import React from 'react';

interface Props {
   className?: string;
}

const RegisterForm: React.FC<Props> = ({ className }) => {
   return <div className={className}></div>;
};

export default RegisterForm;
