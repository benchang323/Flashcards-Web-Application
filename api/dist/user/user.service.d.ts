import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./create-user.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userDto: CreateUserDTO): Promise<User>;
    findOne(username: string): Promise<User | undefined>;
}
