import { useEffect, useState } from 'react'

const Navbar = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const shouldUseDark = stored ? stored === 'dark' : false
    document.documentElement.classList.toggle('dark', shouldUseDark)
    setIsDark(shouldUseDark)
  }, [])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <div className="w-full">
        <nav className="block w-full px-4 py-2 mx-auto shadow-md rounded-md lg:px-8 lg:py-3 fixed top-0 bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
    <a href="#"
      className="mr-4 block cursor-pointer py-1.5 text-base font-semibold">
      Brokerhub
    </a>
    <div className="hidden lg:block">
      <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <li
          className="flex items-center p-1 text-sm gap-x-2 text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded">
          <a href="/" className="flex items-center">
            Home
          </a>
        </li>
        <li
          className="flex items-center p-1 text-sm gap-x-2 text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded">
          <a href="/register_buyer" className="flex items-center">
           Register
          </a>
        </li>
        <li
          className="flex items-center p-1 text-sm gap-x-2 text-slate-600 dark:text-slate-300 hover:bg-blue-200 dark:hover:bg-slate-800 rounded">
          <a href="/signin" className="flex items-center">
            Sign In
          </a>
        </li>
      </ul>
    </div>

    <div className="flex items-center gap-3 ml-auto">
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        type="button">
        {isDark ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.24 2.676-7.843 6.43-9.175a.75.75 0 01.951.966A8.25 8.25 0 0012 19.5a8.25 8.25 0 007.709-5.37.75.75 0 011.043-.443z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm0 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75zM4.47 4.47a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.47 5.53a.75.75 0 010-1.06zm12.88 12.88a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3A.75.75 0 012.25 12zm15 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zM4.47 19.53a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.53 19.53a.75.75 0 01-1.06 0zm12.88-12.88a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <button
        className="relative h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium text-inherit transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
        type="button" >
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:group">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar