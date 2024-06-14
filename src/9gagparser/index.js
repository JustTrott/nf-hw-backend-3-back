import fetch from "node-fetch";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function parse9GagTrending() {
	try {
		const response = await fetch(
			"https://9gag.com/v1/group-posts/group/default/type/trending"
		);
		const posts = await response.json().then((data) => data.data.posts);
		return posts;
	} catch (error) {
		if (error.response) {
			console.error(`Error status code: ${error.response.status}`);
		} else console.error("Error fetching or parsing:", error);
	}
}

function extractPostData(posts) {
	const extractedData = posts.map((post) => {
		const { id, title, type, images, creationTs } = post;
		const date = new Date(creationTs * 1000); // Convert seconds to milliseconds
		const postData = { id, title, type, date };

		postData.image = images.image460.url;

		if (type === "Animated" && images.image460sv) {
			postData.video = images.image460sv.url;
		}

		return postData;
	});

	return extractedData;
}

module.exports.handler = async function savePosts() {
	try {
		const posts = await parse9GagTrending();
		const extractedPosts = extractPostData(posts);
		const response = await axios.post(
			`${process.env.API_URL}/posts`,
			extractedPosts
		);
		console.log(`statusCode: ${response.statusCode}`);
		console.log(response);
	} catch (error) {
		console.error(error);
	}
};
