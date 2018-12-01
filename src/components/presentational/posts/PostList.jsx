import React from 'react';
import PropTypes from 'prop-types';
import PostCard from './PostCard.jsx';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const PostList = ({ posts }) => {

  const postList = posts.map(post => {
    return (
      <PostCard
        key={post.id}
        post={post}
      />
    );
  });

  return (
    <div>
      <StyledDiv>
        {postList}
      </StyledDiv>
    </div>
  );
};

PostList.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostList;