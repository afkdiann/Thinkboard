import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  return (
   <header className="bg-base-300 border-b bg-black">
    <div className='mx-auto max-w-6xl p-4' >
        <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold font-mono tracking-tigher text-green-700'>Thinkboard</h1>
            <button className='bg-green-700 rounded-xl'>
                <Link to={'create'}>
                    <span className='flex items-center gap-4 py-2 px-4'>
                        <PlusIcon className='size-5'/>
                        New Note
                    </span>
                </Link>
            </button>
        </div>
    </div>
   </header>
  )
}

export default Navbar