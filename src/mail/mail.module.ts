import {Module} form "@nestjs/common";
import {MailService} from "./mail.service"

@Module({
    providers: [MailService],
    exports: [MailService, MailModule]
})
export class MailModule {};