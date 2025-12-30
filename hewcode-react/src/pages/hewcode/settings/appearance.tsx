import { Head } from '@inertiajs/react';

import HeadingSmall from '../../../components/heading-small';
import AppearanceTabs from '../../../components/layouts/appearance-tabs';
import { type BreadcrumbItem } from '../../../types';

import useRoute from '../../../hooks/use-route';
import AppLayout from '../../../layouts/app-layout';
import SettingsLayout from '../../../layouts/settings/layout';

export default function Appearance() {
  const route = useRoute();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Appearance settings',
      href: route('panel::appearance.edit'),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Appearance settings" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
          <AppearanceTabs />
        </div>
      </SettingsLayout>
    </AppLayout>
  );
}
