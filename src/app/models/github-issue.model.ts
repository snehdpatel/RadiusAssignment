import { DateTimeHelper } from '../helpers/date-time.helper';

export class GithubIssueModel {

  public created: number;
  public title: string;

  public static castFromApi(apiObject: any): GithubIssueModel {
    const githubIssueModel = new GithubIssueModel();
    githubIssueModel.created = DateTimeHelper.getTime(apiObject.created_at);
    githubIssueModel.title = apiObject.title;
    return githubIssueModel;
  }

}
