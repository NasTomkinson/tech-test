import { Icon } from "../icon"

export const Appbar = ({ className = "" }: { className?: string }) => {
    return (
        <aside className={`bg-white border-t border-neutral-light inset-x-0 h-16 z-999 flex px-2 sm:px-8 md:relative md:h-full md:border-r md:border-t-0 md:px-0 ${className}`}>
            <div className="container flex min-w-0 items-center justify-between max-h-full md:flex-col md:justify-start md:gap-2 md:py-12 md:w-full"> 
                <AppbarItem icon="ic:round-dashboard" label="Home" link="/" active={false} />
                <AppbarItem icon="ic:outline-credit-card" label="Accounts" link="/accounts" active={false} />
                <AppbarItem icon="ic:outline-format-list-bulleted" label="Transactions" link="/transactions" active={false} />
                <AppbarItem icon="ic:person" label="Profile" link="#" active={false} />
            </div>
        </aside>
    )
}


const AppbarItem = ({ icon, label, link, active }: { icon: string; label: string, link: string, active: boolean }) => {
    return (
        <a href={link} className={`flex min-w-0 flex-1 flex-col items-center justify-center h-full md:h-auto md:flex-row md:gap-2 p-2 md:w-full md:flex-none md:justify-start rounded ${active ? 'text-primary bg-primary-light/30' : 'text-gray-500'}`}>
            <Icon name={icon} className="w-6 h-6" />
            <span className="flex max-w-full truncate text-xs font-medium">{label}</span>
        </a>
    )
}
