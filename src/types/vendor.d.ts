declare module 'test-listen' {
    import { Server } from 'http';

    const listen: (srv: Server, hostname?: string) => Promise<string>;

    export = listen;
}
