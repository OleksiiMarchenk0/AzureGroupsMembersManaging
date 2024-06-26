import { WebPartContext } from "@microsoft/sp-webpart-base";

interface IGroupProps {
  id: string;
  displayName: string;
}

interface IGetGroupBaseProps {
  groups: IGroupProps[];
  filteredGroups: IGroupProps[];
  getChosenGroupIdAndName: (id: string, displayName: string) => void;
  chosenGroupId:string;
}

interface IGetGroupSimpleProps extends IGetGroupBaseProps {
  context: WebPartContext;
  loading: boolean;
  view: string;
 
}
interface IGroupPromise {
  groupId: string;
  groupOwnersResponse: any;
}

interface IGetGroupProps extends IGetGroupSimpleProps {
  isAdmin: boolean;
}

interface IGetGroupRenderProps extends IGetGroupBaseProps {
  isAdmin: boolean;
}

export {
  IGroupProps,
  IGetGroupProps,
  IGetGroupSimpleProps,
  IGetGroupRenderProps,
  IGroupPromise
};
