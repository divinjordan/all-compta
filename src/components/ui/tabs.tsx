import { useState, useContext, createContext, useEffect } from "react";
import {Icon} from "./icons";
import Show from "../interact/show";

const TabContext = createContext<any>({});

export function TabContainer({ children }) {
  const [active, setActive] = useState(0);

  return (
    <TabContext.Provider value={{ active, setActive }}>
      {children}
    </TabContext.Provider>
  );
}

export function TabMenu({
  tabs,
  menuClass,
  itemClass,
  iconClass,
  activeClass,
  activeItem,
}) {
  const { active, setActive } = useContext(TabContext);
  useEffect(() => {
    setActive(tabs[activeItem].text);
  }, [tabs]);
  return (
    <ul className={menuClass}>
      {tabs.map((item, index) => (
        <li
          key={`${index}${item.text}`}
          onClick={() => setActive(item.text)}
          className={`cursor-pointer ${itemClass} ${
            active == item.text ? activeClass : ""
          }`}
        >
          <Icon icon={item.icon} className={iconClass} />
          {item.text}
        </li>
      ))}
    </ul>
  );
}

export function TabItem({ item, children }) {
  const { active } = useContext(TabContext);
  return <Show value={active == item}>{children}</Show>;
}
