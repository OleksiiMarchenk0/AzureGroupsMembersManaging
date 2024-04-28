import { IMember } from "./IMember";
import { WebPartContext } from "@microsoft/sp-webpart-base";

interface IListMembersSimplestProps {
  members: IMember[];
  removeUser: (userId: string) => void;
  isGroupChosen: boolean;
  chosenGroupDisplayName: string;
}

interface IListMembersProps extends IListMembersSimplestProps {
  loading: boolean;
  view: string;
  context: WebPartContext;
}

export { IListMembersSimplestProps, IListMembersProps };
