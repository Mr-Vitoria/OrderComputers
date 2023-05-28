import { IndexContainer } from "./components/index/container";
import { ConfigurationPCContainer } from './components/configurationPC/container'

const AppRoutes = [
    {
        index: true,
        element: <IndexContainer />
    },
    {
        path: '/configuration',
        element: <ConfigurationPCContainer />
    }
];

export default AppRoutes;
