import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/shared/components/ui/alert-dialog";
import { DeleteGroupDialogProps } from "@/features/groups/types/group.types";

export default function DeleteGroupDialog({
  isDeleting,
  isStarting = false,
  onDelete,
}: DeleteGroupDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className="flex items-center gap-1 text-xs font-semibold px-3 py-2 bg-danger/10 text-danger rounded-2xl cursor-pointer hover:bg-danger/20 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        disabled={isDeleting || isStarting}
      >
        <Trash2 className="w-4 h-4" />
        {isDeleting ? "Deleting..." : "Delete Group"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this group
            and all associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-danger text-white hover:bg-danger/90 cursor-pointer"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete Group"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
