import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IMember } from "../GetMembers/IMember";

 interface IAddADMembersSimpleProps{
    // users:IMember[];
    addUsers:CallableFunction;
    isGroupChosen:boolean;
    chosenGroupDisplayName:string;
    adusers:IMember[];
    context: WebPartContext;
    groupId:string;

}

interface IAddADMembersProps{
    // users:IMember[];
    addUsers:CallableFunction;
    isGroupChosen:boolean;
    chosenGroupDisplayName:string;
    view:string;
    loading:boolean;
    adusers:IMember[];
    context: WebPartContext;
    groupId:string;
}

export{IAddADMembersProps, IAddADMembersSimpleProps}

