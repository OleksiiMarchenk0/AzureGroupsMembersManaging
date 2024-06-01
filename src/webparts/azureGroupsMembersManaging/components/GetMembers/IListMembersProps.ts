import { IMember } from "./IMember";
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface IListMembersSimplestProps {
  members: IMember[];
  removeUser: (userId: string) => void;
  isGroupChosen: boolean;
  chosenGroupDisplayName: string;
  usersPerPage?:number;
}
interface IListMembersSimplestPropsForExtend extends IListMembersSimplestProps{

  usersPerPage:number;
}

interface IListMembersProps extends IListMembersSimplestProps {
  loading: boolean;
  view: string;
  usersPerPage:number;
  context: WebPartContext;
}

export { IListMembersSimplestProps, IListMembersProps,IListMembersSimplestPropsForExtend };
