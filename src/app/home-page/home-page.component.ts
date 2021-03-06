import { Observable } from 'rxjs';
import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private PostsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.PostsService.getAll();
  }
}
