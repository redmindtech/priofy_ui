import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-swapapproval',
  templateUrl: './swapapproval.component.html',
  styleUrls: ['./swapapproval.component.css']
})
export class SwapapprovalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleAccordion(event: Event): void {
    const accordionHeader = event.target as HTMLElement;
    accordionHeader.classList.toggle('active');
    const accordionContent = accordionHeader.nextElementSibling as HTMLElement;
    if (accordionContent.style.display === 'block') {
      accordionContent.style.display = 'none';
    } else {
      accordionContent.style.display = 'block';
    }
  }

}
