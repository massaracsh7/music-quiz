import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryForm } from './category-form/category-form';
import { CategorySearch } from './category-search/category-search';

@Component({
  selector: 'app-category-create',
  imports: [RouterLink, CategoryForm, CategorySearch],
  templateUrl: './category-create.html',
  styleUrl: './category-create.scss',
})
export class CategoryCreate {}
