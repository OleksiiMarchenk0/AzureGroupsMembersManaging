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
  PropertyPaneViewTitle: {
    title: string;
    options: {
      simple: string;
      extended:string;
    }

  }
}

declare module 'AzureGroupsMembersManagingWebPartStrings' {
  const strings: IAzureGroupsMembersManagingWebPartStrings;
  export = strings;
}
