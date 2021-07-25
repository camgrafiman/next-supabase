import Link from 'next/link';
import { useState, useEffect } from 'react';
import {supabase} from '../api';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async () => checkUser()
    )
  checkUser()
  return () => {
    authListener?.unsubscribe()
  };
  }, [])


  async function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }

  return (
    <div>
      <nav className="p-6 border-p border-gray-300">
        <Link href="/">
          <span className="mr-6 cursor-pointer">Home</span>
        </Link>
        {
          user && (
            <Link href="/crear-post">
              <span className="mr-6 cursor-pointer">Crear post</span>
            </Link>
          )
        }
        <Link href="/perfil">
          <span className="mr-6 cursor-pointer">Perfil</span>
        </Link>
      </nav>
      <div className="py-8 px-16">
        <Component {...pageProps} />
      </div>
    </div>

  
  )
}

export default MyApp
