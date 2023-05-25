import { CompBodyContainer } from "./components/compBody/container";
import { CompProcessorContainer } from "./components/compProcessor/container";
import { MotherCardContainer } from "./components/motherCard/container";
import { UserContainer } from "./components/user/container";
import { PowerSupplyUnitContainer } from "./components/powerSupplyUnit/container";
import { RAMMemoryContainer } from "./components/ramMemory/container";
import { StorageDeviceContainer } from "./components/storageDevice/container";
import { VideoCardContainer } from "./components/videoCard/container";
import { Home } from "./components/Home";

const AppRoutes = [
  {
        index: true,
        element: <Home />
  },
  {
      path: '/compBodiesPanel',
      element: <CompBodyContainer />
  },
  {
      path: '/compProcessorPanel',
      element: <CompProcessorContainer />
    },
    {
        path: '/motherCardPanel',
        element: <MotherCardContainer />
    },
    {
        path: '/userPanel',
        element: <UserContainer />
    },
    {
        path: '/powerSupplyUnitPanel',
        element: <PowerSupplyUnitContainer />
    },
    {
        path: '/ramMemoryPanel',
        element: <RAMMemoryContainer />
    },
    {
        path: '/storagedevicePanel',
        element: <StorageDeviceContainer />
    },
    {
        path: '/videoCardPanel',
        element: <VideoCardContainer />
    }
];

export default AppRoutes;
