import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Logo = () => {
  return (
    <>
    <Link className='flex gap-1.5 items-center text-white' to="/dashboard">
        <img src={logo} className='h-24 w-auto'/>
        <h1 className='text-lg font-semibold'>Movie<span className='text-customOrangeColor'>Hub</span></h1>
    </Link>
    </>
  )
}

export default Logo