import React from 'react';

interface Props {
   className?: string;
}

const LoginForm: React.FC<Props> = ({ className }) => {
   return <div className={className}></div>;
};

export default LoginForm;
