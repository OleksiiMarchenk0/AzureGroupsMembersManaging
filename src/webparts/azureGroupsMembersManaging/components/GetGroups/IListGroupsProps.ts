// IListGroupsProps interface
export interface IListGroupsProps {
    groups: IGroup[];
    getChosenGroupId: (id: string) => void;
  }
  
  // IGroup interface
  export interface IGroup {
    id: string;
    displayName: string;
    // Add more properties as needed
  }