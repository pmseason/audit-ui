import Header from "./components/Header";
import ConfigTable from "./components/ConfigTable";
import { StartSearch } from "./components/StartSearch";
import ActionsMenu from "./components/ActionsMenu";
import SearchConfigForm from "./components/SearchConfigForm";
import { Button } from "./components/ui/button";
import { LucidePlusCircle } from "lucide-react";

function App() {
  return (
    <>
      <Header />
      <main className="px-4 flex flex-col items-start gap-4">
        {/* leave as placeholder for future password prompt or something */}
        {true ? (
          <>
            <section className="w-full flex flex-row justify-between items-center">
              <SearchConfigForm
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
            <ConfigTable />
          </>
        ) : (
          <div className="w-full flex justify-center">
          </div>
        )}
      </main>
    </>
  );
}

export default App;
