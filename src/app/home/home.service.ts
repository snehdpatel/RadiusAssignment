import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service';

import { GithubIssueModel } from '../models/github-issue.model';
import { APIConstants } from '../constants/api.constant';
import { DateTimeHelper } from '../helpers/date-time.helper';
import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HomeService {

  private issuesArray: GithubIssueModel[] = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly alertService: AlertService,
    private readonly loadingService: LoadingService,
  ) { }

  public async getData(repoDetail: string) {
    await this.loadingService.createLoadingIndicator();
    await this.loadingService.presentLoadingIndicator();
    this.issuesArray = [];
    const serviceURL = APIConstants.GET_GITHUB_ISSUES_API.replace('repoDetail', repoDetail);
    await this.getAllData(serviceURL, 1);
    return this.divide();
  }

  private async getAllData(serviceURL: string, pageNumber: number) {
    const serviceUrlWithAllParameters = serviceURL.replace('pageNumber', pageNumber.toString());
    try {
      const data: any = await this.httpService.get(serviceUrlWithAllParameters);
      data.forEach((element: any) => {
        this.issuesArray.push(GithubIssueModel.castFromApi(element));
      });
      if (data.length === 100) {
        await this.getAllData(serviceURL, pageNumber + 1);
      }
    } catch (error) {
      await this.loadingService.dismissLoadingIndicator();
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.status === 404) {
      this.alertService.show('Error', 'Github repo does not exists or it\'s private');
    }
  }

  private async divide() {
    const obj: any = {};
    obj.one = this.issuesArray.length;
    if (obj.one !== 0) {
      obj.two = this.binarySearch(0, obj.one - 1, DateTimeHelper.getTimeBefore24Hours()) + 1;
      obj.three = this.binarySearch(obj.two, obj.one - 1, DateTimeHelper.getTimeBefore7Days()) + 1 - obj.two;
      obj.four = obj.one - obj.two - obj.three;
    } else {
      obj.two = 0;
      obj.three = 0;
      obj.four = 0;
    }
    await this.loadingService.dismissLoadingIndicator();
    return obj;
  }

  private binarySearch(start: number, end: number, key: number): number {
    while (start < end) {
      const mid = Math.round((end - start + 1) / 2);
      if (this.issuesArray[mid].created === key) {
        return mid;
      } else if (this.issuesArray[start].created < key) {
        return start - 1;
      } else if (this.issuesArray[end].created >= key) {
        return end;
      } else if (key > this.issuesArray[mid].created) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    if (start === end) {
      if (this.issuesArray[start].created >= key) {
        return start;
      }
      return start - 1;
    }
  }

}
