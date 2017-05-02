import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';

import { Link } from './link.model';
import { AuthenticationService } from './../../services/authentication.service';
import { SidenavService } from './sidenav.service';

declare var $: any; // jquery

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavComponent implements OnInit {

  title = '';
  childLinks: Link[];
  parentLinks: Link[];

  showSidenav = true;

  constructor(private authenticationService: AuthenticationService, private sidenavService: SidenavService) {
    this.parentLinks = this.sidenavService.getParentLinks();
    this.childLinks = this.sidenavService.getChildLinks();

    this.sidenavService.showSidenav.subscribe((mode: boolean) => {
      this.showSidenav = mode;
    });
  }

  ngOnInit() {
    if (this.showSidenav) {
      $('header').show();

      $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left' // Choose the horizontal origin
      });

      // close side bar on link click in search list
      $('#slide-out').on('click', '.a-search', function (event) {
        $('.button-collapse').sideNav('hide');

        $('#search').val(''); // clear search textbox
        $('.search-results').empty(); // clear search list

        const currentTarget = $(event.currentTarget);
        const title = currentTarget[0].outerText;
        $('a.page-title').html(title); // extract title from link clicked
      });
    }

    this.title = 'Change Password';
  }

  linkClicked(event) {
    const title = event.target.getAttribute('title');
    $('a.page-title').html(title);

    $('.button-collapse').sideNav('hide');
  }

  logoutClicked() {
    this.sidenavService.showSidenav.emit(false);
    this.authenticationService.logout();
  }
}
