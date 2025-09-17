import { Component } from '@angular/core';
import { CategoryForm } from './category-form/category-form';
import { Search } from './search/search';

@Component({
  selector: 'app-create-category-page',
  imports: [CategoryForm, Search],
  templateUrl: './create-category-page.html',
  styleUrl: './create-category-page.scss',
})
export class CreateCategoryPage {}
