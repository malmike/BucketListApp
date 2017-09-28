import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PageService{

  // Observable string sources
  private announcePageSource = new Subject<string>();
  private announceLimitSource = new Subject<string>();
  private announceSearchSource = new Subject<string>();

  // Observable string streams
  pageAnnounced$ = this.announcePageSource.asObservable();
  limitAnnounced$ = this.announceLimitSource.asObservable();
  searchAnnounced$ = this.announceSearchSource.asObservable();

  // Service message commands
  announcePage(page: string){
    this.announcePageSource.next(page);
  }

  announceLimit(limit: string){
    this.announceLimitSource.next(limit);
  }

  announceSearch(search: string){
    this.announceSearchSource.next(search);
  }
}