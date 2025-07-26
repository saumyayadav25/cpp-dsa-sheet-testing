import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "@/app/api/(auth)/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
