import { IMember } from "./IMember";




  // Define the props interface for the RenderMembers component
export interface IListMembersProps {
    members: IMember[]; // Array of member objects
    removeUser: (userId: string) => void; // Function to remove a user
    isGroupChosen: boolean; // Flag indicating whether a group is chosen
    chosenGroupDisplayName:string;
  }