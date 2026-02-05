'use client';

import { useUploadStatus } from '@/services/video/video.service';
import { useUploadStore } from '@/store';
import { Check, Loader2, X } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const UploadStatusIndicator = () => {
  const { videoId, title, status, updateStatus, resetUpload } =
    useUploadStore();
  const { data: statusData } = useUploadStatus(videoId);

  useEffect(() => {
    const responseData = statusData?.data?.data;
    if (responseData?.uploadStatus) {
      updateStatus(responseData.uploadStatus, responseData.uploadError);

      if (responseData.uploadStatus === 'published') {
        toast.success(`Video "${title}" published successfully!`);
      } else if (responseData.uploadStatus === 'failed') {
        toast.error(`Failed to publish video "${title}"`);
      }
    }
  }, [statusData, updateStatus, title]);

  if (!status || !title) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-background border rounded-lg shadow-lg p-4 w-80 flex items-center gap-3">
        <div className="shrink-0">
          {status === 'uploading' && (
            <div className="h-10 w-10 text-primary bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          )}
          {status === 'published' && (
            <div className="h-10 w-10 text-green-500 bg-green-500/10 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5" />
            </div>
          )}
          {status === 'failed' && (
            <div className="h-10 w-10 text-destructive bg-destructive/10 rounded-full flex items-center justify-center">
              <X className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{title}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {status}
            {status === 'uploading' && '...'}
          </p>
        </div>

        {(status === 'published' || status === 'failed') && (
          <button
            onClick={resetUpload}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadStatusIndicator;
