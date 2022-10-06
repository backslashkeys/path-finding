import { FlowMap, GetNeighbors } from "./Definitions";
import shallowCloneArray from "./shallowCloneArray";

export function createMazeFlowMap<T extends defined>(origin: T, getNeighbors: GetNeighbors<T>) {
	const frontier: T[] = [origin];
	let frontierIndex = 0;
	const crumbs: FlowMap<T> = new Map();

	while (frontierIndex <= frontier.size() - 1) {
		// index frontier randomly to make a flowmap ressembling a maze
		{
			const swapIndex = math.random(frontierIndex, frontier.size() - 1);
			const n = frontier[swapIndex];
			frontier[swapIndex] = frontier[frontierIndex];
			frontier[frontierIndex] = n;
		}

		const node = frontier[frontierIndex];

		getNeighbors(node).forEach((neighbor) => {
			if (!frontier.includes(neighbor)) {
				frontier.push(neighbor);
				crumbs.set(neighbor, node);
			}
		});
		frontierIndex++;
	}

	return crumbs;
}

/**
 * @returns The path from `start` to `goal` if `start` is `defined` or a `FlowMap` leading to `goal` if `start` is `undefined`.
 */
export default function breadthFirstSearch<T extends defined>(
	start: undefined,
	goals: T[],
	getNeighbors: GetNeighbors<T>,
): FlowMap<T>;
export default function breadthFirstSearch<T extends defined>(start: T, goals: T[], getNeighbors: GetNeighbors<T>): T[];
export default function breadthFirstSearch<T extends defined>(
	start: T | undefined,
	goals: T[],
	getNeighbors: GetNeighbors<T>,
): T[] | FlowMap<T> {
	const frontier: T[] = shallowCloneArray(goals);
	let frontierIndex = 0;
	const crumbs: FlowMap<T> = new Map();
	let reachedStart = false;

	while (frontierIndex <= frontier.size() - 1) {
		// wtf
		const node = frontier[frontierIndex];
		if (node === start) {
			reachedStart = true;
			break;
		}

		getNeighbors(node).forEach((neighbor) => {
			if (!frontier.includes(neighbor)) {
				frontier.push(neighbor);
				crumbs.set(neighbor, node);
			}
		});
		frontierIndex++;
	}

	if (start === undefined) return crumbs;
	const path: T[] = [];
	if (reachedStart) {
		let node = start;
		while (!goals.includes(node)) {
			path.push(node);
			node = crumbs.get(node)!;
		}
	}

	return path;
}
