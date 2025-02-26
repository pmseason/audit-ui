import React, { ReactNode, useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchConfig, SearchSource } from "@mrinal-c/ai-job-scraper";
import CustomDialog from "./ui/custom-dialog";
import ConditionsInput from "./ui/conditions-input";
import { GlobalState } from "@/types/types";
import { AppContext } from "@/contexts/AppContext";
import { SimpleTooltip } from "./ui/simple-tooltip";

interface AddSearchConfigModalProps {
  supportedSources: SearchSource[];
  searchConfig?: SearchConfig;
  triggerIcon: ReactNode;
}

const AddSearchConfigModal: React.FC<AddSearchConfigModalProps> = ({
  supportedSources,
  triggerIcon,
}) => {
  //local state
  const [isOpen, setIsOpen] = useState(false);
  const [searchSource, setSearchSource] = useState<SearchSource | undefined>(
    undefined
  );

  //global app state
  const { addToConfig } = useContext(AppContext) as GlobalState;

  const searchConfigSchema = z.object({
    scrapeFrom: z.object({
      url: z
        .string()
        .url("Invalid URL")
        .startsWith(searchSource?.url ?? "", "URL must match selected source"),
      name: z.string().min(1, "Source Name is required"),
    }),
    roleType: z.enum(["apm", "internship"]),
    aiQuery: z.string().min(1, "AI Query is required"),
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SearchConfig>({
    resolver: zodResolver(searchConfigSchema),
  });

  const clearForm = () => {
    reset();
    setSearchSource(undefined);
  };

  const handleFormSubmit = (data: SearchConfig) => {
    addToConfig(data);
    setIsOpen(false);
    clearForm();
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{triggerIcon}</div>
      <CustomDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          clearForm();
        }}
        title="Add Config"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <section className="flex flex-row justify-between gap-5">
            <div className="flex flex-col gap-3">
              <div id="searchSource">
                <span className="flex flex-row items-center gap-2 mb-1">
                  <label className="block text-sm font-medium">
                    Pick a Source
                  </label>
                  <SimpleTooltip message="Define whether you are looking for a predefined source or any custom URL" />
                </span>
                <Select
                  onValueChange={(value) => {
                    if (value !== "other") {
                      const source = supportedSources.find(
                        (source) => source.name === value
                      );
                      setSearchSource(source);
                      setValue("scrapeFrom.name", value);
                    } else {
                      setSearchSource({ name: "other", url: "" });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select search source" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      ...supportedSources,
                      { name: "other", url: "Custom URL" },
                    ].map((source) => {
                      return (
                        <SelectItem
                          key={source.name}
                          value={source.name}
                          className="flex flex-row justify-between items-center"
                        >
                          <p className="font-bold">{source.name}</p>
                          <p>{source.url}</p>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div id="scrapeFrom_name">
                <span className="flex flex-row items-center gap-2 mb-1">
                  <label className="block text-sm font-medium">Name</label>
                  <SimpleTooltip message="Name of the source we are searching from" />
                </span>
                {searchSource?.name === "other" ? (
                  <Input
                    {...register("scrapeFrom.name")}
                    placeholder="Uber, Walmart, Jobright, etc."
                    className="min-w-[300px]"
                  />
                ) : (
                  <p className="text-gray-400 border border-solid py-1 px-3 rounded-sm text-sm">
                    {searchSource?.name ?? "Uber, Walmart, Jobright, etc."}
                  </p>
                )}
                <p className="text-red-500 text-xs">
                  {errors.scrapeFrom?.name?.message}
                </p>
              </div>
              <div id="scrapeFrom_url">
                <span className="flex flex-row items-center gap-2 mb-1">
                  <label className="block text-sm font-medium">URL</label>
                  <SimpleTooltip message="Make sure it matches the URL definition if using a predefined source" />
                </span>
                <Input
                  {...register("scrapeFrom.url")}
                  placeholder="https://example.com"
                  className="min-w-[300px]"
                />
                <p className="text-red-500 text-xs">
                  {errors.scrapeFrom?.url?.message}
                </p>
              </div>
              <div>
                <span className="flex flex-row items-center gap-2 mb-1">
                  <label className="block text-sm font-medium">Role Type</label>
                  <SimpleTooltip message="Just for organization, does not affect the search results" />
                </span>
                <Select
                  onValueChange={(value) =>
                    setValue("roleType", value as "apm" | "internship")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apm">APM</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roleType && (
                  <p className="text-red-500 text-xs">
                    {errors.roleType.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div>
                <span className="flex flex-row items-center gap-2 mb-1">
                  <label className="block text-sm font-medium">
                    Job Conditions
                  </label>
                  <SimpleTooltip message="Add up to 5 Job Conditions to filter results. This is where you can be as specific as needed. This is where you can define what role you are looking for, location, etc." />
                </span>
                <ConditionsInput
                  conditions={[]}
                  maxConditions={5}
                  listener={(conditions) => setValue("aiQuery", conditions)}
                />
                {errors.aiQuery && (
                  <p className="text-red-500 text-xs">
                    {errors.aiQuery.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="flex justify-end gap-2 mt-3">
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button> */}
            <Button type="submit" disabled={searchSource === undefined}>
              Save
            </Button>
          </section>
        </form>
      </CustomDialog>
    </>
  );
};

export default AddSearchConfigModal;
