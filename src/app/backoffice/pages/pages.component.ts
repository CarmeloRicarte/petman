import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  sidebarStatic!: boolean;

  sidebarActive = false;

  staticMenuMobileActive!: boolean;

  menuClick!: boolean;

  topbarItemClick!: boolean;

  activeTopbarItem: any;

  topbarMenuActive!: boolean;

  searchClick = false;

  search = false;

  menuHoverActive = false;

  constructor(public app: AppComponent) { }

  ngOnInit(): void {
  }


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

    if (!this.searchClick) {
      this.search = false;
    }

    this.searchClick = false;
    this.topbarItemClick = false;
    this.menuClick = false;
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

  isMobile() {
    return window.innerWidth <= 991;
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
      document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
        'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

}
