import { PostsService } from './../../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  posts: Post[] = [];
  pSub!: Subscription;
  deleteSub!: Subscription;
  searchStr = '';

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  remove(id: any) {
    this.deleteSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.deleteSub) {
      this.deleteSub.unsubscribe()
    }
  }
}
