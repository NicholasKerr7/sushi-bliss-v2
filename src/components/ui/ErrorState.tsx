import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { classNames } from "@/lib/classNames";

interface ErrorStateProps {
  className?: string;
  message: ReactNode;
  onRetry?: () => void;
  title?: ReactNode;
}

export function ErrorState({
  className,
  message,
  onRetry,
  title = "Something went wrong",
}: ErrorStateProps) {
  return (
    <Card className={classNames("border-sb-red/40 p-6", className)}>
      <h3 className="text-lg font-semibold text-sb-rice">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-sb-muted">{message}</p>
      {onRetry ? (
        <div className="mt-5">
          <Button onClick={onRetry} variant="secondary">
            Retry
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
