import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  sidebarActive = false;

  staticMenuMobileActive!: boolean;

  menuClick!: boolean;

  topbarItemClick!: boolean;

  activeTopbarItem: any;

  topbarMenuActive!: boolean;

  menuHoverActive = false;

  tituloTiendaMenu: any;

  constructor(public app: AppComponent) {}

  ngOnInit(): void {}

  onLayoutClick() {
    if (!this.topbarItemClick) {
      this.activeTopbarItem = null;
      this.topbarMenuActive = false;
    }

    if (!this.menuClick) {
      if (this.staticMenuMobileActive) {
        this.staticMenuMobileActive = false;
      }

      this.menuHoverActive = false;
      this.unblockBodyScroll();
    }

    this.topbarItemClick = false;
    this.menuClick = false;
  }

  onTopbarItemClick(event: any, item: any) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onMenuButtonClick(event: any) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isMobile()) {
      this.staticMenuMobileActive = !this.staticMenuMobileActive;
      if (this.staticMenuMobileActive) {
        this.blockBodyScroll();
      } else {
        this.unblockBodyScroll();
      }
    }

    event.preventDefault();
  }

  onSidebarClick($event: any) {
    this.menuClick = true;
  }

  onSidebarMouseOver(event: any) {
    if (this.app.menuMode === 'sidebar') {
      this.sidebarActive = !this.isMobile();
      this.tituloTiendaMenu = document.getElementById('nombreTiendaMenu');
      this.tituloTiendaMenu.innerHTML = 'Piensos Sergio Rocamora';
    }
  }

  onSidebarMouseLeave($event: any) {
    if (this.app.menuMode === 'sidebar') {
      this.tituloTiendaMenu = document.getElementById('nombreTiendaMenu');
      this.tituloTiendaMenu.innerHTML = '';
      setTimeout(() => {
        this.sidebarActive = false;
      }, 250);
    }
  }

  isMobile() {
    return window.innerWidth <= 991;
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }
}
