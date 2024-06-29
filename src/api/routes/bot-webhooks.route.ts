import { Hono } from 'hono';
import { deleteWebhookController, setWebhookController, webHookPage } from '../controllers/bot-webooks.controller';

const router = new Hono();

router.get('/', webHookPage);
router.get('/set/:botToken{[0-9]+:[a-zA-Z0-9]+}', setWebhookController);
router.get('/del/:botToken{[0-9]+:[a-zA-Z0-9]+}', deleteWebhookController);

export default router;
