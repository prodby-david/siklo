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

interface DeleteGroupDialogProps {
  isDeleting: boolean;
  isStarting: boolean;
  onDelete: () => void;
}

export default function DeleteGroupDialog({
  isDeleting,
  isStarting,
  onDelete,
}: DeleteGroupDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button
            disabled={isStarting || isDeleting}
            className="w-full text-xs flex items-center justify-center gap-2 bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/20 px-4 py-2.5 rounded-2xl font-semibold active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
          />
        }
      >
        <Trash2 size={16} />
        {isDeleting ? "Deleting..." : "Delete Group"}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Group</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this group? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer text-xs rounded-2xl">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onDelete}
            className="cursor-pointer text-xs rounded-2xl"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
