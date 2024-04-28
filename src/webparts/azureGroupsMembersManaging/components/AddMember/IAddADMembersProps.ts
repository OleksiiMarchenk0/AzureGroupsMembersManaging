import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IMember } from "../GetMembers/IMember";

interface IAddADMembersSimpleProps {
  addUsers: CallableFunction;
  isGroupChosen: boolean;
  chosenGroupDisplayName: string;
  adusers: IMember[];
  context: WebPartContext;
  groupId: string;
}

interface IAddADMembersProps extends IAddADMembersSimpleProps {
  view: string;
  loading: boolean;
}

export { IAddADMembersProps, IAddADMembersSimpleProps };
