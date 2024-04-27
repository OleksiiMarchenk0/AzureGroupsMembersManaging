import { WebPartContext } from "@microsoft/sp-webpart-base";

interface IGroupProps {
  id: string;
  displayName: string;
}

interface IGetGroupProps {
  context: WebPartContext;
  groups: IGroupProps[];
  filteredGroups: IGroupProps[];
  loading: boolean;
  getChosenGroupIdAndName: (id: string, displayName: string) => void;
  view: string;
  isAdmin:boolean;
}

interface IGetGroupSimpleProps {
  context: WebPartContext;
  groups: IGroupProps[];
  filteredGroups: IGroupProps[];
  loading: boolean;
  getChosenGroupIdAndName: (id: string, displayName: string) => void;
  view: string;

}


interface IGetGroupRenderProps {

  groups: IGroupProps[];
  filteredGroups: IGroupProps[];

  getChosenGroupIdAndName: (id: string, displayName: string) => void;

  isAdmin:boolean;
}
export { IGroupProps, IGetGroupProps,IGetGroupSimpleProps, IGetGroupRenderProps };
