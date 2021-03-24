import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { formatClubMembers } from '../../helpers';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css'],
})
export class MembersListComponent implements OnInit {
  @Input() members: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  formattedObject: any;
  displayedColumns: string[] = [];
  dataSource: any;
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formattedObject = formatClubMembers(this.members);
    this.displayedColumns = this.formattedObject?.displayedColumns;
    this.dataSource = new MatTableDataSource(this.formattedObject?.data);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditMember(e, member) {
    e.stopPropagation();
    console.log(member);
  }
}
