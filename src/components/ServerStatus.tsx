import {
  Ban,
  Check,
  CircleAlert,
  MessageCircleWarningIcon,
  RefreshCw,
} from "lucide-react";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { checkServerStatus } from "@/api/api";

export function ServerStatus() {
  //global app state
  const { serverStatus } = useContext(AppContext) as GlobalState;

  return (
    <span className="flex flex-row gap-2">
      <div onClick={checkServerStatus}>
        <RefreshCw size={20}/>
      </div>

      {(() => {
        switch (serverStatus) {
          case "pingable":
            return (
              <p>

                 Server ch Chrome
              </p>
            );
          case "auditable":
            return (
              <p>
                {" "}
                <Check color="green" /> Server reach Chrome
              </p>
            );
          case "down":
            return (
              <p>
                {" "}
                <Ban color="red" /> Server is Up, Cannot reach Chrome
              </p>
            );
          default:
            return <span className="text-gray-500">Unknown server status</span>;
        }
      })()}
    </span>
  );
}
