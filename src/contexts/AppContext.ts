import { GlobalState } from "@/types/types";
import { createContext } from "react";

export const AppContext = createContext<GlobalState | undefined>(undefined);