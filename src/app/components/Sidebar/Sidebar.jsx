'use client';
import { useEffect, useState } from 'react';
import SidebarWrapper, { SidebarItem } from './SidebarWrapper';
import {
  CirclePlus,
  ClipboardCheck,
  LayoutDashboard,
  UserCircle,
} from 'lucide-react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(
    localStorage.getItem('activeItem') || '/'
  );

  const handleItemClick = link => {
    setActiveItem(link);
    localStorage.setItem('activeItem', link);
  };

  useEffect(() => {
    const storedActiveItem = localStorage.getItem('activeItem');
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    }
  }, []);

  return (
    <SidebarWrapper>
      <SidebarItem
        icon={<LayoutDashboard size={20} />}
        text="Dashboard"
        active={activeItem === '/dashboard'}
        onClick={() => handleItemClick('/dashboard')}
        link="/dashboard"
      />
      <SidebarItem
        icon={<ClipboardCheck size={20} />}
        text="Task Management"
        active={activeItem === '/dashboard/management'}
        onClick={() => handleItemClick('/dashboard/management')}
        link="/dashboard/management"
      />
      <SidebarItem
        icon={<CirclePlus size={20} />}
        text="Add Blog"
        active={activeItem === '/dashboard/addblogs'}
        onClick={() => handleItemClick('/dashboard/addblogs')}
        link="/dashboard/addblogs"
      />
      <SidebarItem
        icon={<UserCircle size={20} />}
        text="User Info"
        active={activeItem === '/dashboard/userinfo'}
        onClick={() => handleItemClick('/dashboard/userinfo')}
        link="/dashboard/userinfo"
      />
    </SidebarWrapper>
  );
};

export default Sidebar;
