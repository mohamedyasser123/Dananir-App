import Sidebar from '../components/sidebar'
import Header from '../components/shared/Header'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen w-full text-slate-800">

      <aside className="w-[280px] h-screen sticky top-0 hidden md:block flex-shrink-0 z-30 bg-[#2853bc] border-r border-white/5">
        <Sidebar />
      </aside>

      <div className="flex flex-1 flex-col min-w-0">

        <header className="h-16 w-full sticky top-0 bg-white border-b border-slate-100 flex items-center px-6 z-20">
          <Header />
        </header>

        <main className="flex-1 min-h-screen bg-white p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  )
}
