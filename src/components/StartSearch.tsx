import { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { beginSearch } from "@/api/api";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { pollSearchResults } from "@/api/poller";
import { toast } from "sonner";

export function StartSearch() {
  //local state
  const [chromeUrl, setChromeUrl] = useState("");

  //global app state
  const {  setCurrentAuditId, addToSearchResults, getSearchableConfigs, serverUrl } = useContext(
    AppContext
  ) as GlobalState;

  const beginAudit = async () => {
    //start a search, receive auditid on success
    const configs = getSearchableConfigs();
    const id = await beginSearch(serverUrl, chromeUrl, configs);
    if (!id) return;

    //set global audit id
    setCurrentAuditId(id);
    //start polling for searchResults
    const searchStatus = pollSearchResults(id);
    toast.promise(searchStatus, {
      loading: "Started an audit...",
      success: "Audit has successfully run!",
      error: "An error has occurred, sorry"
    });
    searchStatus.then(addToSearchResults);
  };

  return (
    <span className="flex flex-row gap-3">
      {/* <Input
        value={chromeUrl}
        onChange={(e) => setChromeUrl(e.target.value)}
      ></Input> */}
      <Button
        type="button"
        onClick={beginAudit}
      >
        Begin Audit Search
      </Button>
    </span>
  );
}
