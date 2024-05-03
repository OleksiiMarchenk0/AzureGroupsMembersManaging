import { MSGraphClient } from "@microsoft/sp-http";

export const getPhotoService = async (context: any, userId: string) => {
  try {
    const client: MSGraphClient = await context.msGraphClientFactory.getClient();
    const response = await client
      .api(`/users/${userId}/photo/$value`)
      .version('v1.0')
      .responseType('blob')
      .get();



    if (response) {
      return URL.createObjectURL(response);
    } else {
      throw new Error('Failed to fetch photo: Response is empty');
    }
  } catch (error) {
    console.error('Error fetching member photo:', error.message);
    console.error('Error stack:', error.stack);
    return null;
  }
};