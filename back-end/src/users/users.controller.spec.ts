import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dtos/createUserDto';
import { prismaMock } from '../prisma/prismaService.mock';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from './users.module';
import * as request from 'supertest';

const mockPrismaService = {
  provide: PrismaService,
  useFactory: () => ({
    user: {
      create: jest.fn((data) => prismaMock.create('user', data.data)),
      findMany: jest.fn(() => prismaMock.findMany('user')),
      findUnique: jest.fn((args) =>
        prismaMock.findUnique('user', args.where.id),
      ),
      update: jest.fn((args) =>
        prismaMock.update('user', args.where.id, args.data),
      ),
      delete: jest.fn((args) => prismaMock.delete('user', args.where.id)),
    },
  }),
};

describe('Users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const mockPrismaModule = {
      module: PrismaModule,
      providers: [mockPrismaService],
      global: true,
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, mockPrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return the created user"', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Pedro',
      email: 'pedro@gmail.com',
      cpf: '70245697438',
      favoriteColor: 'BLUE',
    };

    const { body: response, status } = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto);

    expect(status).toBe(201);
    expect(response).toHaveProperty('id');
    expect(response).toEqual(
      expect.objectContaining({
        name: 'Pedro',
        email: 'pedro@gmail.com',
        cpf: '70245697438',
        favoriteColor: 'BLUE',
      }),
    );
  });

  it("should verify user's cpf", async () => {
    const createUserDto: CreateUserDto = {
      name: 'Pedro',
      email: 'pedro@gmail.com',
      cpf: '11111111111',
      favoriteColor: 'BLUE',
    };

    const { body: response, status } = await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto);

    expect(status).toBe(422);
    expect(response).not.toHaveProperty('id');
  });
});
