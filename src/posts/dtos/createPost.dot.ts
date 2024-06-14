export interface CreatePostDto {
	id: string;
	title: string;
	type: string;
	date: Date;
	image: string;
	video?: string;
}
