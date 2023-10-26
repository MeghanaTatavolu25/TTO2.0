import fs   from 'fs'
import path from 'path'

export const after = async (response, request, context) => {
  const { record, StartUpLogo } = context;
  if (record.isValid() && StartUpLogo) {
    const filePath = path.join('public', record.id().toString(), profilePhotoLocation);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
    await fs.promises.rename(profilePhotoLocation.path, filePath);
    await record.update({ profilePhotoLocation: `/${filePath}` });
  }
  console.log("\nresponse", response)
  return response;
}; 

export const before = async (request, context) => {
  if (request.method === 'post') {
    const { profilePhotoLocation, ...otherParams } = request.payload;
    context.profilePhotoLocation = profilePhotoLocation;

    return {
      ...request,
      payload: {
        ...otherParams,
        // profilePhotoLocation,
      }
    };
  }
  return request;
};

