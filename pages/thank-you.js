import React from 'react';
import { useRouter, withRouter } from 'next/router';

const ThankYou = () => {
  const {
    query: { name },
  } = useRouter();

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='max-w-4xl m-auto space-y-8 text-center'>
        <h1 className='font-bold text-center text-8xl'>Thank you, {name} </h1>
        <p className='text-4xl leading-tight'>
          We look forward to seeing you on April 4th at the Bhavsar's Home
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
