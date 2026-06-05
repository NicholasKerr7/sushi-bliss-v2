import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/layout/AppShell";
import {
  customerRouteIds,
  getCustomerRouteLabel,
  isCustomerRouteId,
} from "@/data/customerRoutes";
import { CustomerRouteScreen } from "@/features/routes/CustomerRouteScreen";

interface CustomerScreenPageProps {
  params: Promise<{
    screen: string;
  }>;
}

export function generateStaticParams() {
  return customerRouteIds.map((screen) => ({ screen }));
}

export async function generateMetadata({
  params,
}: CustomerScreenPageProps): Promise<Metadata> {
  const { screen } = await params;

  if (!isCustomerRouteId(screen)) {
    return {};
  }

  return {
    title: getCustomerRouteLabel(screen),
  };
}

export default async function CustomerScreenPage({
  params,
}: CustomerScreenPageProps) {
  const { screen } = await params;

  if (!isCustomerRouteId(screen)) {
    notFound();
  }

  return (
    <AppShell>
      <CustomerRouteScreen routeId={screen} />
    </AppShell>
  );
}
