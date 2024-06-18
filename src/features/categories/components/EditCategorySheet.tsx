
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle 
} from "@/components/ui/sheet";

import { insertCategorySchema } from "@/db/schema";
import { UseConfirm } from "@/hooks/UseConfirm";
import { useOpenCategory } from "@/features/categories/hooks/UseOpenCategories";
import { useGetCategory } from "@/features/categories/api/UseGetCategory";
import { useEditCategory } from "@/features/categories/api/UseEditCategory";
import { useDeleteCategory } from "@/features/categories/api/UseDeleteCategory";
import { CategoryForm } from "@/features/categories/components/CategoryForm";

const formSchema = insertCategorySchema.pick({
  name: true,
  });

type FormValues = z.input<typeof formSchema>;

type Props = {};

const EditCategorySheet = (props: Props) => {

  const { isOpen, onClose, id } = useOpenCategory();
  const categoryQuery = useGetCategory( id );
  const editMutation = useEditCategory( id );
  const deleteMutation = useDeleteCategory( id );

  const [DeleteConfirmDialog, confirm] = UseConfirm(
    "Are you sure?",
    "You want to delete this category?"
  )

  const isLoading = categoryQuery.isLoading;
  const isPending = 
      editMutation.isPending || 
      deleteMutation.isPending;

  const onSubmit = (values: FormValues ) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if( ok ) {
      deleteMutation.mutate( undefined, {
        onSuccess: () => {
          onClose();
        }
      });
    }
  };

  const defaultValues = categoryQuery.data ? {
    name: categoryQuery.data.name
  } : {
    name: ""
  };

  return (
    <>
      <DeleteConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className=" space-y-4">
          <SheetHeader>
            <SheetTitle>
              Edit Category
            </SheetTitle>
            <SheetDescription>
              Edit an existing category
            </SheetDescription>
          </SheetHeader>
          {isLoading 
            ? (
              <div className=" absolute inset-0 flex items-center justify-center">
                <Loader2 className=" size-4 text-muted-foreground animate-spin " />
              </div>
            ) : (
              <CategoryForm
                  id={id}
                  onSubmit={onSubmit} 
                  disabled={isPending} 
                  defaultValues = {defaultValues}
                  onDelete={onDelete}
                /> 
            )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default EditCategorySheet;
