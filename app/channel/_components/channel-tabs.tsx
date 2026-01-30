import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IChannel } from '@/types/channel.types';
import { ChannelAbout, ChannelPlaylists, ChannelVideos } from './index';
import { ChannelAboutSkeleton } from './skeletons';

interface ChannelTabsProps {
  channelId: string;
  channel?: IChannel;
  isPending: boolean;
}

const ChannelTabs = ({ channelId, channel, isPending }: ChannelTabsProps) => {
  return (
    <Tabs defaultValue="videos" className="w-full">
      <TabsList
        variant="line"
        className="border-b border-border w-full justify-start"
      >
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="playlists">Playlists</TabsTrigger>
        <TabsTrigger value="community">Tweets</TabsTrigger>
        <TabsTrigger value="subscribed">Subscriptions</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>

      <TabsContent value="videos" className="py-6">
        <ChannelVideos channelId={channelId} />
      </TabsContent>

      <TabsContent value="playlists" className="py-6">
        <ChannelPlaylists />
      </TabsContent>

      <TabsContent value="community" className="py-6">
        {/* <ChannelCommunity /> */}
      </TabsContent>

      <TabsContent value="about" className="py-6">
        {channel && <ChannelAbout isPending={isPending} channel={channel} />}
      </TabsContent>
    </Tabs>
  );
};

export default ChannelTabs;
