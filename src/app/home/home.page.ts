import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { StringHelper } from '../helpers/string.helper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public One: number;
  public Two: number;
  public Three: number;
  public Four: number;

  public githubUrl: string;

  public get isButtonDisabled(): boolean {
    return !StringHelper.isValidGithubUrl(this.githubUrl);
  }

  constructor(private readonly homeService: HomeService) { }

  public async getDetails() {
    const repoDetail = this.getRepoDetail();
    const resultObject: any = await this.homeService.getData(repoDetail);
    this.One = resultObject.one;
    this.Two = resultObject.two;
    this.Three = resultObject.three;
    this.Four = resultObject.four;
  }

  private getRepoDetail() {
    return StringHelper.retrieveRepoDetailFromUrl(this.githubUrl);
  }

}
