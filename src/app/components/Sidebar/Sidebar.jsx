'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SidebarWrapper, { SidebarItem } from './SidebarWrapper';
import {
  ClipboardCheck,
  Home,
  LayoutDashboard,
} from 'lucide-react';

const Sidebar = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('/dashboard'); // Default to '/dashboard'

  const handleItemClick = (link) => {
    setActiveItem(link);
    localStorage.setItem('activeItem', link);
    router.push(link);
  };

  useEffect(() => {
    const storedActiveItem = localStorage.getItem('activeItem');
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    } else {
      setActiveItem('/dashboard'); // Default to '/dashboard' if no stored item
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
        icon={<Home size={20} />}
        text="Home"
        active={activeItem === '/home'}
        onClick={() => handleItemClick('/dashboard')}
        link="/home"
      />
    </SidebarWrapper>
  );
};

export default Sidebar;