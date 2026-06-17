import { Icon } from "../icon"

export const Appbar = ({ className = "" }: { className?: string }) => {
    return (
        <aside className={`bg-white border-t border-neutral-light inset-x-0 h-16 z-999 flex px-2 sm:px-8 lg:relative lg:h-full lg:border-r lg:border-t-0 lg:px-0 ${className}`}>
            <div className="container flex min-w-0 items-center justify-between max-h-full lg:flex-col lg:justify-start lg:gap-2 lg:py-12 lg:w-full"> 
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
        <a href={link} className={`flex min-w-0 flex-1 flex-col items-center justify-center h-full lg:h-auto lg:flex-row lg:gap-2 p-2 lg:w-full lg:flex-none lg:justify-start rounded ${active ? 'text-primary bg-primary-light/30' : 'text-gray-500'}`}>
            <Icon name={icon} className="w-6 h-6" />
            <span className="flex max-w-full truncate text-xs font-medium">{label}</span>
        </a>
    )
}
