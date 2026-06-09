import { Icon } from "@/templates/components/icon";

export const SidebarNavItem = ({ link, name, icon, active }: { link: string; name: string; icon: string; active?: boolean }) => {

    return ( 
        <a href={link} className={`flex items-center gap-1 p-2 rounded ${active ? 'border border-primary text-primary font-semibold' : 'font-medium'}`}> 
            <Icon name={icon} className="w-5 h-5" /> 
            <span> {name} </span>
        </a>
    )
}