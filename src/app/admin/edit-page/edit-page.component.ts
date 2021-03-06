import { AlertService } from './../shared/services/alert.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from './../../shared/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  post!: Post;
  submitted = false;

  updateSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private PostsService: PostsService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.PostsService.getById(params['id']);
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        });
      });
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.updateSub = this.PostsService.update({
      ...this.post,
      text: this.post.text,
      title: this.form.value.title,
    }).subscribe(() => {
      this.submitted = false;
      this.alert.success('Post was updated');
    });
  }
}
