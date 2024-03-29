import { ConfigService } from '@nestjs/config';
import { UserStatus } from './user.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppError, ERROR_CODE } from 'src/shared/error';
import { Repository, UpdateResult } from 'typeorm';
import { UserDto, UserView, IUpdateUserView } from './user.dto';
import { User } from './user.entity';
import { UserUtil } from './user.util';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    readonly configService: ConfigService  
  ) {

  }

  // GET ALL USERS
  public async findAll(): Promise<User[]> {
    return this.repo.find();
  }


  // CREATE USER
  public async create(dto: UserDto): Promise<User> {
    
    const isExisted = await this.isExistedUser(dto.email);
    if (isExisted) throw new AppError(ERROR_CODE.USER_EXISTED, "Duplicated email");
    
    const saltRounds = this.configService.get<string | number>("BCRYPT.SALT");
    const hashedPassword = await UserUtil.hash(dto.password, saltRounds);
    
    let user = new User(
      dto.email,
      hashedPassword,
      dto.firstName,
      dto.lastName,
      UserStatus.ACTIVE,
      dto.phoneNumber
    );

    return this.repo.save(user);
  }

  // GET A SPECIFIC USER
  public async findOne(id: number): Promise<User> {
    return this.repo.findOne(id);
  }


  // UPDATE A USER BY ID
  public async update(updateUserView: IUpdateUserView): Promise<UpdateResult> {
    const user = await this.repo.findOne(updateUserView.id);
    const dto = updateUserView.userDto;
    if (!user) throw new AppError(ERROR_CODE.USER_NOT_FOUND);

    if (updateUserView.userDto.email) {
      const userByEmail = await this.findUserByEmail(updateUserView.userDto.email);

      // user with the input email existed and ids are different => USER_EXISTED
      if (userByEmail && userByEmail.id !== user.id) {
        throw new AppError(ERROR_CODE.USER_EXISTED);
      }
    }

    const newPassword = dto.password ?
                      await UserUtil.hash(dto.password, this.configService.get<string | number>("BCRYPT.SALT")) :
                      user.password;

    let update = new User(
      dto.email || user.email,
      newPassword,
      dto.firstName || user.firstName,
      dto.lastName || user.lastName,
      UserStatus.ACTIVE,
      dto.phoneNumber || user.phoneNumber || ''
    );
    update.id = user.id;
    
    const result = 
      await this.repo.createQueryBuilder()
                    .update(User)
                    .set(update)
                    .where("id = :id", { id: update.id })
                    .execute();
    return result;
  }


  // CHECK USER EXISTED
  private async isExistedUser(email: string): Promise<boolean> {
    const found = await this.repo.createQueryBuilder("u")
                                .where("u.email = :email", { email })
                                .getOne();
    return found ? true : false;
  }

  // GET USER BY EMAIL
  public async findUserByEmail(email: string): Promise<User | undefined> {
    const found = await this.repo.createQueryBuilder("u")
                                .where("u.email = :email", { email })
                                .getOne();
    return found;
  }
}
