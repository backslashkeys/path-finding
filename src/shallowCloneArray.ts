export default function shallowCloneArray<T extends defined>(array: T[]): T[] {
	return array.map((item) => item);
}
