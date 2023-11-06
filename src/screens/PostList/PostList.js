import React from 'react';
import { View, Text } from 'react-native';
import PostCard from '../PostCard/PostCard';

function PostLists({ posts }) {
  return (
    <View>
      {posts?.map(post => {
        const {
          id,
          user,
          content,
          created_at
        } = post;

        const {
          user_name: userName,
          name: userFullName,
          avatar_url: avatarUrl
        } = user;

        const postDate = new Date(created_at);
        const formattedDate = postDate.toLocaleDateString();
        const formattedTime = postDate.toLocaleTimeString();

        return (
          <PostCard
            userFullName={userFullName}
            username={userName}
            profileImage={avatarUrl}
            content={content}
            postDate={formattedDate}
            postTime={formattedTime}
            idPost={id}
          />
        );
      })}
    </View>
  );
}

export default PostLists;
