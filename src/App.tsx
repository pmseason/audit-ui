import { useContext } from "react";
import Header from "./components/Header";
import ConfigTable from "./components/ConfigTable";
import { GlobalState } from "./types/types";
import { AppContext } from "./contexts/AppContext";
import { StartSearch } from "./components/StartSearch";
import ActionsMenu from "./components/ActionsMenu";
import AddSearchConfigModal from "./components/AddSearchModal";
import { Button } from "./components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import ServerInput from "./components/ServerInput";

function App() {
  //global app state
  const { supportedSources, searchConfigs, serverUrl } = useContext(
    AppContext
  ) as GlobalState;

  return (
    <>
      <Header />
      <main className="px-4 flex flex-col items-start gap-4">
        {serverUrl.length > 0 ? (
          <>
            <section className="w-full flex flex-row justify-between items-center">
              <AddSearchConfigModal
                supportedSources={supportedSources}
                triggerIcon={
                  <Button>
                    {" "}
                    <LucidePlusCircle /> Add Item
                  </Button>
                }
              />
              <ActionsMenu />

              <StartSearch />
            </section>
            <ConfigTable configs={searchConfigs} />
          </>
        ) : (
          <div className="w-full flex justify-center">
            <ServerInput />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
