import { WebPartContext, } from "@microsoft/sp-webpart-base";

export interface IAzureGroupsMembersManagingProps {
  view: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  context: WebPartContext
}
