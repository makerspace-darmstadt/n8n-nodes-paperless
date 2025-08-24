import type { INodeProperties } from 'n8n-workflow';
import { makePaginationOptions } from './options';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get all groups',
				routing: {
					request: {
						method: 'GET',
						url: '/groups/',
							qs: {
								page_size: '={{$parameter.pageSize || undefined}}',
								page: '={{$parameter.page || undefined}}',
								ordering: '={{$parameter.sortBy || undefined}}',
								name__icontains: '={{$parameter.nameContains || undefined}}',
								name__iendswith: '={{$parameter.nameEndsWith || undefined}}',
								name__iexact: '={{$parameter.nameExact || undefined}}',
								name__istartswith: '={{$parameter.nameStartsWith || undefined}}',
							},
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getGroupById',
				action: 'Get group by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/groups/{{$parameter.id}}/',
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...makePaginationOptions('group'),

	// Filtering parameters for Get All Groups
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		displayOptions: { show: { resource: ['group'], operation: ['get'] } },
		default: undefined,
		description: 'Filter groups where name contains this text (case-insensitive)',
	},
	{
		displayName: 'Name Ends With',
		name: 'nameEndsWith',
		type: 'string',
		displayOptions: { show: { resource: ['group'], operation: ['get'] } },
		default: undefined,
		description: 'Filter groups where name ends with this text (case-insensitive)',
	},
	{
		displayName: 'Name Exact Match',
		name: 'nameExact',
		type: 'string',
		displayOptions: { show: { resource: ['group'], operation: ['get'] } },
		default: undefined,
		description: 'Filter groups where name exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Name Starts With',
		name: 'nameStartsWith',
		type: 'string',
		displayOptions: { show: { resource: ['group'], operation: ['get'] } },
		default: undefined,
		description: 'Filter groups where name starts with this text (case-insensitive)',
	},

	// Parameter for primary ID
	{
		displayName: 'Group ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: { resource: ['group'], operation: ['getGroupById'] },
		},
		default: null,
		description: 'The ID of the group to retrieve (not used for list)',
	},
];
