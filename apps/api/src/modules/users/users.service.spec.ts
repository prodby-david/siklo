import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: {
    findByEmail: jest.Mock;
    findUserById: jest.Mock;
    createUser: jest.Mock;
  };
  let authService: { hashPassword: jest.Mock };

  beforeEach(async () => {
    usersRepository = {
      findByEmail: jest.fn(),
      findUserById: jest.fn(),
      createUser: jest.fn(),
    };

    authService = {
      hashPassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: usersRepository },
        { provide: AuthService, useValue: authService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      contactNumber: '09123456789',
    };

    it('should throw ConflictException if email is already used', async () => {
      usersRepository.findByEmail.mockResolvedValue({ id: 'existing-user' });

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.createUser(createUserDto)).rejects.toThrow(
        'Email is already used.',
      );
    });

    it('should create a user with hashed password', async () => {
      usersRepository.findByEmail.mockResolvedValue(null);
      authService.hashPassword.mockResolvedValue('hashed-password');
      usersRepository.createUser.mockResolvedValue(undefined);

      const result = await service.createUser(createUserDto);

      expect(result).toEqual({ message: 'Account successfully created.' });
      expect(usersRepository.findByEmail).toHaveBeenCalledWith(
        createUserDto.email,
      );
      expect(authService.hashPassword).toHaveBeenCalledWith(
        createUserDto.password,
      );
      expect(usersRepository.createUser).toHaveBeenCalledWith({
        ...createUserDto,
        password: 'hashed-password',
      });
    });
  });

  describe('getCurrentUserName', () => {
    it('should return user when found', async () => {
      const mockUser = { name: 'John Doe' };
      usersRepository.findUserById.mockResolvedValue(mockUser);

      const result = await service.getCurrentUserName('user-123');

      expect(result).toEqual(mockUser);
      expect(usersRepository.findUserById).toHaveBeenCalledWith('user-123');
    });

    it('should throw NotFoundException when user is not found', async () => {
      usersRepository.findUserById.mockResolvedValue(null);

      await expect(service.getCurrentUserName('user-123')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getCurrentUserName('user-123')).rejects.toThrow(
        'User not found.',
      );
    });
  });
});
