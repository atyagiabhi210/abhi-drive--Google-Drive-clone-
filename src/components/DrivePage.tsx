"use client";

import { useState } from "react";
import { Folder, File, Upload, ChevronRight, Home } from "lucide-react";
import {
  type FileItem,
  getFilesByParentId,
  getBreadcrumbs,
} from "~/lib/mock-data";

export default function DrivePage() {
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(
    undefined,
  );
  const files = getFilesByParentId(currentFolderId);
  const breadcrumbs = getBreadcrumbs(currentFolderId);

  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId);
  };

  const handleBreadcrumbClick = (folderId: string | undefined) => {
    setCurrentFolderId(folderId);
  };

  const handleUpload = () => {
    // Mock upload functionality
    alert("Upload functionality would be implemented here");
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") {
      return <Folder className="h-5 w-5 text-blue-400" />;
    }

    const mimeType = file.mimeType ?? "";
    if (mimeType.startsWith("image/")) {
      return <File className="h-5 w-5 text-green-400" />;
    } else if (mimeType.includes("pdf")) {
      return <File className="h-5 w-5 text-red-400" />;
    } else if (mimeType.includes("word") || mimeType.includes("document")) {
      return <File className="h-5 w-5 text-blue-400" />;
    } else if (mimeType.includes("sheet") || mimeType.includes("excel")) {
      return <File className="h-5 w-5 text-green-400" />;
    } else {
      return <File className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Abhi Drive</h1>
          </div>
          <button
            onClick={handleUpload}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </button>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="border-b border-gray-700 bg-gray-800 px-6 py-3">
        <nav className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => handleBreadcrumbClick(undefined)}
            className="flex items-center space-x-1 text-gray-400 transition-colors hover:text-white"
          >
            <Home className="h-4 w-4" />
            <span>My Drive</span>
          </button>

          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.id} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4 text-gray-500" />
              <button
                onClick={() => handleBreadcrumbClick(breadcrumb.id)}
                className="text-gray-400 transition-colors hover:text-white"
              >
                {breadcrumb.name}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* File List */}
      <main className="px-6 py-6">
        <div className="rounded-lg border border-gray-700 bg-gray-800">
          {/* Table Header */}
          <div className="border-b border-gray-700 px-4 py-3">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-3">Modified</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* File Items */}
          <div className="divide-y divide-gray-700">
            {files.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-400">
                This folder is empty
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 transition-colors hover:bg-gray-700"
                >
                  <div className="col-span-6 flex items-center space-x-3">
                    {getFileIcon(file)}
                    <button
                      onClick={() => {
                        if (file.type === "folder") {
                          handleFolderClick(file.id);
                        } else if (file.url) {
                          window.open(file.url, "_blank");
                        }
                      }}
                      className="text-left text-white transition-colors hover:text-blue-400"
                    >
                      {file.name}
                    </button>
                  </div>
                  <div className="col-span-2 text-sm text-gray-400">
                    {file.type === "file" ? formatFileSize(file.size) : "--"}
                  </div>
                  <div className="col-span-3 text-sm text-gray-400">
                    {formatDate(file.modifiedAt)}
                  </div>
                  <div className="col-span-1"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
