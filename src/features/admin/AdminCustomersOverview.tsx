"use client";

import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getAdminCustomerSummaries } from "@/lib/admin";

const customerSummaries = getAdminCustomerSummaries();

export function AdminCustomersOverview() {
  const [contactedCustomerIds, setContactedCustomerIds] = useState<string[]>(
    [],
  );
  const openReservationCount = customerSummaries.reduce(
    (total, customer) => total + customer.openReservations,
    0,
  );
  const loyaltyPointCount = customerSummaries.reduce(
    (total, customer) => total + customer.points,
    0,
  );
  const customerSummary = [
    {
      detail: "Profiles in mock CRM",
      icon: "/assets/icons/user-icon.png",
      label: "Members",
      value: customerSummaries.length,
    },
    {
      detail: "Total loyalty value",
      icon: "/assets/icons/lotus-crown-icon.png",
      label: "Points",
      value: loyaltyPointCount.toLocaleString(),
    },
    {
      detail: "Open reservations",
      icon: "/assets/icons/calendar-icon.png",
      label: "Open RSV",
      value: openReservationCount,
    },
  ] as const;

  const toggleContacted = (customerId: string) => {
    setContactedCustomerIds((current) =>
      current.includes(customerId)
        ? current.filter((id) => id !== customerId)
        : [...current, customerId],
    );
  };

  return (
    <Card className="overflow-hidden p-0" id="customers-admin">
      <div className="relative border-b border-white/10 bg-[radial-gradient(circle_at_14%_0%,rgba(215,168,79,0.12),transparent_34%),rgba(0,0,0,0.2)] p-5 md:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.7),transparent)]"
        />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px] xl:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-[13px] border border-sb-gold/30 bg-sb-gold/10">
                <AssetIcon
                  loading="eager"
                  size={26}
                  src="/assets/icons/user-settings-icon.png"
                />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sb-gold-soft">
                  Member CRM
                </p>
                <h2 className="mt-1 text-xl font-semibold text-sb-rice">
                  Customer overview
                </h2>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-sb-muted">
              Member rows with loyalty, order, reservation, and support contact
              context for future Supabase profile operations.
            </p>
          </div>
          <div className="grid grid-cols-3 overflow-hidden rounded-[14px] border border-white/10 bg-black/24">
            {customerSummary.map((item) => (
              <div
                className="min-w-0 border-l border-white/10 px-3 py-3 first:border-l-0 sm:px-4"
                key={item.label}
              >
                <div className="flex items-center gap-2">
                  <AssetIcon size={18} src={item.icon} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sb-dim">
                    {item.label}
                  </p>
                </div>
                <p className="mt-1 font-mono text-lg font-semibold text-sb-rice">
                  {item.value}
                </p>
                <p className="mt-0.5 hidden truncate text-[11px] text-sb-dim sm:block">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:p-5">
        {customerSummaries.map((customer) => {
          const contacted = contactedCustomerIds.includes(customer.id);

          return (
            <div
              className="grid gap-4 rounded-[14px] border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] min-[900px]:grid-cols-[minmax(0,1fr)_236px] min-[900px]:items-center"
              key={customer.id}
            >
              <div className="grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-[13px] border border-white/10 bg-black/32">
                  <AssetIcon size={26} src="/assets/icons/user-icon.png" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-sb-rice">
                      {customer.name}
                    </p>
                    <StatusBadge tone="premium">{customer.tier}</StatusBadge>
                    {contacted ? (
                      <StatusBadge tone="success">Contacted</StatusBadge>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm leading-6 text-sb-muted">
                    {customer.email} - {customer.lifetimeOrders} orders -{" "}
                    {customer.openReservations} open reservations
                  </p>
                  <p className="mt-2 font-mono text-sm font-semibold text-sb-gold-soft">
                    {customer.points.toLocaleString()} loyalty points
                  </p>
                </div>
              </div>
              <Button
                aria-label={`${contacted ? "Reset contact for" : "Mark contacted"} ${customer.name}`}
                className="h-11 rounded-[12px] text-[12px] uppercase tracking-[0.08em]"
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
