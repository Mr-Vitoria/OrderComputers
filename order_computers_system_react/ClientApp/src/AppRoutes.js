import { IndexContainer } from "./components/index/container";
import { ConfigurationPCContainer } from './components/configurationPC/container'
import { ProfileContainer } from "./components/profile/container";

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
    }
];

export default AppRoutes;
