import { usePage } from '@inertiajs/react';
import DataTable from '../../../components/data-table/DataTable';
import PageLayout from '../../../layouts/pages/page-layout';

export default function Index() {
  const { listing } = usePage().props;

  return (
    <PageLayout>
      <DataTable {...listing} />
    </PageLayout>
  );
}
