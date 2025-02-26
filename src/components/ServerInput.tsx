import { validateRemoteServer } from "@/api/api";
import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";

const ServerInput: React.FC = () => {
  //local state
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  //global app state
  const { setServerUrl } = useContext(AppContext) as GlobalState;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleValidation = async () => {
    const valid = await validateRemoteServer(url);
    if (valid) {
      setServerUrl(url);
    } else {
      setError("Invalid Remote URL");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Input
        type="text"
        value={url}
        onChange={handleChange}
        placeholder="Enter server URL"
        className={`border ${error ? "border-red-500" : "border-gray-300"}`}
      />
      <Button onClick={handleValidation}>Validate</Button>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default ServerInput;
