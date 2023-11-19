import { PORT } from "./config/config.js";
import { startServer } from "./express-app.js";
const app = await startServer();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
