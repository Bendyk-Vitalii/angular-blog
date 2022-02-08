import { PostsService } from './../../shared/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private PostsService: PostsService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      
    })
  }

}
