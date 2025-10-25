import { db } from "~/server/db";
import {
  files as filesScheme,
  folders as foldersScheme,
} from "~/server/db/schema";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";

async function getAllParents(folderId: number) {
  const parents = [];
  let currentId: number | null = folderId;
  while (currentId !== null) {
    const folder = await db
      .selectDistinct()
      .from(foldersScheme)
      .where(eq(foldersScheme.id, currentId));
    if (!folder[0]) {
      throw new Error("Folder not found");
    }
    parents.unshift(folder[0]); // unshift adds to the beginning of the array
    currentId = folder[0]?.parent ?? null;
  }
  return parents;
}
export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const filesPromise = db
    .select()
    .from(filesScheme)
    .where(eq(filesScheme.parent, parsedFolderId));
  const foldersPromise = db
    .select()
    .from(foldersScheme)
    .where(eq(foldersScheme.parent, parsedFolderId));

  const parentsPromise = getAllParents(parsedFolderId);

  const [files, folders, parents] = await Promise.all([
    filesPromise,
    foldersPromise,
    parentsPromise,
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
