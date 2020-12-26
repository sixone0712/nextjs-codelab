import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../api';
import { getUserProfileThunkTypesafe } from '../api/github_thrunk_typesafe/thunks';
import { getUserProfileThunk } from '../api/github_thunk/thunks';
import { getUserProfileAsyncSaga } from '../api/saga/actions';
import ComGitHubProfile from '../components/GithubProfile';
import GithubUsernameForm from '../components/GithubUsernameForm';

function GitHubPage() {
  const dispatch = useDispatch();
  const {
    githubThunk: { userProfile: profileThunk },
    githubThunkTypesafe: { userProfile: profileThunkTypesafe },
    githubSagaReducer: { userProfile: profileSaga }
  } = useSelector((state: RootState) => state);

  const onSubmitUsername = (username: string) => {
    dispatch(getUserProfileThunk(username));
    dispatch(getUserProfileThunkTypesafe(username));
    dispatch(getUserProfileAsyncSaga.request(username));
  };

  return (
    <>
      <GithubUsernameForm onSubmitUsername={onSubmitUsername} />
      {profileThunk.loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      {profileThunk.error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
      {profileThunk.data && (
        <ComGitHubProfile
          bio={profileThunk.data.bio}
          blog={profileThunk.data.blog}
          name={profileThunk.data.name}
          thumbnail={profileThunk.data.avatar_url}
        />
      )}
      <br />
      {profileThunkTypesafe.loading && (
        <p style={{ textAlign: 'center' }}>로딩중..</p>
      )}
      {profileThunkTypesafe.error && (
        <p style={{ textAlign: 'center' }}>에러 발생!</p>
      )}
      {profileThunkTypesafe.data && (
        <ComGitHubProfile
          bio={profileThunkTypesafe.data.bio}
          blog={profileThunkTypesafe.data.blog}
          name={profileThunkTypesafe.data.name}
          thumbnail={profileThunkTypesafe.data.avatar_url}
        />
      )}
      <br />
      {profileSaga.loading && <p style={{ textAlign: 'center' }}>로딩중..</p>}
      {profileSaga.error && <p style={{ textAlign: 'center' }}>에러 발생!</p>}
      {profileSaga.data && (
        <ComGitHubProfile
          bio={profileSaga.data.bio}
          blog={profileSaga.data.blog}
          name={profileSaga.data.name}
          thumbnail={profileSaga.data.avatar_url}
        />
      )}
    </>
  );
}

export default GitHubPage;
