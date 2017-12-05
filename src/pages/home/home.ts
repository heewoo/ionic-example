import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { getRepository } from 'typeorm';

import { Author } from '../../entities/author';
import { Category } from '../../entities/category';
import { Post } from '../../entities/post';
import { Repository } from 'typeorm/repository/Repository';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private savedPost: boolean = false;
  private loadedPost: Post = null;

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.runDemo();
  }

  async runDemo() {
    const category1 = new Category();
    category1.name = "TypeScript";

    const category2 = new Category();
    category2.name = "Programming";

    const author = new Author();
    author.name = "Person";

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
    post.categories = [category1, category2];
    post.author = author;

    await post.save();

    console.log("Post has been saved");
    this.savedPost = true;

    const loadedPost = await Post.findOne({relations: ['author', 'categories'], where: {id: post.id}});

    console.log("Post has been loaded: ", loadedPost);
    this.loadedPost = loadedPost;
  }

  getCategories() {
    if(this.loadedPost) {
      return this.loadedPost.categories.map(cat => cat.name).join(", ");
    }

    return '';
  }

}
