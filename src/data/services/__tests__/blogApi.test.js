import mockUsersJson from '../../../testing/fixtures/users.json';
import mockPostsJson from '../../../testing/fixtures/posts.json';
import mockCommentsJson from '../../../testing/fixtures/comments.json';
import { getUsers, getPosts, getComments } from '../blogApi';

jest.mock('../../lib/request.js', id => ({
  get: url => {
    if(url.startsWith('https://jsonplaceholder.typicode.com/users')) {
      return Promise.resolve(mockUsersJson);
    }
    if(url.startsWith('https://jsonplaceholder.typicode.com/posts')) {
      return Promise.resolve(mockPostsJson);
    }
    if(url.startsWith('https://jsonplaceholder.typicode.com/comments')) {
      return Promise.resolve(mockCommentsJson
        .filter(comment => comment.postId === id));
    }
    else {
      return Promise.reject({ error: '404' });
    }
  }
}));

describe('blogApi user resources', () => {

  describe('getUsers', () => {

    test('has a list of users with user details', () => {
      return getUsers()
        .then(users => {
          users.forEach(user => {
            expect(user).toEqual(expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              username: expect.any(String),
              email: expect.any(String),
              address: expect.objectContaining({
                street: expect.any(String),
                suite: expect.any(String),
                city: expect.any(String),
                zipcode: expect.any(String),
                geo: expect.objectContaining({
                  lat: expect.any(String),
                  lng: expect.any(String)
                })
              }),
              phone: expect.any(String),
              website: expect.any(String),
              company: expect.objectContaining({
                name: expect.any(String),
                catchPhrase: expect.any(String),
                bs: expect.any(String),
              }),
            }));
          });
        });
    });
  });

});

describe('blogApi posts resources', () => {

  describe('getPosts', () => {

    test('has a list of posts with userId, id, title, and body', () => {
      return getPosts()
        .then(posts => {
          posts.forEach(post => {
            expect(post).toEqual(expect.objectContaining({
              id: expect.any(Number),
              userId: expect.any(Number),
              title: expect.any(String),
              body: expect.any(String)
            }));
          });
        });
    });
  });

});

describe('blogApi comments resources', () => {

  describe('getComments', () => {

    test('has a list of comments for a given postId with id, name, email, and body', () => {
      return getComments(1)
        .then(comments => {
          comments.forEach(comment => {
            expect(comment).toEqual(expect.objectContaining({
              postId: 1,
              id: expect.any(Number),
              name: expect.any(String),
              email: expect.any(String),
              body: expect.any(String)
            }));
          });
        });
    });
  });

});
