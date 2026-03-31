import { useRouter } from 'next/router'

function Workspace({ Component, pageProps, workspace }) {
    const router = useRouter()

    const viewexample = (workspace) => {
        router.push({
            pathname: '/new/[workspace]',
            query: { workspace: btoa(workspace.friendly_name)}
        })
    }

    return (
        <div onClick={() => viewexample(workspace)} className="w-[245px] h-[88px] transition-all relative cursor-pointer group flex p-2 items-center justify-center bg-slate-900/90 border border-slate-800 text-slate-100 shadow-lg rounded hover:shadow-2xl hover:border-sky-700 hover:bg-gradient-to-r hover:from-slate-900 hover:to-sky-950 hover:text-white">
            <div className="w-full h-full">
                <div className="show-grid flex h-full items-center">
                    <div className="kasmcard-img flex h-full mx-4 items-center justify-center">
                        <img className="w-[50px] max-h-[66px]" src={`${router.basePath}/icons/${workspace.image_src}`} alt={workspace.friendly_name} />
                    </div>
                    <div className="kasmcard-detail settingPad">
                        <h5 className="text-base">{ workspace.friendly_name }</h5>
                        <p className="text-xs opacity-50">{ workspace.categories && workspace.categories[0] || 'Unknown' }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspace