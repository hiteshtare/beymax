import { Component, OnInit } from '@angular/core';

// declare var $: any;//jquery

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  //   $(window).scroll(function () {
	// 						if ($(this).scrollTop() > 100) {
	// 								$('.scrollupbtn').fadeIn();
	// 						} else {
	// 								$('.scrollupbtn').fadeOut();
	// 						}
	// 					});

	// 				$('.scrollupbtn').click(function () {
	// 						$("html, body").animate({
	// 								scrollTop: 0
	// 						}, 600);
	// 						return false;
	// 				});
  }
}

