import { useQuery } from '@tanstack/react-query';
import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';

const useCreatePlaylist = () => {};

const useUpdatePlaylistMeta = () => {};

const useDeletePlaylist = () => {};

const useGetPlaylistById = (playlistId: string) => {
  return useQuery({
    queryKey: [endpoints.playlists.playlistById.queryKey],
    queryFn: () => {
      return api.get(
        endpoints.playlists.playlistById.url.replace('{playlistId}', playlistId)
      );
    },
    enabled: !!playlistId,
  });
};

const useGetPlaylistsByChannelId = (channelId: string) => {
  return useQuery({
    queryKey: [endpoints.playlists.playlistByChannelId.queryKey],
    queryFn: () => {
      return api.get(
        endpoints.playlists.playlistByChannelId.url.replace(
          '{userId}',
          channelId
        )
      );
    },
    enabled: !!channelId,
  });
};

const useAddVideoToPlaylist = () => {};

const useRemoveVideoFromPlaylist = () => {};

const useGetPlaylists = () => {};

export {
  useCreatePlaylist,
  useUpdatePlaylistMeta,
  useDeletePlaylist,
  useGetPlaylistById,
  useGetPlaylistsByChannelId,
  useAddVideoToPlaylist,
  useRemoveVideoFromPlaylist,
  useGetPlaylists,
};
