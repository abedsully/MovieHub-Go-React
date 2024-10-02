import logo from '../../assets/logo.png'

const Logo = () => {
  return (
    <>
    <div className='flex gap-1.5 items-center text-white'>
        <img src={logo} className='h-24 w-auto'/>
        <h1 className='text-lg font-semibold'>Movie<span className='text-customOrangeColor'>Hub</span></h1>
    </div>
    </>
  )
}

export default Logo