import Image from "next/image";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { classNames } from "@/lib/classNames";

interface EmptyStateProps {
  action?: ReactNode;
  className?: string;
  iconUrl?: string;
  message: ReactNode;
  title: ReactNode;
}

export function EmptyState({
  action,
  className,
  iconUrl = "/assets/icons/floral-emblem-icon.png",
  message,
  title,
}: EmptyStateProps) {
  return (
    <Card className={classNames("p-6 text-center", className)}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-sb-gold/30 bg-sb-gold/10">
        <Image
          alt=""
          className="h-7 w-auto object-contain"
          height={28}
          src={iconUrl}
          width={28}
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-sb-rice">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-sb-muted">
        {message}
      </p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </Card>
  );
}
