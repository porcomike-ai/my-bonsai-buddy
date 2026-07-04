import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

interface ConfirmDialogProps extends ConfirmOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  title,
  description,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  destructive = false,
  open,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && <AlertDialogDescription>{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              destructive
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : undefined
            }
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function useConfirm() {
  const [state, setState] = useState<{
    open: boolean;
    options: ConfirmOptions | null;
    resolver: ((value: boolean) => void) | null;
  }>({ open: false, options: null, resolver: null });

  const confirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({ open: true, options, resolver: resolve });
    });
  };

  const handleConfirm = () => {
    state.resolver?.(true);
    setState((s) => ({ ...s, open: false }));
  };

  const handleCancel = () => {
    state.resolver?.(false);
    setState((s) => ({ ...s, open: false }));
  };

  const dialog = state.options ? (
    <ConfirmDialog
      {...state.options}
      open={state.open}
      onOpenChange={(open) => {
        if (!open) handleCancel();
      }}
      onConfirm={handleConfirm}
    />
  ) : null;

  return { confirm, dialog };
}
