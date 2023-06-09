import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import {Pagination} from "../../_models/pagination";

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  // members$: Observable<Member[]> | undefined;
  members: Member[] =[];
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 6;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    // this.members$ = this.memberService.getMembers();
    this.loadMembers()
  }
  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.members = response.result;
          this.pagination = response.pagination;
        }
      }
    })
  }
  pageChanged(event: any){
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadMembers();
    }
  }

}
