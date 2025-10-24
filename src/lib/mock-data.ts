export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  modifiedAt: string;
  parentId?: string;
  url?: string;
  mimeType?: string;
}

export const mockFiles: FileItem[] = [
  // Root level items
  {
    id: "folder-1",
    name: "Documents",
    type: "folder",
    modifiedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "folder-2",
    name: "Pictures",
    type: "folder",
    modifiedAt: "2024-01-14T15:45:00Z",
  },
  {
    id: "folder-3",
    name: "Projects",
    type: "folder",
    modifiedAt: "2024-01-13T09:20:00Z",
  },
  {
    id: "file-1",
    name: "README.md",
    type: "file",
    size: 1024,
    modifiedAt: "2024-01-12T14:15:00Z",
    url: "https://example.com/files/readme.md",
    mimeType: "text/markdown",
  },
  {
    id: "file-2",
    name: "presentation.pdf",
    type: "file",
    size: 2048576,
    modifiedAt: "2024-01-11T11:30:00Z",
    url: "https://example.com/files/presentation.pdf",
    mimeType: "application/pdf",
  },

  // Documents folder contents
  {
    id: "file-3",
    name: "resume.docx",
    type: "file",
    size: 51200,
    modifiedAt: "2024-01-10T16:20:00Z",
    parentId: "folder-1",
    url: "https://example.com/files/resume.docx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    id: "file-4",
    name: "budget.xlsx",
    type: "file",
    size: 25600,
    modifiedAt: "2024-01-09T13:45:00Z",
    parentId: "folder-1",
    url: "https://example.com/files/budget.xlsx",
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    id: "folder-4",
    name: "Contracts",
    type: "folder",
    modifiedAt: "2024-01-08T10:15:00Z",
    parentId: "folder-1",
  },

  // Pictures folder contents
  {
    id: "file-5",
    name: "vacation-photo.jpg",
    type: "file",
    size: 3145728,
    modifiedAt: "2024-01-07T12:30:00Z",
    parentId: "folder-2",
    url: "https://example.com/files/vacation-photo.jpg",
    mimeType: "image/jpeg",
  },
  {
    id: "file-6",
    name: "profile-pic.png",
    type: "file",
    size: 1048576,
    modifiedAt: "2024-01-06T14:20:00Z",
    parentId: "folder-2",
    url: "https://example.com/files/profile-pic.png",
    mimeType: "image/png",
  },

  // Projects folder contents
  {
    id: "folder-5",
    name: "Web Development",
    type: "folder",
    modifiedAt: "2024-01-05T09:10:00Z",
    parentId: "folder-3",
  },
  {
    id: "folder-6",
    name: "Mobile Apps",
    type: "folder",
    modifiedAt: "2024-01-04T16:30:00Z",
    parentId: "folder-3",
  },

  // Contracts folder contents
  {
    id: "file-7",
    name: "employment-contract.pdf",
    type: "file",
    size: 512000,
    modifiedAt: "2024-01-03T11:45:00Z",
    parentId: "folder-4",
    url: "https://example.com/files/employment-contract.pdf",
    mimeType: "application/pdf",
  },

  // Web Development folder contents
  {
    id: "file-8",
    name: "index.html",
    type: "file",
    size: 2048,
    modifiedAt: "2024-01-02T15:20:00Z",
    parentId: "folder-5",
    url: "https://example.com/files/index.html",
    mimeType: "text/html",
  },
  {
    id: "file-9",
    name: "styles.css",
    type: "file",
    size: 4096,
    modifiedAt: "2024-01-01T10:15:00Z",
    parentId: "folder-5",
    url: "https://example.com/files/styles.css",
    mimeType: "text/css",
  },
];

export function getFilesByParentId(parentId?: string): FileItem[] {
  return mockFiles.filter((file) => file.parentId === parentId);
}

export function getFileById(id: string): FileItem | undefined {
  return mockFiles.find((file) => file.id === id);
}

export function getBreadcrumbs(currentFolderId?: string): FileItem[] {
  const breadcrumbs: FileItem[] = [];
  let currentId = currentFolderId;

  while (currentId) {
    const folder = getFileById(currentId);
    if (folder) {
      breadcrumbs.unshift(folder);
      currentId = folder.parentId;
    } else {
      break;
    }
  }

  return breadcrumbs;
}
