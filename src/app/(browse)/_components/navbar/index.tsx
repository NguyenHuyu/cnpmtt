import Action from './Action'
import { Logo } from './Logo'
import Search from './Search'

const Navbar = () => {
  return (
    <nav className='fixed top-0 h-20 z-[49] bg-[#252731] px-2 lg:px-4 w-full flex justify-between items-center shadow-sm'>
      <Logo />
      <Search />
      <Action />
    </nav>
  )
}

export default Navbar
