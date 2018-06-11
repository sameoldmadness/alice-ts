import anyTest, { RegisterContextual } from 'ava';
import * as got from 'got';
import { Server } from 'http';
import micro from 'micro';
import * as listen from 'test-listen';
import app from '../src/index';

const test = anyTest as RegisterContextual<{
    service: Server;
    url: string;
}>;

test.beforeEach(async t => {
    t.context.service = micro(app);
    t.context.url = await listen(t.context.service);
});

test.afterEach.always(t => {
    t.context.service.close();
});

test('my endpoint', async t => {
    const { body } = await got(t.context.url, {
        json: true,
        body: {
            meta: {
                locale: 'ru-RU',
                timezone: 'Europe/Moscow',
                client_id: 'ru.yandex.searchplugin/5.80 (Samsung Galaxy; Android 4.4)'
            },
            request: {
                command: 'пинг',
                original_utterance: 'пинг',
                type: 'SimpleUtterance',
            },
            session: {
                new: true,
                message_id: 1,
                session_id: '2eac4854-fce721f3-b845abba-20d60',
                skill_id: '3ad36498-f5rd-4079-a14b-788652932056',
                user_id: 'AC9WC3DF6FCE052E45A4566A48E6B7193774B84814CE49A922E163B8B29881DC'
            },
            version: '1.0'
        }
    });

    t.deepEqual(body, {
        response: {
            text: 'понг',
            end_session: false,
        },
        session: {
            session_id: '2eac4854-fce721f3-b845abba-20d60',
            message_id: 1,
            user_id: 'AC9WC3DF6FCE052E45A4566A48E6B7193774B84814CE49A922E163B8B29881DC'
        },
        version: '1.0'
    });
})
