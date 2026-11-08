export type Navbar = 'blog' | 'archive' | 'resume';

export interface NavbarProps {
  closeMenu?: () => void;
}

export interface PageTagProps {
  params: Promise<{
    tagName: string;
  }>;
}

export interface PageCategoryProps {
  params: Promise<{
    categoryName: string;
  }>;
}

export interface PageSlugProps {
  params: Promise<{
    slug: string;
  }>;
}

export interface PageSeriesProps {
  params: Promise<{
    title: string;
  }>;
}

export type Theme = 'dark' | 'light';

export interface HeaderProps {
  theme: Theme | undefined;
  changeTheme: () => void;
}

export interface TagProps {
  name: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | '0.5em';
  selected?: boolean;
}
