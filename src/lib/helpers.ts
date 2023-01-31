import bcryptjs from "bcryptjs";


export class helpers{
    static async encryptPassword(password: string){
        const salt = await bcryptjs.genSalt(10);
        return bcryptjs.hash(password, salt);
    };
    static async matchPassword(password: string, savedPassword: string){
        try {
            return await bcryptjs.compare(password, savedPassword);
        } catch (error) {
            console.log(error);
        }
    };
}
