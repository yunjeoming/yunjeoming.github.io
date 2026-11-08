import React from 'react';
import { usePathname } from 'next/navigation';
import { NavbarProps } from '@/types/common';
import NavbarLink from './NavbarLink';

const links = [
  {
    name: 'Blog',
    href: '/blog',
  },
  // {
  //   name: 'Memo',
  //   href: '/memo',
  // },
  // {
  //   name: 'Issue',
  //   href: '/issue',
  // },
  // {
  //   name: 'Resume',
  //   href: '/resume',
  // },
  {
    name: 'Series',
    href: '/series',
  },
];

const NavbarContent: React.FC<NavbarProps> = ({ closeMenu }) => {
  const pathname = '/' + usePathname().split('/')[1];


  return (
    <>
      {links.map((link) => (
        <NavbarLink key={link.name} link={link} onClick={() => closeMenu?.()} selected={link.href == pathname} />
      ))}
    </>
  );
};

export default NavbarContent;
