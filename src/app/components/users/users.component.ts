
import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { FormationSts, User } from 'src/app/models/user';
import { DataState } from 'src/app/services/base/Data';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  usersState: DataState = DataState.LOADING;
  // filter values 
  filterValues = { firstName: '',lastName: '',phone:'', email: '',status: [],}
  // filter form group
  filterForm = new FormGroup({
    firstName: new FormControl(),   
    lastName: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    status: new FormControl(),
  });
  // filter list checkbox 
  formationStsList: FormationSts[] = [FormationSts.NOT_DEFINE,FormationSts.SOLDE_ACOMPTE,
    FormationSts.SOLDE_NOK, FormationSts.SOLDE_OK];
  // Table Data Source head name
  displayedColumns = ['id', 'firstName', 'lastName','phone', 'email', 'password', 'status'];
  // Table Data Source  object
  dataSource= new MatTableDataSource<User>(); 
  // Table Data paginator
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
 
  // Table Data sort 
  @ViewChild(MatSort)
  sort!: MatSort;
  //properties filter group form
  get firstName() { return this.filterForm.get('firstName'); }
  get lastName() { return this.filterForm.get('lastName'); }
  get phone() { return this.filterForm.get('phone'); }
  get email() { return this.filterForm.get('email'); }
  get status() { return this.filterForm.get('status'); }

  //constructor
  constructor(private usersService: UserService,private notifyService : NotificationService) { 
    this.dataSource.filterPredicate = this.createFilter();
  }
    //On After View Init component
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; 
  }
  //On Init component
  ngOnInit(): void {
    this.InitFilterSubscribe();
    this.getDataFromService();  
  }
  getDataFromService()
  {
    this.usersState = DataState.LOADING; 
    this.notifyService.showInfo("waite connection to server ", environment.api.baseUrl +'/users');
    
    this.usersService.GetAll().subscribe(
      (res:User[]) => {
        console.log(res);
        this.dataSource.data=res;
        this.usersState = DataState.LOADED; 
  
        this.notifyService.showSuccess("Data shown successfully from", environment.api.baseUrl +'/users');
        },
      (err) => {
        console.log(err);
        this.usersState = DataState.ERROR; 
        this.notifyService.showError("Data get Error from", environment.api.baseUrl +'/users');
        }
      ); 
  }
  // create filter  
  createFilter(): (data: any, filter: string) => boolean {
  let filterFunction = function(data:User, filter:string): boolean {
    let searchString = JSON.parse(filter);
    let isStsFormation = false;
    if (searchString.status.length) {
      for (const d of searchString.status) 
        if(d ===data.status )
          isStsFormation = true;
        
    }else isStsFormation = true;
     
       
      const resultValue =isStsFormation &&
      data.phone.toString().trim().toLowerCase().indexOf(searchString.phone.toLowerCase()) !== -1 &&
      data.firstName.toString().trim().toLowerCase().indexOf(searchString.firstName.toLowerCase()) !== -1 &&
      data.lastName.toString().trim().toLowerCase().indexOf(searchString.lastName.toLowerCase()) !== -1 &&
      data.email.toString().trim().toLowerCase().indexOf(searchString.email.toLowerCase()) !== -1 ;

      return resultValue;
    
  }
  return filterFunction;
  }
  // filter subscriber 
  InitFilterSubscribe() {

    console.log ("call InitFilterSubscribe");
    if( this.firstName!=null)
        this.firstName.valueChanges.subscribe(nameValue => {
          this.filterValues.firstName = nameValue
          this.dataSource.filter = JSON.stringify(this.filterValues);
        });
    if( this.lastName!=null)
    this.lastName.valueChanges.subscribe(nameValue => {
        this.filterValues.lastName= nameValue
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    if( this.phone!=null)
    this.phone.valueChanges.subscribe(nameValue => {
        this.filterValues.phone= nameValue
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    if( this.email!=null)
    this.email.valueChanges.subscribe(emailValue => {
        this.filterValues.email = emailValue
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    if( this.status!=null)
    this.status.valueChanges.subscribe(statusValue => {
        this.filterValues.status = statusValue
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
     
  }
  //get state data
  isLoadingStateCase(): boolean { return this.usersState == DataState.LOADING; } 
  isLoadedStateCase(): boolean { return this.usersState == DataState.LOADED; } 
  isErrorStateCase(): boolean { return this.usersState == DataState.ERROR; } 
  
  reset()
  {
    if(this.firstName!=null)
       this.firstName.setValue('');
    if(this.lastName!=null)
       this.lastName.setValue('');
    if(this.phone!=null)
       this.phone.setValue('');
    if(this.status !=null)
        this.status.setValue([]);
  }
}
 