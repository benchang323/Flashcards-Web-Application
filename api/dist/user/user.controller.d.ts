import { UserService } from "./user.service";
import { UserLoginDTO } from "./user-login.dto";
import { CreateUserDTO } from "./create-user.dto";
import { AuthService } from "src/auth/auth.service";
import { UserResponseDTO } from "./user-response.dto";
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    login(userLoginDto: UserLoginDTO): Promise<{
        access_token: string;
    }>;
    createUser(userDto: CreateUserDTO): Promise<UserResponseDTO>;
}
