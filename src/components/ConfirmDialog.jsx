"use client";

import { AlertDialog, Button } from "@heroui/react";

const CONFIRM_STYLES = {
  danger: "bg-red-600 hover:bg-red-500 text-white",
  warning: "bg-amber-500 hover:bg-amber-400 text-slate-950",
  accent: "bg-blue-600 hover:bg-blue-500 text-white",
  success: "bg-emerald-600 hover:bg-emerald-500 text-white",
};

export default function ConfirmDialog({
  isOpen,
  onOpenChange,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  status = "danger", // danger | warning | accent | success
  onConfirm,
}) {
  return (
    <AlertDialog>
      <AlertDialog.Backdrop
        variant="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable
        isKeyboardDismissDisabled={false}
      >
        <AlertDialog.Container placement="center" size="sm">
          <AlertDialog.Dialog className="bg-slate-900 border border-slate-700 text-white">
            {({ close }) => (
              <>
                <AlertDialog.Header>
                  <AlertDialog.Icon status={status} />
                  <AlertDialog.Heading className="text-white">{title}</AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body>
                  <p className="text-sm text-slate-300">{message}</p>
                </AlertDialog.Body>

                <AlertDialog.Footer>
                  <Button
                    onPress={close}
                    className="bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
                  >
                    {cancelLabel}
                  </Button>
                  <Button
                    onPress={() => {
                      close();
                      onConfirm?.();
                    }}
                    className={`font-semibold ${CONFIRM_STYLES[status] || CONFIRM_STYLES.danger}`}
                  >
                    {confirmLabel}
                  </Button>
                </AlertDialog.Footer>
              </>
            )}
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}