import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/current-user', {
          withCredentials: true, // Inclure les cookies dans la requête
        });

        if (response.status === 200) {
          setUsername(response.data.Username);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de utilisateur', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div>
      <div className='flex flex-row justify-around p-4'>
        <div>
          <img src='./Pictures/pic.svg' alt='Pic' className='h-10' />
        </div>
        <div className='flex flex-row space-x-5'>
          {username ? (
            <div>Bienvenue, {username}!</div>
          ) : (
            <>
              <Link to="/login">
                <button className='bg-sky-500 rounded-lg border-slate-300 w-20'>
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className='bg-sky-500 rounded-lg border-slate-300 w-20'>
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
