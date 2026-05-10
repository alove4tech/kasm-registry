import { useState, useEffect } from 'react'
import Head from 'next/head'
import Workspace from '../components/Workspace'
import styles from '../styles/Home.module.css'

export default function Home({ searchText }) {

  const [workspaces, setWorkspaces] = useState(null)
  const [versions, setVersions] = useState(null)
  const [version, setVersion] = useState(null)

  useEffect(() => {
    let currentVersion = localStorage.getItem("version") || null
    fetch('list.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load list.json: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((workspaces) => {
        let wsversions = []
        workspaces.workspaces.forEach((workspace) => {
          if(workspace.compatibility) {
            workspace.compatibility.forEach((v) => {
              const value = parseFloat(v.version)
              if(wsversions.indexOf(value) === -1) {
                wsversions.push(value)
              }
            })
          }
        })
        const sorted = wsversions.sort((a,b) => a-b).reverse()

        setVersions(sorted)
        if (currentVersion === null) {
          currentVersion = sorted[0]
          localStorage.setItem("version", currentVersion);
        }
        setVersion(currentVersion)
        setWorkspaces(workspaces)
      })
      .catch((err) => {
        console.error('Failed to load workspace list:', err);
      })
  }, [])

  const updateVersion = (version) => {
    localStorage.setItem("version", version);
    setVersion(version)
  }

  let filteredworkspaces = workspaces && workspaces.workspaces && workspaces.workspaces.length > 0 ? [...workspaces.workspaces] : [];
  filteredworkspaces = filteredworkspaces.filter((v) => v.compatibility.some((el) => el.version === version + '.x'))
  const lowerSearch = searchText && searchText.toLowerCase();
  if (searchText && searchText !== "") {
    filteredworkspaces = filteredworkspaces.filter((i) => {
      const category = (i.categories && i.categories.length > 0) ? i.categories.filter((i) =>
        i.toLowerCase().includes(lowerSearch)
      ) : [];
      return (
        i.name.toLowerCase().includes(lowerSearch) ||
        category.length > 0
      );
    });
  }


  return (
    <div className="">
      <Head>
        <title>Alove4Tech's Kasm</title>
        <meta name="description" content="ARM-first Kasm workspace registry from Alove4Tech with curated browser, desktop, and productivity workspaces." />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="p-8 py-10 xl:px-20">
        <h1 className='flex flex-wrap-reverse uppercase tracking-widest justify-center mb-10 gap-5'>
        <span className='flex items-center text-lg bg-slate-900/90 border border-slate-800 rounded overflow-hidden shadow-lg'>
            <span className='flex px-3 text-xs text-slate-300'>Workspaces</span>
            <span className='text-white p-3 py-1 flex bg-sky-600'>{filteredworkspaces && filteredworkspaces.length}</span>
          </span>
          <span className='flex items-center text-lg bg-slate-900/90 border border-slate-800 rounded overflow-hidden shadow-lg'>
            <span className='flex px-3 text-xs text-slate-300'>Kasm Version</span>
            <span className='text-white gap-3 p-3 py-1 flex items-center bg-sky-600'>{versions && versions.map((v) => (
              <div className={'cursor-pointer ' + (+v === +version ? 'text-white' : 'text-white/50 text-xs')} key={v} onClick={() => updateVersion(v)}>{v}</div>
            ))}</span>
          </span>
        </h1>
        <div className="flex flex-wrap gap-1 justify-center">
        {filteredworkspaces && filteredworkspaces.length > 0 && filteredworkspaces.map(function (workspace, i) {
            return <Workspace key={workspace.sha} workspace={workspace} />
          })}
          {filteredworkspaces && filteredworkspaces.length === 0 && (
            <p className='text-slate-300'>No workspaces found {searchText !== '' && ('matching "' + searchText + '"')}</p>
          )}
        </div>


        <div className={styles.grid}>

        </div>
      </main>
    </div >
  )
}
