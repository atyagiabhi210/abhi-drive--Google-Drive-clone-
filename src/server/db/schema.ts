import {
  int,
  text,
  index,
  singlestoreTableCreator,
  bigint,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `abhi-drive_${name}`,
);

export const files = createTable(
  "file_table",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    size: int("size").notNull(),
    parent: bigint("parent", { mode: "number" }).notNull(),
  },
  (t) => {
    return [index("parent_index").on(t.parent)]; // helps to look up files by parent id aswell index this on the parent look up all the files based on their parent id
  },
);

export const folders = createTable(
  "folder_table",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number" }),
  },
  (t) => {
    return [index("parent_index").on(t.parent)]; // helps to look up folders by parent id aswell index this on the parent look up all the folders based on their parent id
  },
);
