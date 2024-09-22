import IconHome from '~icons/lucide/home';
import ChartPie from '~icons/lucide/chart-pie';
import ClipboardList from '~icons/lucide/clipboard-list';
import Send from '~icons/lucide/send';
import SquareTerminal from '~icons/lucide/square-terminal';
import MessagesSquare from '~icons/lucide/messages-square';



export const routes = [
    {
        label: 'Home',
        target: '/',
        icon: IconHome
    },
    {
        label: 'Overview',
        target: '/overview',
        icon: ClipboardList
    },
    {
        label: 'New Request',
        target: '/request',
        icon: SquareTerminal
    },
    {
        label: 'Protocol Stats',
        target: 'https://proxirun-analytics.vercel.app/',
        icon: ChartPie
    },
    {
        label: 'Contact',
        target: '/contact',
        icon: MessagesSquare
    },
];