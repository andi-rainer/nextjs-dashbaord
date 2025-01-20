import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{id: string}> }) {
  const params = await props.params;
  const id = await params.id;

  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

  if (!invoice) {
    notFound();
  }

  const breadcrumbs = [
    {
      label: 'Invoices',
      href: '/dashboard/invoices'
    },
    {
      label: 'Edit Invoice',
      href: `/dashboard/invoices/${id}/edit`, active: true
    }];

  return (
    <main>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}