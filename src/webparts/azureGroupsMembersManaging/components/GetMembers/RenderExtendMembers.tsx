import * as React from "react";
import { Text, TextField } from "@fluentui/react";
import { IListMembersProps } from "./IListMembersProps";
import { Persona, DefaultButton } from "@fluentui/react";
import { mergeStyles } from "@fluentui/react/lib/Styling";
import styles from "./RenderMembers.module.scss"; // Import the SCSS file

export default function RenderExtendMembers(props: IListMembersProps) {
  const { members, removeUser, isGroupChosen,chosenGroupDisplayName } = props;
  const [searchText, setSearchText] = React.useState<string>("");
  console.log(chosenGroupDisplayName);
  

  // Filter members based on search text
  const filteredMembers = searchText
    ? members.filter(member => member.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
    : members;

    
  return (
    <>
      {isGroupChosen && (
        <>
          <h2>Members of the group {chosenGroupDisplayName}</h2>
          {members && members.length > 0 ? (
            <>
              <TextField
                label="Search members"
                value={searchText}
                onChange={(event, newValue) => setSearchText(newValue || "")}
              />
              {filteredMembers.map((member: any) => (
                <div
                  key={member.id}
                  className={mergeStyles(styles.memberContainer)}
                >
                  <Persona
                    imageUrl={member.imageUrl} 
                    text={member.displayName}
                    secondaryText={member.jobTitle} 
                  />
                  <DefaultButton
                    onClick={() => removeUser(member.id)} 
                    iconProps={{ iconName: "Cancel" }} 
                    className={styles.cancelButton} 
                  />
                </div>
              ))}
            </>
          ) : (
            <Text>No members found</Text>
          )}
        </>
      )}
    </>
  );
}
