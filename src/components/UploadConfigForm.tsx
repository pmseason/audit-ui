import { ReactNode, useContext, useState } from "react";
import CustomDialog from "./ui/custom-dialog";
import { Input } from "./ui/input";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { searchConfigListSchema } from "@/types/zod";
import { Checkbox } from "./ui/checkbox";

interface Props {
  triggerIcon: ReactNode;
}
const UploadConfigForm: React.FC<Props> = ({ triggerIcon }) => {
  //local state
  const [isOpen, setIsOpen] = useState(false);
  const [overwriteConfig, setOverwriteConfig] = useState(false);
  const [error, setError] = useState("");

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
        setSearchConfigs(configs, overwriteConfig);
        setIsOpen(false);
      } catch (err) {
        setError(String(err));
      }
    };

    reader.readAsText(file);
  };

  const onClose = () => {
    setError("")
    setOverwriteConfig(false);
    setIsOpen(false);
  }

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{triggerIcon}</div>
      <CustomDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Upload Config"
      >
        <div className="flex flex-col gap-2">
          <Input type="file" accept=".json" onChange={handleFileUpload} />
          <span className="flex items-center gap-2">
            {/* <Checkbox
              defaultChecked={false}
              onCheckedChange={(checked) => {
                if (checked) setOverwriteConfig(true);
                else setOverwriteConfig(false);
              }}
            /> */}
            {/* <p className="text-xs">
              Overwrite current search config (uncheck to add to it)
            </p> */}
          </span>
          <p className="text-red-500 text-xs">{error}</p>
        </div>
      </CustomDialog>
    </>
  );
};

export default UploadConfigForm;
