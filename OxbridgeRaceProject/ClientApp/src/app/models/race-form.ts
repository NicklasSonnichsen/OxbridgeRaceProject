import { CrewForm } from "./CrewForm";

export class RaceForm {
    constructor(

    public fld_Zipcode: number,
    public fld_Date: string,
    public fld_IsStarted: Boolean,
    public fld_IsEnded: Boolean,
    public fld_RaceName: string,
    public fld_RaceCoordinator: string,
    public fld_Contestants: Array<CrewForm>,
    ){}
}
