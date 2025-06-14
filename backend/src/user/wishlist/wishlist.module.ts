import { Module } from "@nestjs/common";
import { WishlistModel } from "src/db/wishlist/wishlist.model";
import { WishlistService } from "./wishlist.service";
import { WishlistController } from "./wishlist.controller";
import { WishlistRepo } from "src/db/wishlist/wishlist.repo";

@Module({
    imports:[WishlistModel],
    providers:[WishlistService,WishlistRepo],
    controllers:[WishlistController]
})

export class WishlistModule{}