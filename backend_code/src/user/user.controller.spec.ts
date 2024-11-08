import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SignUpDto } from './dto/sign-up.dto';
// import { HttpStatus } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

// Mock UserService
const mockUserService = {
  signUp: jest.fn((dto: SignUpDto) => {
    if (dto.email === 'test@example.com') {
      return { message: 'User created successfully' }; // Mock successful sign-up
    }
    throw new Error('User with this email already exists');
  }),
};

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            signup: jest.fn(), // Mock the signup method
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('signUp', () => {
    it('should return success message for valid input', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        organization: 'Test org'
      };

      jest.spyOn(userService, 'signup').mockResolvedValue({ message: 'User created successfully' });

      const result = await userController.signup(signUpDto);
      expect(result).toEqual({ message: 'User created successfully' });
    });

    it('should throw an error for user already exists', async () => {
      const signUpDto: SignUpDto = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        organization: 'Test org'
      };

      jest.spyOn(userService, 'signup').mockImplementation(async () => {
        throw new HttpException(
            { message: 'User with this email already exists' },
            HttpStatus.BAD_REQUEST,
        );
      });

      try {
        await userController.signup(signUpDto);
      } catch (error) {
        // console.log(error);
        expect(error.response.message).toBe('User with this email already exists');
      }
    });
  });
});
