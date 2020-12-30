import React from 'react';

const ThankYou = ({ query: { firstName, attending } }) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='max-w-4xl m-auto space-y-8 text-center'>
        <h1 className='font-bold text-center capitalize text-8xl'>
          Thank you, {firstName}
        </h1>
        <p className='text-4xl leading-tight'>
          We look forward to seeing you on April 4th at the Bhavsar's Home
        </p>
      </div>
    </div>
  );
};

ThankYou.getInitialProps = ({ query }) => {
  return { query };
};

export default ThankYou;
