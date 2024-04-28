import { IGroupProps } from "./IGroupProps";

export interface IListGroupsProps {
  groups: IGroupProps[];
  getChosenGroupIdAndName: (id: string, displayname: string) => void;
}
