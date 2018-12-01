import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PostCard from './PostCard.jsx';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

export default class PostList extends PureComponent {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    fetchPosts: PropTypes.func,
    postUpdateQuery: PropTypes.func
  };

  componentDidMount() {
    const { fetchPosts } = this.props;
    if(fetchPosts) this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;
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

  }
}
