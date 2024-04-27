define([], function () {
  return {
    PropertyPaneDescription:
      "Solution appears to be developed for managing user access and permissions within an Active Directory (AD) environment",
    BasicGroupName: "Manage webpart",
    DescriptionFieldLabel: "Description Field",
    AppLocalEnvironmentSharePoint:
      "The app is running on your local environment as SharePoint web part",
    AppLocalEnvironmentTeams:
      "The app is running on your local environment as Microsoft Teams app",
    AppLocalEnvironmentOffice:
      "The app is running on your local environment in office.com",
    AppLocalEnvironmentOutlook:
      "The app is running on your local environment in Outlook",
    AppSharePointEnvironment: "The app is running on SharePoint page",
    AppTeamsTabEnvironment: "The app is running in Microsoft Teams",
    AppOfficeEnvironment: "The app is running in office.com",
    AppOutlookEnvironment: "The app is running in Outlook",
    UnknownEnvironment: "The app is running in an unknown environment",
    OrLabel:"or",
    PropertyPaneViewTitle: {
      title: "View mode",
      options: {
        simple: "Simple",
        extended: "Extended",
      },
    },
    Group: {
      label: "Select a group",
      searchLabel: "Search groups",
      availableLabel:"Available groups",
      loadingProgressLabel:"Loading groups"
    

    },
    Members: {
      label: "Members of the group",
      serchLabel: "Search members",
      addToGroupLabel: "Add members to group",
      selectFromEntraIDLabel: "Select a user from Entra ID",
      loadingAADUsersProgressLabel:"Loading all AAD users",
      searchInEntraIDLabel: "Search users in Entra ID",
      addUserBtnLabel: "Add a user",
      loadingPermissionsProgressLabel:"Loading your permissions"
    },
  };
});
