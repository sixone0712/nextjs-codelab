import { ActionType } from 'typesafe-actions';
import { GitHubProfile } from '../axios/github';
import * as actions from './actions';

export type GitHubAction = ActionType<typeof actions>;

export interface GithubSate {
  userProfile: {
    loading: boolean;
    data: GitHubProfile | null;
    error: Error | null;
  };
}
