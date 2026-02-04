import { useQuery, useMutation } from '@tanstack/react-query';
import { endpoints } from '@/config/endpoints';
import api from '@/lib/api';
import { getQueryClient } from '@/lib/query-client';
import { ApiResponse } from '../types';

interface CreatePlaylistBody {
  name: string;
  description?: string;
}

interface UpdatePlaylistMetaBody {
  name?: string;
  description?: string;
}

interface IPlaylist {
  _id: string;
  name: string;
  description: string;
  totalDuration: number;
  totalViews: number;
  totalVideos: number;
  coverImage: string;
  updatedAt: string;
}

interface IPlaylistsByChannelIdResponse {
  data: IPlaylist[];
}

const useCreatePlaylist = () => {
  return useMutation({
    mutationFn: (body: CreatePlaylistBody) => {
      return api.post(endpoints.playlists.createPlaylist.url, body);
    },
    onSettled: () => {
      getQueryClient().invalidateQueries({
        queryKey: endpoints.playlists.playlistByChannelId.queryKeys,
      });
    },
  });
};

const useUpdatePlaylistMeta = (playlistId: string) => {
  return useMutation({
    mutationFn: (body: UpdatePlaylistMetaBody) => {
      return api.patch(
        endpoints.playlists.playlistById.url.replace(
          '{playlistId}',
          playlistId
        ),
        body
      );
    },
    onSettled: () => {
      getQueryClient().invalidateQueries({
        queryKey: endpoints.playlists.playlistById.queryKeys,
      });
    },
  });
};

const useDeletePlaylist = () => {};

const useGetPlaylistById = (playlistId: string) => {
  return useQuery({
    queryKey: endpoints.playlists.playlistById.queryKeys,
    queryFn: () => {
      return api.get(
        endpoints.playlists.playlistById.url.replace('{playlistId}', playlistId)
      );
    },
    enabled: !!playlistId,
  });
};

const useGetPlaylistsByChannelId = (channelId?: string) => {
  return useQuery<ApiResponse<IPlaylistsByChannelIdResponse>>({
    queryKey: [...endpoints.playlists.playlistByChannelId.queryKeys, channelId],
    queryFn: () => {
      return api.get(
        endpoints.playlists.playlistByChannelId.url.replace(
          '{userId}',
          channelId!
        )
      );
    },
    enabled: !!channelId,
  });
};

const useAddVideoToPlaylist = () => {
  return useMutation({
    mutationFn: ({
      videoId,
      playlistId,
    }: {
      videoId: string;
      playlistId: string;
    }) => {
      const url = endpoints.playlists.addVideoToPlaylist.url
        .replace('{videoId}', videoId)
        .replace('{playlistId}', playlistId);
      return api.put(url);
    },
    onSettled: () => {
      getQueryClient().invalidateQueries({
        queryKey: endpoints.playlists.playlistById.queryKeys,
      });
    },
  });
};

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
