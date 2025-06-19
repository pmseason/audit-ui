import { ScrapedPosition } from "@/types/audit";
import { PlusCircle, Trash2, ExternalLink } from "lucide-react";
import { promoteScrapedPosition, deleteScrapedPosition } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppSelector } from "@/store/hooks";

interface ActionsCellProps {
    position: ScrapedPosition;
}   

export const ActionsCell = ({ position }: ActionsCellProps) => {
    const { id } = position;
    const { isLoading } = useAppSelector((state) => state.audit);

    const handlePromote = async () => {
        try {
            // dispatch(setLoading(true));
            await promoteScrapedPosition(id);
            window.location.reload();
        } catch (error) {
            console.error('Failed to promote position:', error);
        } finally {
            // dispatch(setLoading(false));
        }
    };

    const handleDelete = async () => {
        try {
            // dispatch(setLoading(true));
            await deleteScrapedPosition(id);
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete position:', error);
        } finally {
            // dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex items-center gap-2">
            {position.positions.length === 0 ? (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePromote}
                            disabled={isLoading}
                        >
                            <PlusCircle className="h-4 w-4 text-green-600 hover:text-green-700" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Promote to positions
                    </TooltipContent>
                </Tooltip>
            ) : (
                <Tooltip>
                    <TooltipTrigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                            disabled={isLoading}
                        >
                            <Trash2 className="h-4 w-4 text-red-600 hover:text-red-700" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Delete position
                    </TooltipContent>
                </Tooltip>
            )}
            <Tooltip>
                <TooltipTrigger>
                    <a
                        href={`https://directus.apmseason.com/admin/content/scraped_positions/${id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center"
                    >
                        <ExternalLink className="h-4 w-4 text-blue-600 hover:text-blue-700" />
                    </a>
                </TooltipTrigger>
                <TooltipContent>
                    Edit in Directus
                </TooltipContent>
            </Tooltip>
        </div>
    );
};