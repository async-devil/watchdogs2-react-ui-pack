import fs from "fs/promises";
import path from "path";
import uglify from "uglify-js";

//? Does not work with regular __dirname
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const PATH_TO_LIB = path.join(__dirname, "../lib");

const getRequiredFileNames = async () => {
	try {
		await fs.access(PATH_TO_LIB);
	} catch (err) {
		throw new Error("Directory lib not found");
	}

	const fileNames = await fs.readdir(PATH_TO_LIB);

	return fileNames.filter((name) => /\.js$/gm.test(name));
};

const uglifyByFileNames = async () => {
	const names = await getRequiredFileNames();

	names.forEach(async (name) => {
		const code = await fs.readFile(path.join(PATH_TO_LIB, name));
		const uglifiedCode = uglify.minify(code.toString());

		if (uglifiedCode.error) throw uglifiedCode.error;

		await fs.writeFile(path.join(PATH_TO_LIB, name), uglifiedCode.code);
	});
};

uglifyByFileNames();
