'use client';

import { Form } from '@/components/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateCommunityPost } from '@/services/community/community.service';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/store';

const CommunityPostFormSchema = z.object({
  content: z
    .string()
    .min(8, 'Content must be at least 8 characters long')
    .max(300, 'Content must be at most 1000 characters long'),
});

export type CommunityPostFormValidationSchema = z.infer<
  typeof CommunityPostFormSchema
>;

const CommunityPostForm = () => {
  const form = useForm<CommunityPostFormValidationSchema>({
    resolver: zodResolver(CommunityPostFormSchema),
    defaultValues: {
      content: '',
    },
  });
  const { user } = useUserStore();
  const { id } = useParams();
  const isOwner = user?._id === id;
  const { mutateAsync } = useCreateCommunityPost(id as string);

  const onSubmit = (data: CommunityPostFormValidationSchema) => {
    mutateAsync(data, {
      onSuccess: () => {
        form.reset();
        toast.success('Post created successfully');
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  if (!isOwner) return null;
  return (
    <Form.Root
      form={form}
      formId="community-post-form"
      onSubmit={onSubmit}
      className="w-full border-none ring-0 shadow-none p-1 gap-2"
    >
      <Form.Content className="p-0 border-none">
        <Form.TextAreaField name="content" placeholder="What's on your mind?" />
      </Form.Content>
      <Form.Footer className="flex items-center p-0 w-fit self-end">
        <Form.SubmitButton loadingText="Posting...">Post</Form.SubmitButton>
      </Form.Footer>
    </Form.Root>
  );
};

export default CommunityPostForm;
