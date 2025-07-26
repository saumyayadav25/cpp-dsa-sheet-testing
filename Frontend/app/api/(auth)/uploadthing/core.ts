import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import jwt from "jsonwebtoken";
import { User } from "@/models/User.model";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB",
    },
  })
    .middleware(async ({ req }) => {
      //get user info
      const token = (await cookies()).get("session")?.value as string;

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id?: string };
      } catch (err) {
        throw new UploadThingError("Invalid or expired token");
      }

      const user = await User.findById(decoded?.id);

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user?._id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);

      return {
        userId: metadata.userId,
        file: {
          name: file.name,
          size: file.size,
          key: file.key,
          type: file.type,
          lastModified: file.lastModified,
          ufsUrl: file.ufsUrl,
        },
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
