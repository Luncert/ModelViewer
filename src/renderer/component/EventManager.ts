import { LinkedQueue, LinkedNode } from "./LinkedQueue";

type Callable = (...params: any[]) => void

export class Handler extends LinkedNode {
    private evName: string;
    private callback: Callable;

    constructor(evName: string, callback: Callable) {
        super();
        this.evName = evName;
        this.callback = callback;
    }

    public getEventName(): string { return this.evName; }
    public getCallback(): Callable { return this.callback; }
}

class GlobalEventManager {

    private handlers: {[index: string]: LinkedQueue<Handler>};

    constructor() {
        this.handlers = {};
    }

    public on(evName: string, callback: Callable): Handler {
        let handler = new Handler(evName, callback);
        let chain = this.handlers[evName];
        if (!chain) {
            chain = this.handlers[evName] = new LinkedQueue<Handler>();
        }
        chain.enQueue(handler);
        return handler;
    }

    public off(handler: Handler): boolean {
        const evName = handler.getEventName();
        if (!this.handlers[evName]) {
            return false;
        }
        try {
            this.handlers[evName].delete(handler.getIndex());
            return true
        }
        catch {
            return false;
        }
    }

    public emit(evName: string, ...params: any[]) {
        let chain = this.handlers[evName]
        if (chain) {
            chain.forEach((handler) => handler.getCallback()(...params));
        }
    }

}

export default new GlobalEventManager();