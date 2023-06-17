import { IndexContainer } from "./components/index/container";
import { ConfigurationPCContainer } from './components/configurationPC/container';
import { ProfileContainer } from "./components/profile/container";
import { HistoryContainer } from "./components/history/container";
import { AssemblyListContainer } from "./components/assemblyList/container";

const AppRoutes = [
    {
        index: true,
        element: <IndexContainer />
    },
    {
        path: '/configuration',
        element: <ConfigurationPCContainer />
    },
    {
        path: '/profile',
        element: <ProfileContainer />
    },
    {
        path: '/history',
        element: <HistoryContainer />
    },
    {
        path: '/models',
        element: <AssemblyListContainer />
    }
];

export default AppRoutes;
