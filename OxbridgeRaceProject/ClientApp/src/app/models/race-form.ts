import { CrewForm } from "./CrewForm";

export class RaceForm {
    public fld_Zipcode: string;
    public fld_Date: Date;
    public fld_IsStarted: Boolean;
    public fld_IsEnded: Boolean;
    public fld_RaceName: string;
    public fld_RaceCoordinator: string;
    public fld_Contestants: Array<CrewForm>;
}
