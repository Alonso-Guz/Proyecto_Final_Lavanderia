import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Category, CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  username: string | null = '';
  roles: string[] = [];
  expiresAt: string | null = '';

  categories: Category[] = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    const rolesStorage = localStorage.getItem('roles');
    if (rolesStorage) {
      this.roles = JSON.parse(rolesStorage);
    }
    const expiresAtStorage = localStorage.getItem('expiresAt');
    if (expiresAtStorage) {
      const expiresDate = new Date(Number(expiresAtStorage));
      this.expiresAt = expiresDate.toLocaleString(); // Mostramos como fecha legible
    }

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log('Categorias recibidas: ', categories);
        this.categories = categories;
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);

      }
    });


  }
}
