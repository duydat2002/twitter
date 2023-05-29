import mitt from "mitt";

const emitter = mitt();

export default function userEmitter() {
  return {
    $on: emitter.on,
    $emit: emitter.emit
  }
}