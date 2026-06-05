"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { contactMethods } from "@/data/support";

export function ContactMethodsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
      {contactMethods.map((method) => (
        <Card className="p-5" key={method.id}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <StatusBadge tone={method.tone}>{method.label}</StatusBadge>
              <p className="mt-3 text-lg font-semibold text-sb-rice">
                {method.value}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-sb-muted">
            {method.description}
          </p>
          <Button
            aria-label={`Open ${method.label.toLowerCase()} support contact`}
            className="mt-4"
            href={method.href}
            size="sm"
            variant="ghost"
          >
            Open
          </Button>
        </Card>
      ))}
    </div>
  );
}
