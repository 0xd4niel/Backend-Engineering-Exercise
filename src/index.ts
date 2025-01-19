import {createApp} from "./app"; // add eslint for gaps

const PORT = process.env.PORT || 3000;
const app = createApp();

// we can add here a lot of middlewares like logging requests, validators
// use trace, prometheus
// add graceful shutdown (in the future of course)
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`); // change to logger (pino + sentry for instance
});
