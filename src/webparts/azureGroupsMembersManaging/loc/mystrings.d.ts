declare interface IAzureGroupsMembersManagingWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  OrLabel: string;
  PropertyPaneViewTitle: {
    title: string;
    options: {
      simple: string;
      extended: string;
    };
  };
  PropertyPaneUsersPerPage:{
    title:string;
    description:string;
  };
  Group: {
    label: string;
    searchLabel: string;
    availableLabel: string;
    noAvailableWarningLabel: string;
    loadingProgressLabel: string;
  };
  Members: {
    label: string;
    searchLabel: string;
    addToGroupLabel: string;
    selectFromEntraIDLabel: string;
    searchInEntraIDLabel: string;
    addUserBtnLabel: string;
    loadingAADUsersProgressLabel: string;
    loadingPermissionsProgressLabel: string;
    noMembersFoundWarning:string;
  };

  // AddMemberToGroupLabel:string;
  SelectAUserFromEntraIDLabel: string;
  SearchUsersInEntraIDLabel: string;
  AddUserButtonLabel: string;
}

declare module "AzureGroupsMembersManagingWebPartStrings" {
  const strings: IAzureGroupsMembersManagingWebPartStrings;
  export = strings;
}
