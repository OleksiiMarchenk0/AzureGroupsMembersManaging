export interface IAddADMembersProps{
    users:[];
    addUsers:CallableFunction;
    isGroupChosen:boolean;
    chosenGroupDisplayName:string;
}