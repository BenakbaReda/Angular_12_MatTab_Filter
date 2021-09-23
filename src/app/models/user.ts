export class User {
    id :  number=0;   
    firstName :string  ="name"
    lastName :string  ='lastname'
    phone:string ='0540506935'
    status:FormationSts= FormationSts.NOT_DEFINE;

    email:string ='mail@mail.com'  
    password :string ='123456789'

    /* accountLogin:IAccountLogin ={ 
      email:'mail@mail.com', 
      password :'123456789'
    }; */
}

export interface IAccountLogin {
  email :string ; 
  password :string  ;
}

export enum FormationSts {
	NOT_DEFINE ='not define',
	SOLDE_OK='Paid All',
	SOLDE_ACOMPTE='Paid with acompte',
	SOLDE_NOK='not Paid',
}
 