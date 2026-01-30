'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { IconPencil, IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { useUpdateChannelCoverImage } from '@/services/channel/channel.service';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const UpdateCoverImageModal = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { mutate: updateCoverImage, isPending } = useUpdateChannelCoverImage();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemovePreview = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) return;

    updateCoverImage(selectedFile, {
      onSuccess: () => {
        toast.success('Cover image updated successfully!');
        setOpen(false);
        handleRemovePreview();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="icon-sm" variant="ghost" className="rounded-full">
            <IconPencil size={16} />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Cover Image</DialogTitle>
          <DialogDescription>
            Upload a new cover image for your channel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {previewUrl && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  New Cover Preview
                </p>
                <button
                  onClick={handleRemovePreview}
                  className="p-1 rounded-full hover:bg-muted transition-colors"
                >
                  <IconX size={16} className="text-muted-foreground" />
                </button>
              </div>
              <div className="relative w-full h-40 rounded-lg overflow-hidden bg-neutral-100 ring-2 ring-primary/20">
                <Image
                  src={previewUrl}
                  alt="New cover preview"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {selectedFile?.name} (
                {(selectedFile?.size ?? 0 / 1024 / 1024).toFixed(2)} MB)
              </p>
            </div>
          )}

          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative flex flex-col items-center justify-center gap-3 py-8 px-4 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
          >
            <div className="p-3 rounded-full bg-neutral-100">
              <IconPhoto size={24} className="text-neutral-500" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG or WebP (max 5MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || isPending}
            className="gap-2"
          >
            {isPending ? (
              <>
                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <IconUpload size={16} />
                Update Cover
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCoverImageModal;
