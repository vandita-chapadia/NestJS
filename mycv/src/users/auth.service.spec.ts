import {Test} from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { BadRequestException ,NotFoundException } from '@nestjs/common';
import { User } from './user.entity';


describe('AuthService',()=>{
    let service:AuthService;
    let fakeUsersService:Partial<UsersService>;
    
    beforeEach(async()=>{
        const users:User[]=[];
           fakeUsersService={
            find:(email:string)=>{
              const filteredUsers= users.filter(user=>user.email===email)
              return Promise.resolve(filteredUsers)
            },
            create:(email:string,password:string)=>{
                const user={id:Math.floor(Math.random()*999999),email,password} as User
                users.push(user);
                return Promise.resolve(user)
            }
        
           }
          
       
            const module = await Test.createTestingModule({
              providers:[AuthService,
            {
             provide:UsersService,
             useValue:fakeUsersService
            }
        ],
           }).compile(); 
        
           service = module.get(AuthService);
    });
    it('can create an instance of auth service',async ()=>{  
       expect(service).toBeDefined();
    });

    it('creates a new user with a salted and hashed password',async()=>{
       const user= await service.signup('vandita.c@simformsolutions.com','Vandita@123');
       expect(user.password).not.toEqual('Vandita@123')
       const [salt,hash]=user.password.split('.');
       expect(salt).toBeDefined();
       expect(hash).toBeDefined();
    })
    it('throws an error if user signs up with email that is in use', async () => {
      await service.signup('asdf@asdf.com', 'asdf');
      await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
        BadRequestException,
      );
    });
   
    it('throws if signin is called with an unused email', async () => {
      await expect(
        service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
      ).rejects.toThrow(NotFoundException);
    });
   
    it('throws if an invalid password is provided', async () => {
      await service.signup('laskdjf@alskdfj.com', 'password');
      await expect(
        service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
      ).rejects.toThrow(BadRequestException);
    });

      it('throws if an invalid password is provided', async () => {
        fakeUsersService.find = () =>
          Promise.resolve([
            { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
          ]);
        await expect(
          service.signin('laskdjf@alskdfj.com', 'passowrd'),
        ).rejects.toThrow(BadRequestException);
      });
       
     it('returns a user if correct password is provided',async()=>{
        // fakeUsersService.find=()=> Promise.resolve([
        //     {email:'asdf@asdf.com',password:'d2c77ab2481cae6d.c544b60273a4e96e5af8106aab09f68c9eafc10b8a582ee5ce6078b675658ff5'} as User
        // ]);

        await service.signup('asdf@asdf.com','mypassword');
        const user = await service.signin('asdf@asdf.com','mypassword')
        expect(user).toBeDefined();
        // const user = await service.signup('asdf@asdf.com','mypassword');
        // console.log(user);
     })
})


