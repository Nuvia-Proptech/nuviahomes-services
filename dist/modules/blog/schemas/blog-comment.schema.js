"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCommentSchema = exports.BlogComment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BlogComment = class BlogComment extends mongoose_2.Document {
    postId;
    userId;
    content;
    parentCommentId;
    isApproved;
    likes;
    likedBy;
};
exports.BlogComment = BlogComment;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "BlogPost", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BlogComment.prototype, "postId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "User", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BlogComment.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], BlogComment.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "BlogComment" }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], BlogComment.prototype, "parentCommentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], BlogComment.prototype, "isApproved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], BlogComment.prototype, "likes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String] }),
    __metadata("design:type", Array)
], BlogComment.prototype, "likedBy", void 0);
exports.BlogComment = BlogComment = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BlogComment);
exports.BlogCommentSchema = mongoose_1.SchemaFactory.createForClass(BlogComment);
//# sourceMappingURL=blog-comment.schema.js.map