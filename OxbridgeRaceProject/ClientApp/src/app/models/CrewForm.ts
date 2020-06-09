export class CrewForm {
  fld_CrewName: string; 
  fld_Captain: string; 
  fld_Members: number;
  fld_Position: number; 
  fld_Password: string; 
  fld_Email: string; 
  fld_Category: string;

  constructor(response:any) {
    this.fld_Captain = response.fld_Captain;
    this.fld_CrewName = response.fld_CrewName;
    this.fld_Members = response.fld_Members;
    this.fld_Position = response.fld_Password;
    this.fld_Email = response.fld_Email;
    this.fld_Password = response.fld_Password;
    this.fld_Category = response.fld_Category;
  }
}
