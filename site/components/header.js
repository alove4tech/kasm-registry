import Bubbles from '../components/Bubbles'
import Link from 'next/link'
import { useRouter } from "next/router";
import { NotificationManager } from 'react-notifications';

export default function Header({ searchText, changeSearch }) {

  const copyToClipboard = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(listUrl).then(() => {
        NotificationManager.info('URL successfully copied to clipboard', 'Copy URL', 4000);
      }).catch(() => {
        NotificationManager.error('Failed to copy URL', 'Copy URL', 4000);
      });
    } else {
      // Fallback for older browsers
      var textField = document.createElement('textarea')
      textField.innerText = listUrl
      textField.style.position = 'fixed'
      textField.style.opacity = '0'
      document.body.appendChild(textField)
      textField.select()
      try {
        document.execCommand('copy')
        NotificationManager.info('URL successfully copied to clipboard', 'Copy URL', 4000);
      } catch {
        NotificationManager.error('Failed to copy URL', 'Copy URL', 4000);
      }
      textField.remove()
    }
  }
  const listUrl = process.env.listUrl;
  const router = useRouter();
  const getLink = (path) => `${router.basePath}${path}`;

  return (
    <header className="relative font-light overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950 border-b border-slate-800 p-8 xl:px-32 text-white gap-5 md:gap-0 flex flex-wrap justify-center items-center">
      <Bubbles />
      <div className='relative z-10'>
        <div className="text-3xl">{process.env.name}</div>
        <div className="text-sm uppercase w-full flex justify-between">
          <span className='opacity-70'>W</span>
          <span className='opacity-70'>o</span>
          <span className='opacity-70'>r</span>
          <span className='opacity-70'>k</span>
          <span className='opacity-70'>s</span>
          <span className='opacity-70'>p</span>
          <span className='opacity-70'>a</span>
          <span className='opacity-70'>c</span>
          <span className='opacity-70'>e</span>
          <span>&nbsp;</span>
          <span className='opacity-40'>R</span>
          <span className='opacity-40'>e</span>
          <span className='opacity-40'>g</span>
          <span className='opacity-40'>i</span>
          <span className='opacity-40'>s</span>
          <span className='opacity-40'>t</span>
          <span className='opacity-40'>r</span>
          <span className='opacity-40'>y</span>
        </div>
      </div>
      <nav className='relative z-10 mx-12'>
        <a href={getLink("/")} className={'p-4 inline-block rounded-full border border-solid' + (router.pathname == "/" ? ' border-white/30' : ' border-transparent')}>Library</a>
        <Link href="/new/" className={'p-4 inline-block rounded-full border border-solid' + (router.pathname.startsWith("/new") ? ' bg-black/10 border-white/30' : ' border-transparent')}>Builder</Link>
      </nav>
      <div className="grow flex justify-center relative z-10">
        <div className='bg-slate-950/60 shadow-lg border border-slate-700 rounded flex w-full max-w-md'>
          <input
            name="search"
            className='bg-transparent text-lg font-light w-full p-4 text-slate-100 placeholder:text-slate-500 focus:outline-none'
            placeholder='Search for workspace'
            type="text"
            value={searchText}
            onChange={changeSearch}
          />

        </div>

      </div>
      <button className='p-4 relative z-10 px-5 bg-slate-900/80 border border-slate-700 hover:bg-sky-900 transition shadow-lg m-2 rounded items-center text-slate-200 flex cursor-pointer' onClick={() => { copyToClipboard() }}>
        <span className="mr-3">Workspace Registry Link</span>
        <svg style={{ height: '14px', fill: '#fff' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z" /></svg>
      </button>
    </header >

  )
}