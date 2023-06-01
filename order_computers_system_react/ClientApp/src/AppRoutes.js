import { IndexContainer } from "./components/index/container";
import { ConfigurationPCContainer } from './components/configurationPC/container';
import { ProfileContainer } from "./components/profile/container";
import { HistoryContainer } from "./components/history/container";

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
    }
];

export default AppRoutes;
