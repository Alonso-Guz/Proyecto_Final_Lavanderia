import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private router : Router, private authService: AuthService) {}

  login(){
    const credentials = {
      username: this.username,
      password: this.password
    };
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('roles', JSON.stringify(response.roles));
        localStorage.setItem('expirateAt', response.expirateAt.toString());
        this.router.navigate(['/dashboard']);

      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas o error del servidor')
      }
    });
  }

}
