import { db } from "~/server/db";
import {
  files as filesScheme,
  folders as foldersScheme,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const files = await db
    .select()
    .from(filesScheme)
    .where(eq(filesScheme.parent, parsedFolderId));
  const folders = await db
    .select()
    .from(foldersScheme)
    .where(eq(foldersScheme.parent, parsedFolderId));

  return <DriveContents files={files} folders={folders} />;
}
