export default class Deps {
  static handlers = new Map();

  static add(type: any, instance: any) {
    return this.handlers.set(type, instance).get(type);
  }

  static get(type: any) {
    return this.handlers.get(type) ?? this.add(type, new type());
  }
}
