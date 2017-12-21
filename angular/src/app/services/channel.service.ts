import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import { Channel } from '../models';

let _dbUrl: String = "/api/channel/";

@Injectable()
export class ChannelService {
  channelsObserver: BehaviorSubject<any[]> = new BehaviorSubject([]);
  channelCurrentObserver: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private _http: Http) { }

  updateChannelsObserver(newData: any): void {
    this.channelsObserver.next(newData);
  }
  updateCurrentChannelObserver(newData: any): void {
    this.channelCurrentObserver.next(newData);
    console.log("Active Channel:", this.channelCurrentObserver)
  }

  createChannel(channel: Channel, id) {
    this._http.post(_dbUrl + "" + id + "/create", channel)
      .subscribe(
        response => {
          this.updateCurrentChannelObserver(response.json());
        },
        error => {
          console.log("There were errors in the channel creation");
          console.log(error);
        }
      );
  }

  getTeamChannels(teamId: String) {
    this._http.get("/api/team/" + teamId + "/channels")
      .subscribe(
        response => {
          this.updateChannelsObserver(response.json());
        },
        error => {
          console.log("There were errors in the attempt to get the team channels");
          console.log(error);
        }
      );
  }
  searchForChannels(Input) {
    return this._http.get(`/api/channel/search/q/${Input}`)
      .map(response => response.json())
      .toPromise()
  }

}
