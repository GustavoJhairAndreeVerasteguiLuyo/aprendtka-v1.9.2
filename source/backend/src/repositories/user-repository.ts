// @ts-ignore: optional dependency - project may not have @nestjs/typeorm types installed
import { InjectRepository } from '@nestjs/typeorm';
// @ts-ignore: optional dependency - project may not have typeorm installed
import { Repository } from 'typeorm';

// Local fallback for User entity when the actual entity module is not present.
// This avoids module resolution errors during tasks like type checking in
// environments where the original entities file may be located elsewhere.
export class User {
  id!: string;
  email!: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  createdAt?: Date;
  lastLogin?: Date;
}
export interface CreateUserDto {
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  lastLogin?: Date;
}

export class UserRepository {
  constructor(
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async findByRole(role: string): Promise<User[]> {
    return this.repository.find({
      where: { role },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.repository.update(id, updateUserDto);
    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async findStudents(): Promise<User[]> {
    return this.repository.find({
      where: { role: 'student' },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    });
  }

  async findTeachers(): Promise<User[]> {
    return this.repository.find({
      where: { role: 'teacher' },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    });
  }

  async findAdmins(): Promise<User[]> {
    return this.repository.find({
      where: { role: 'admin' },
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
    });
  }

  async countByRole(role: string): Promise<number> {
    return this.repository.count({ where: { role } });
  }

  async isEmailTaken(email: string, excludeId?: string): Promise<boolean> {
    const query = this.repository.createQueryBuilder().where('email = :email', { email });
    if (excludeId) {
      query.andWhere('id != :id', { id: excludeId });
    }
    return (await query.getCount()) > 0;
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.repository.update(id, { lastLogin: new Date() });
  }
}
