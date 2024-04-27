// IListGroupsProps interface
export interface IListGroupsProps {
    groups: IGroup[];
    getChosenGroupIdAndName: (id: string,displayname:string) => void;
  }
  
  // IGroup interface
  export interface IGroup {
    id: string;
    displayName: string;
    // Add more properties as needed
  }