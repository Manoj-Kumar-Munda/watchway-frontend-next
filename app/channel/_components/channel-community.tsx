import ChannelCommunityPostsList from './channel-community-posts';
import CommunityPostForm from './community-post-form';

const ChannelCommunity = () => {
  return (
    <div className="space-y-4 px-4 lg:px-6 max-w-3xl w-full mx-auto ">
      <CommunityPostForm />
      <ChannelCommunityPostsList />
    </div>
  );
};

export default ChannelCommunity;
