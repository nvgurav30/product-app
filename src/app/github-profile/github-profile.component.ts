import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {
  id: any;
  page: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
      console.log('Called OnInit');
      this.route.paramMap
        .subscribe(params => {
          if(params.has('id')) {
            this.id = +params.get('id');
          }
        });
  }

  submit() {
    this.router.navigate(['/follower'],{
      queryParams: {
        page: 1,
        order: 'newest'
      }
    });
  }

}
