"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getAdminCustomerSummaries } from "@/lib/admin";

const customerSummaries = getAdminCustomerSummaries();

export function AdminCustomersOverview() {
  const [contactedCustomerIds, setContactedCustomerIds] = useState<string[]>(
    [],
  );

  const toggleContacted = (customerId: string) => {
    setContactedCustomerIds((current) =>
      current.includes(customerId)
        ? current.filter((id) => id !== customerId)
        : [...current, customerId],
    );
  };

  return (
    <Card className="p-5 md:p-6" id="customers-admin">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-sb-rice">
            Customer overview
          </h2>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Member rows with loyalty, order, and reservation context.
          </p>
        </div>
        <StatusBadge tone="premium">
          {customerSummaries.length} member profile
        </StatusBadge>
      </div>

      <div className="mt-5 grid gap-3">
        {customerSummaries.map((customer) => {
          const contacted = contactedCustomerIds.includes(customer.id);

          return (
            <div
              className="grid gap-4 rounded-card border border-sb-line bg-sb-ink/50 p-4 lg:grid-cols-[1fr_auto]"
              key={customer.id}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-sb-rice">{customer.name}</p>
                  <StatusBadge tone="premium">{customer.tier}</StatusBadge>
                  {contacted ? (
                    <StatusBadge tone="success">Contacted</StatusBadge>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-sb-muted">
                  {customer.email} - {customer.lifetimeOrders} orders -{" "}
                  {customer.openReservations} open reservations
                </p>
                <p className="mt-1 font-mono text-sm font-semibold text-sb-gold-soft">
                  {customer.points.toLocaleString()} loyalty points
                </p>
              </div>
              <Button
                onClick={() => toggleContacted(customer.id)}
                size="sm"
                variant={contacted ? "ghost" : "secondary"}
              >
                {contacted ? "Reset contact" : "Mark contacted"}
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
