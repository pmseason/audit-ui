import { ReactNode, useContext, useState } from "react";
import CustomDialog from "./ui/custom-dialog";
import { Input } from "./ui/input";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { SearchConfig } from "@mrinal-c/ai-job-scraper";
import { searchConfigListSchema } from "@/types/zod";

interface Props {
  triggerIcon: ReactNode;
}
const UploadConfigModal: React.FC<Props> = ({ triggerIcon }) => {
  //local state
  const [isOpen, setIsOpen] = useState(false);

  //global app state
  const { setSearchConfigs } = useContext(AppContext) as GlobalState;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Ensure it's a JSON file
    if (file.type !== "application/json") {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const configs = JSON.parse(text);
        searchConfigListSchema.parse(configs);
        setSearchConfigs(configs);
      } catch (err) {
        console.error(err);
      } finally {
        setIsOpen(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{triggerIcon}</div>
      <CustomDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Upload Config"
      >
        <Input type="file" accept=".json" onChange={handleFileUpload} />
      </CustomDialog>
    </>
  );
};

export default UploadConfigModal;
