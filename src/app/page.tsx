import { db } from "~/server/db";
import {
  files as filesScheme,
  folders as foldersScheme,
} from "~/server/db/schema";
import DriveContents from "./drive-contents";

export default async function GoogleDriveClone() {
  const files = await db.select().from(filesScheme);
  const folders = await db.select().from(foldersScheme);

  return <DriveContents files={files} folders={folders} />;
}
