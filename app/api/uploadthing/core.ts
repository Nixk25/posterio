import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    "image/png": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
    "image/jpeg": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
    "image/webp": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ file }) => {
      // This code RUNS ON YOUR SERVER after upload

      console.log("file url", file.ufsUrl);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: "Nick" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
