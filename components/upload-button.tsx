'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { IconVideoPlus } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form } from '@/components/form';
import { useUploadVideo } from '@/services/video/video.service';
import { toast } from 'sonner';
import { useUploadStore } from '@/store';
import { useRequireAuth } from '@/lib/use-require-auth';

const uploadVideoSchema = z.object({
  video: z
    .custom<FileList>(
      (val) => typeof FileList !== 'undefined' && val instanceof FileList
    )
    .refine((files) => files.length > 0, 'Video is required')
    .refine(
      (files) => files[0]?.type.startsWith('video/'),
      'File must be a video'
    ),
  coverImage: z
    .custom<FileList>(
      (val) => typeof FileList !== 'undefined' && val instanceof FileList
    )
    .refine((files) => files.length > 0, 'Cover image is required')
    .refine(
      (files) => files[0]?.type.startsWith('image/'),
      'File must be an image'
    ),
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export type UploadVideoFormSchema = z.infer<typeof uploadVideoSchema>;

const UploadButton = () => {
  const [open, setOpen] = useState(false);
  const { mutateAsync: uploadVideo } = useUploadVideo();
  const { requireAuth } = useRequireAuth();

  const form = useForm<UploadVideoFormSchema>({
    resolver: zodResolver(uploadVideoSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { startUpload } = useUploadStore();

  const onSubmit = async (data: UploadVideoFormSchema) => {
    try {
      const formData = new FormData();
      formData.append('video', data.video[0]);
      formData.append('thumbnail', data.coverImage[0]);
      formData.append('title', data.title);
      formData.append('description', data.description);

      uploadVideo(formData)
        .then((response) => {
          console.log(response);

          startUpload(response.data.data._id, data.title);
        })
        .catch((error) => {
          toast.error(error.message);
        });

      toast.success(
        'Upload started! You can check progress in the bottom right.'
      );
      form.reset();
      setOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to start upload';
      toast.error(message);
    }
  };

  return (
    <>
      <Button
        onClick={() => requireAuth(() => setOpen(true))}
        className={'rounded-full sm:px-4 text-sm'}
      >
        <IconVideoPlus strokeWidth={3} className="sm:mr-2" />
        <span className="hidden sm:block">Upload</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogDescription>Upload a video to WatchWay</DialogDescription>
          </DialogHeader>

          <Form.Root
            form={form}
            formId="upload-video-form"
            onSubmit={onSubmit}
            className="w-full border-none shadow-none ring-0"
          >
            <Form.Content className="px-0 pt-0">
              <Form.VideoDropzone<UploadVideoFormSchema>
                name="video"
                label="Video"
                accept="video/*"
                required
                placeholder="Click to select a video file"
              />
              <Form.FileField<UploadVideoFormSchema>
                name="coverImage"
                label="Cover Image"
                accept="image/*"
                required
              />
              <Form.TextField<UploadVideoFormSchema>
                name="title"
                label="Title"
                placeholder="Enter video title"
              />
              <Form.TextAreaField<UploadVideoFormSchema>
                name="description"
                label="Description"
                placeholder="Enter video description"
              />
            </Form.Content>
            <Form.Footer className="px-0 pb-0">
              <Form.SubmitButton loadingText="Uploading...">
                Upload Video
              </Form.SubmitButton>
            </Form.Footer>
          </Form.Root>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadButton;
