import { Module } from "@nestjs/common";
import { WishlistModule } from "./wishlist/wishlist.module";
import { ReviewModule } from "./review/review.module";

@Module({
    imports: [WishlistModule, ReviewModule],
    controllers: [],
    providers: [],
})
export class UserModule{}