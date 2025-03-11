import ActionsMenu from "@/components/ActionsMenu";
import ConfigTable from "@/components/ConfigTable";
import Header from "@/components/Header";
import SearchConfigForm from "@/components/SearchConfigForm";
import { StartSearch } from "@/components/StartSearch";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucidePlusCircle } from "lucide-react";
import { Link } from "react-router";

function Dashboard() {
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
                <Button><Link to="/results">Results</Link> <ArrowRight /> </Button>
                <StartSearch />
              </div>
            </section>
            <ConfigTable />
          </>
        ) : (
          <div className="w-full flex justify-center"></div>
        )}
      </main>
    </>
  );
}

export default Dashboard;
