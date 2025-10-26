import "server-only";
import { db } from "~/server/db";
import {
  files_table as filesScheme,
  folders_table as foldersScheme,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getAllParents: async function (folderId: number) {
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
  },
  getFiles: async function (folderId: number) {
    return await db
      .select()
      .from(filesScheme)
      .where(eq(filesScheme.parent, folderId));
  },

  getFolders: async function (folderId: number) {
    return await db
      .select()
      .from(foldersScheme)
      .where(eq(foldersScheme.parent, folderId));
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    file: {
      name: string;
      url: string;
      size: number;
      parent: number;
    };
    userId: string;
  }) {
    return await db.insert(filesScheme).values({
      ...input.file,
      parent: 1,
    });
  },
};
