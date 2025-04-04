import { Search } from "@/types/types";

export const downloadFile = (searchData: Search[]) => {

    const configs = searchData.map(datum => datum.config);

    // create file in browser
    const fileName = "search-configuration";
    const json = JSON.stringify(configs, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
}