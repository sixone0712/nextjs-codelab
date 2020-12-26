import { call, put, takeEvery } from 'redux-saga/effects';
import { axiosGetUserProfile, GitHubProfile } from '../axios/github';
import { GET_USER_PROFILE } from './actions';
import { getUserProfileAsyncSaga } from './actions';

function* getUserProfileSaga(
  action: ReturnType<typeof getUserProfileAsyncSaga.request>
) {
  try {
    const userProfile: GitHubProfile = yield call(
      axiosGetUserProfile,
      action.payload
    );
    yield put(getUserProfileAsyncSaga.success(userProfile));
  } catch (e) {
    yield put(getUserProfileAsyncSaga.failure(e));
  }
}

export function* githubSaga() {
  yield takeEvery(GET_USER_PROFILE, getUserProfileSaga);
}
