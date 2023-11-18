import { PORT } from "./config/index.config.js";
import { startServer } from "./express-app.js";

const app = startServer();

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
