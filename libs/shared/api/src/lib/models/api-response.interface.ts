export interface ApIMetaInfo {
	version: string;
	type: 'object' | 'list' | 'none';
	count: number;
}

export interface ApiResponse<T> {
	results?: T[] | T;
	info: ApIMetaInfo;
}
