import { Button } from "./ui/button";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { LucideWrench } from "lucide-react";
import UploadConfigForm from "./UploadConfigForm";
import { downloadFile } from "@/api/downloader";

export default function ActionsMenu() {
  //global app state
  const { searchConfigData } = useContext(
    AppContext
  ) as GlobalState;


  return (
    <section className="flex flex-row gap-2 p-2 border border-black rounded-sm">
      
      <Button onClick={() => downloadFile(searchConfigData)}>
        <LucideWrench />
        Download Configuration
      </Button>
      <Button>
        <LucideWrench />
        <UploadConfigForm triggerIcon={"Upload Configuration"} />
      </Button>
    </section>
  );
}
