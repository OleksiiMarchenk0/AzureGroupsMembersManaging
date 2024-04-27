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
}
export { IGroupProps, IGetGroupProps };
