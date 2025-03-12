import ActionsMenu from "@/components/ActionsMenu";
import Header from "@/components/Header";
import { getColumns } from "@/components/MainTable/Columns";
import { DataTable } from "@/components/MainTable/DataTable";
import SearchConfigForm from "@/components/SearchConfigForm";
import { StartSearch } from "@/components/StartSearch";
import { Button } from "@/components/ui/button";
import { AppContext } from "@/contexts/AppContext";
import { GlobalState } from "@/types/types";
import { ArrowRight, LucidePlusCircle } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router";

function Dashboard() {
  const {
    includeInNextSearch,
    excludeFromNextSearch,
    removeFromConfig,
    searchData,
    toggleAll
  } = useContext(AppContext) as GlobalState;
  return (
    <>
      <Header />

      <main className="px-4 flex flex-col items-start gap-4">
        <h1 className="text-2xl">Dashboard</h1>

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

              <div className="flex flex-col gap-2">
                <StartSearch />
              </div>
            </section>

            <Button type="button" variant="secondary" onClick={toggleAll}>Toggle All</Button>
            <DataTable
              columns={getColumns(
                searchData,
                includeInNextSearch,
                excludeFromNextSearch,
                removeFromConfig
              )}
              data={searchData}
            />
          </>
        ) : (
          <div className="w-full flex justify-center"></div>
        )}
      </main>
    </>
  );
}

export default Dashboard;
