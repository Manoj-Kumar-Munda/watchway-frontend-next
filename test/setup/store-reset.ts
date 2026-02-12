import appStore from '@/store/app-store';
import useUploadStore from '@/store/upload-store';
import { useUserStore } from '@/store/user-store';

export const resetStores = () => {
  useUserStore.setState({ user: null });
  appStore.setState({ sidebarOpen: true });
  useUploadStore.setState({
    videoId: null,
    title: null,
    status: null,
    uploadError: null,
  });
};
