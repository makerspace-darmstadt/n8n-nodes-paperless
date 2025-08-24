import type { INodeProperties } from 'n8n-workflow';

export const makePaginationOptions = (resource: string): INodeProperties[] => [
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: [resource],
				operation: ['get'],
			},
		},
		default: 1,
		description: 'Page number to retrieve',
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: [resource],
				operation: ['get'],
			},
		},
		default: 25,
		description: 'Number of items to return per page',
	},
	{
		displayName: 'Sort By',
		name: 'sortBy',
		type: 'string',
		displayOptions: {
			show: {
				resource: [resource],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Field to sort the results by',
	},
];

// Backward-compat export used by existing modules; bound to 'correspondent' only
export const paginationOptions: INodeProperties[] = makePaginationOptions('correspondent');
