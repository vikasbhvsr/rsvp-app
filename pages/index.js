import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Spinner from '../components/Spinner';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState('Yes');
  const [guests, setGuests] = useState('');
  const [comments, setComments] = useState('');
  const [message, setMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        attending: attending,
        guestsAttending: guests,
        comment: comments,
      }),
    });
    if (response.ok) {
      setLoading(false);
      router.push({
        pathname: '/thank-you',
        query: { firstName: firstName, attending: attending },
      });
    }
    setLoading(false);
    const data = await response.json();
    setMessage(data.message);
  };

  useEffect(() => {
    router.prefetch('/thank-you');
  }, []);

  return (
    <div>
      <Head>
        <title>Baby Shower RSVP</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header className='container mx-auto'>
        <h1 className='my-8 font-extrabold text-center text-7xl'>RSVP</h1>
      </header>

      <main className='max-w-2xl p-4 mx-auto'>
        {message ? (
          <div className='flex items-center p-3 mb-6 space-x-2 text-sm text-red-900 bg-red-100 rounded-lg'>
            <span className='inline-block'>
              <svg
                className='w-5 h-5 text-red-900'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </span>
            <p>{message}</p>
          </div>
        ) : (
          ''
        )}
        <form
          action='/api/rsvp'
          method='POST'
          className='grid grid-cols-1 gap-6'
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label className='block' htmlFor='first_name'>
                <span className='text-gray-700'>First Name</span>
                <input
                  className='block w-full mt-1 border-indigo-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  required
                  type='text'
                  name='first_name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className='block' htmlFor='last_name'>
                <span className='text-gray-700'>Last Name</span>
                <input
                  className='block w-full mt-1 border-indigo-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  required
                  type='text'
                  name='last_name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className=''>
              <label className='block' htmlFor='email'>
                <span className='text-gray-700'>Email Address</span>
                <input
                  className='block w-full mt-1 border-indigo-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  required
                  type='email'
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className='block' htmlFor='phone'>
                <span className='text-gray-700'>Phone Number</span>
                <input
                  className='block w-full mt-1 border-indigo-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  required
                  type='tel'
                  name='phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label className='block' htmlFor='attending'>
                <span className='text-gray-700'>Will you be attending?</span>
                <select
                  className='block w-full mt-1 border-indigo-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  required
                  name='attending'
                  value={attending}
                  onChange={(e) => setAttending(e.target.value)}
                >
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                  <option value='Maybe'>Maybe</option>
                </select>
              </label>
            </div>
            {attending === 'Yes' || attending === 'Maybe' ? (
              <div>
                <label className='block' htmlFor='guests_attending'>
                  <span className='text-gray-700'>Total members attending</span>
                  <input
                    className='block w-full mt-1 border-indigo-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                    required
                    type='number'
                    name='guests_attending'
                    max={10}
                    min={0}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </label>
              </div>
            ) : (
              ''
            )}
          </div>
          <div>
            <label className='block' htmlFor='comments'>
              <span className='text-gray-700'>Leave A Message</span>
              <textarea
                className='block w-full mt-1 border-indigo-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                name='comments'
                row={30}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
            </label>
          </div>

          <button
            className='flex items-center justify-center px-3 py-2 bg-indigo-200 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-200 disabled:opacity-25 '
            type='submit'
          >
            Send RSVP
            {loading ? <Spinner /> : ''}
          </button>
        </form>
      </main>
    </div>
  );
}
