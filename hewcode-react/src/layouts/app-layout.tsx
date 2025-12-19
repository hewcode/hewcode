import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import AppLayoutTemplate from './app/app-sidebar-layout';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode[];
  header?: ReactNode;
}

export default ({ children, breadcrumbs, actions, header, ...props }: AppLayoutProps) => (
  <AppLayoutTemplate breadcrumbs={breadcrumbs} actions={actions} header={header} {...props}>
    {children}
  </AppLayoutTemplate>
);
