import { ReactNode, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addOpenRoleSearch, getOpenRoleSearch } from "@/services/api";
import { setOpenRoleTasks } from "@/store/auditSlice";
import { useAppDispatch } from "@/store/hooks";

interface Props {
  triggerIcon: ReactNode;
}

const OpenRoleAuditForm = ({ triggerIcon }: Props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const formSchema = z.object({
    url: z.string().url("Invalid URL"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const clearForm = () => {
    reset();
  };

  const handleFormSubmit = async (data: { url: string }) => {
    try {
      await addOpenRoleSearch({ url: data.url, extra_notes: "" });
      const tasks = await getOpenRoleSearch();
      dispatch(setOpenRoleTasks(tasks));
      clearForm();
      setOpen(false);
    } catch (error) {
      console.error('Error creating open role audit:', error);
      // You might want to show an error toast here
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>{triggerIcon}</div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Open Role Audit Form</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <section className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <Input
                {...register("url")}
                placeholder="https://example.com"
                className="min-w-[300px]"
              />
              <p className="text-red-500 text-xs">{errors.url?.message}</p>
            </div>
          </section>

          <section className="flex justify-end gap-2 mt-3">
            <Button type="submit">Submit</Button>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OpenRoleAuditForm;
