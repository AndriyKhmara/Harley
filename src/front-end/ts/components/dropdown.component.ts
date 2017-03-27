import { Component } from '@angular/core';
 
@Component({
  selector: 'dropdown',
  template: `<div class="btn-group" dropdown>
  <button id="single-button" type="button" class="btn btn-primary" dropdownToggle>
    Button dropdown <span class="caret"></span>
  </button>
  <ul dropdownMenu role="menu" aria-labelledby="single-button">
    <li role="menuitem"><a class="dropdown-item" href="#">Action</a></li>
    
  </ul>
</div>`
})
export class DropdownComponent {
}