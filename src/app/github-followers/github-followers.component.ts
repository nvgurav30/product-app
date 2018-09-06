import { Component, OnInit } from '@angular/core';
import { GithubFollowersService } from './github-followers.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];
  id: any;
  page: any;

  constructor(
    private route: ActivatedRoute,
    private service: GithubFollowersService
  ) { }

  ngOnInit() {

    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(
      switchMap(combined => {
        this.id = combined[0].get('id');
        this.page = combined[1].get('page');

        return this.service.getAll();
      })
    )
    .subscribe(followers => this.followers = followers);

    // this.route.paramMap
    //     .subscribe(params => {

    //     });
    
    // this.route.queryParamMap
    //     .subscribe(params => {

    //     });

  }
}
