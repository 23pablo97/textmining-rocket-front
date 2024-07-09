import { authenticatedRequestDownload } from "@/utils/api";

interface DownloadFileProps {
    id: string;
    resourceName: string;
    version: string;
  }
  
export const handleDownloadFile = async ({ id, resourceName, version }: DownloadFileProps): Promise<void> => {
    const filename = `${resourceName.toLowerCase().replace(/ /g, '_')}_${version}.zip`;
    const response = await authenticatedRequestDownload(`/file_storage/${id}/download`);
  
    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
};
