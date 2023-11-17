import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email:'mail@12345.com',password:'asdf'})
      .expect(201)
      .then((res)=>{
         const {id,email}=res.body;
         expect(id).toBeDefined();
         expect(email).toEqual('mail@12345.com');
      })
  });

  it('signup as a new user then get the currently logged user',async()=>{
    const email = 'mail@12345.com';

    const res=request(app.getHttpServer())
    .post('/auth/signup')
    .send({email,password:'asdf'})
    .expect(201)

    const cookie = res.get('cookies');
    console.log(cookie);
    const {body}= await request(app.getHttpServer())
    .get('auth/whoami')
    .set('Cookie',cookie)
    .expect(200)

    expect(body.email).toEqual(email);
  })
});
