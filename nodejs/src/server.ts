import { app } from './app';
import { env } from './env';
app.listen(env.PORT, () => console.log(`API listening on :${env.PORT}`));
