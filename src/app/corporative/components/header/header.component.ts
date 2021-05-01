import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
    this.manageNavbarCollapse();
  }

  manageActiveClass(id: string): void {
    const links = document.querySelectorAll('.page-scroll');
    const element = document.getElementById(id);
    links.forEach(link => {
      if (link.id === id) {
        element?.classList.add('active');
      } else if (link.classList.contains('active')) {
        link?.classList.remove('active');
      }
    });
  }

  manageNavbarCollapse(): void {
    // ===== close navbar-collapse when a  clicked
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (!!navbarToggler && !!navbarCollapse) {
      document.querySelectorAll('.page-scroll').forEach(e =>
        e.addEventListener('click', () => {
          navbarToggler.classList.remove('active');
          navbarCollapse.classList.remove('show');
        })
      );
      navbarToggler.addEventListener('click', () => {
        navbarToggler.classList.toggle('active');
      });
    }
  }
}



