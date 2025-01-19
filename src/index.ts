import {createApp} from "./app";

const PORT = process.env.PORT || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
