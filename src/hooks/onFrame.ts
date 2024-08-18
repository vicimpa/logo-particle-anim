import { frames, type TFrame } from "$library/frames";
import { onMount } from "svelte";

export function onFrame(frame: TFrame) {
  onMount(() => frames(frame));
}