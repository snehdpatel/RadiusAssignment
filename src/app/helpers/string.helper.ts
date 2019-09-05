export class StringHelper {

  public static isValidGithubUrl(url: string): boolean {
    return /https:\/\/github.com\/.+\/.+/.test(url);
  }

  public static retrieveRepoDetailFromUrl(url: string): string {
    const githubPattern = /https:\/\/github.com\//;
    return url.split(githubPattern)[1];
  }
}
