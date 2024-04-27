import { IMember } from "./IMember";
import { WebPartContext } from "@microsoft/sp-webpart-base";
interface IListMembersSimplestProps {
  members: IMember[]; // Array of member objects
  removeUser: (userId: string) => void; // Function to remove a user
  isGroupChosen: boolean; // Flag indicating whether a group is chosen
  chosenGroupDisplayName:string;
  

}


  // Define the props interface for the RenderMembers component
 interface IListMembersProps {
    members: IMember[]; // Array of member objects
    removeUser: (userId: string) => void; // Function to remove a user
    isGroupChosen: boolean; // Flag indicating whether a group is chosen
    chosenGroupDisplayName:string;
    loading:boolean;
    view: string;
    context: WebPartContext
  }

  export {IListMembersSimplestProps, IListMembersProps}