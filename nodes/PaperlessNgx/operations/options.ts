import type { INodeProperties } from 'n8n-workflow';

export const paginationOptions: INodeProperties[] = [
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['correspondent'],
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
				resource: ['correspondent'],
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
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Field to sort the results by',
	},
];
