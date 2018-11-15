import { Request } from "express";
import { CoreAuth } from "./auth.interface";
import { SignOptions, VerifyOptions, DecodeOptions } from "./auth.types";

export class UserData<Decoding extends object, User>{     
    private _decoding: Decoding | null;
    public token: string;
    
    constructor(
        private readonly ctx: Request,
        private readonly authService: CoreAuth<Decoding, User>
    ) {}

        
    load(options?: DecodeOptions) {
        return this.authService.deserialize(this.decode(options));
    }    
    
    decode(options?: DecodeOptions) {
        if(!this._decoding) {
            this._decoding = this.authService.decodeToken(this.token, options);
        }

        return this._decoding;
    }

    verify(options?: VerifyOptions) {
        let result: [ Error | null, Decoding | null];

        try {
            result = [ null, this.authService.verifyToken(this.token, options) ];
        } catch (err) {
            result = [ (err as Error), null];
        }

        return result;
    }
 
    assign(user: User, options?: SignOptions): string {
        return this.authService.createToken(this.authService.serialize(user), options)
    }

    /*
    abstract requestStrategy(name: string, options? :any): void;
    abstract acceptStrategy(name: string, options?: any): Promise<any>;
    */
}
   