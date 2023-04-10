import React, { useState } from 'react';

const SideBarContext = React.createContext(false);
const ToggleSideBarContext = React.createContext(() => {});

export const useSideBarContext = () => React.useContext(SideBarContext);
export const useToggleSideBarContext = () =>
  React.useContext(ToggleSideBarContext);

const SideBarProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggleSideBar, settoggleSideBar] = useState(false);
  const toggleSideBarFunction = () => {
    settoggleSideBar(!toggleSideBar);
  };

  return (
    <SideBarContext.Provider value={toggleSideBar}>
      <ToggleSideBarContext.Provider value={toggleSideBarFunction}>
        {children}
      </ToggleSideBarContext.Provider>
    </SideBarContext.Provider>
  );
};

export default SideBarProvider;
