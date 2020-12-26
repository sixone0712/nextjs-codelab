import { GitHubProfile } from '../axios/github';
import {
  actionGetUserProfile,
  actionGetUserProfileError,
  actionGetUserProfileSuccess
} from './actions';

export type GitHubAction =
  | ReturnType<typeof actionGetUserProfile>
  | ReturnType<typeof actionGetUserProfileSuccess>
  | ReturnType<typeof actionGetUserProfileError>;

// export type GitHubAction =
//   | GetUserProfileAction
//   | GetUserProfilSuccessAction
//   | GetUserProfileErrorAction;

export interface GithubSate {
  userProfile: {
    loading: boolean;
    data: GitHubProfile | null;
    error: Error | null;
  };
}
