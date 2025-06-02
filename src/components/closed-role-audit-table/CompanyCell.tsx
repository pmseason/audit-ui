import { ClosedRoleAuditTask } from "../../types/audit";

type CompanyCellProps = {
  company: ClosedRoleAuditTask["job"]["company"];
};

export const CompanyCell = ({ company }: CompanyCellProps) => {
  return (
    <div className="flex items-center gap-2">
      {company.logo ? (
        <img
          src={`${import.meta.env.VITE_IMAGES_CDN_URL}/${company.logo.filename_disk}`}
          alt={`${company.name} logo`}
          className="h-6 w-6 rounded-sm object-contain"
        />
      ) : (
        <div className="h-6 w-6 rounded-sm bg-muted flex items-center justify-center">
          <span className="text-xs font-medium text-muted-foreground">
            {company.name.charAt(0)}
          </span>
        </div>
      )}
      <span className="font-medium">{company.name}</span>
    </div>
  );
}; 