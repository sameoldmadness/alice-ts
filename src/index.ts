import { IncomingMessage } from 'http';
import { json } from 'micro';
import { WebhookRequest, WebhookResponse } from './types/webhook';

export default async (req: IncomingMessage): Promise<WebhookResponse> => {
    const { session, version } = await json(req) as WebhookRequest;
    const { message_id, session_id, user_id } = session;

    return {
        response: {
            text: 'понг',
            end_session: false,
        },
        session: {
            message_id,
            session_id,
            user_id,
        },
        version,
    };
};
