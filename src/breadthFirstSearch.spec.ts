/// <reference types="@rbxts/testez/globals" />

import breadthFirstSearch from "./breadthFirstSearch";

const GOAL = 1;
const NONE = 0;

type Strip = number[];

function getStripNeighbors(strip: Strip, index: number): number[] {
	const stripSize = strip.size();
	if (index < 0 || index >= stripSize) return [];
	const left = index - 1;
	const right = index + 1;
	const neighbors = [];

	if (left >= 0 && left < stripSize) neighbors.push(left);
	if (right >= 0 && right < stripSize) neighbors.push(right);
	return neighbors;
}

function getStripGoals(strip: Strip): number[] {
	const goals: number[] = [];
	strip.forEach((id, index) => {
		if (id === GOAL) goals.push(index);
	});
	return goals;
}

export = () => {
	it("should find a path to the closest goal", () => {
		const strip = [GOAL, NONE, NONE, NONE, NONE, GOAL];
		expect(
			breadthFirstSearch(2, getStripGoals(strip), (node) => getStripNeighbors(strip, node)).size(),
		).to.be.equal(2);
	});

	it("should return an empty path with no available paths to any goal", () => {
		const strip = [NONE, NONE, NONE, NONE];
		expect(breadthFirstSearch(2, [strip.size()], (node) => getStripNeighbors(strip, node)).size()).to.be.equal(0);
	});
};
