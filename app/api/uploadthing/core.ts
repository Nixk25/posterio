import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/auth";
import { headers } from "next/headers";
export const ourFileRouter = {
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
    .middleware(async () => {
      const session = await auth.api.getSession({
        headers: await headers(),
      });
      if (!session) throw new UploadThingError("Unauthorized");

      return { name: session?.user?.name };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.name };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
