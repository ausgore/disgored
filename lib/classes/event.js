export default class Event {
    constructor(props) {
        var _a;
        for (const prop in props)
            this[prop] = (_a = props[prop]) !== null && _a !== void 0 ? _a : null;
    }
}
//# sourceMappingURL=event.js.map