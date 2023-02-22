import React from 'react';
import Image from 'next/image';
import { useRouter } from "next/router"
import  Filter from './Filter';

function Header() {
  const router = useRouter();
  
  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center p-1 flex-grow py-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow object-fill">
        <div className='-z-50 font-bold text-black'>My</div>
          <Image className="link object-fill pl-4"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png"
            width={150}
            height={40}
            onClick={() => router.push('/')}
            alt="banner"
          />
        </div>
        </div>          
         
          
          
    </header>
  )
}

export default Header
//