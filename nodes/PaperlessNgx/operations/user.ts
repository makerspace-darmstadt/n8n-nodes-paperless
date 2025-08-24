import type { INodeProperties } from 'n8n-workflow';
import { makePaginationOptions } from './options';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get all users',
				routing: {
					request: {
						method: 'GET',
						url: '/users/',
							qs: {
								page_size: '={{$parameter.pageSize || undefined}}',
								page: '={{$parameter.page || undefined}}',
								ordering: '={{$parameter.sortBy || undefined}}',
								username__icontains: '={{$parameter.usernameContains || undefined}}',
								username__iendswith: '={{$parameter.usernameEndsWith || undefined}}',
								username__iexact: '={{$parameter.usernameExact || undefined}}',
								username__istartswith: '={{$parameter.usernameStartsWith || undefined}}',
							},
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getUserById',
				action: 'Get user by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/users/{{$parameter.id}}/',
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...makePaginationOptions('user'),

	// Filtering parameters for Get All Users
	{
		displayName: 'Username Contains',
		name: 'usernameContains',
		type: 'string',
		displayOptions: {
			show: { resource: ['user'], operation: ['get'] },
		},
		default: undefined,
		description: 'Filter users where username contains this text (case-insensitive)',
	},
	{
		displayName: 'Username Ends With',
		name: 'usernameEndsWith',
		type: 'string',
		displayOptions: {
			show: { resource: ['user'], operation: ['get'] },
		},
		default: undefined,
		description: 'Filter users where username ends with this text (case-insensitive)',
	},
	{
		displayName: 'Username Exact Match',
		name: 'usernameExact',
		type: 'string',
		displayOptions: {
			show: { resource: ['user'], operation: ['get'] },
		},
		default: undefined,
		description: 'Filter users where username exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Username Starts With',
		name: 'usernameStartsWith',
		type: 'string',
		displayOptions: {
			show: { resource: ['user'], operation: ['get'] },
		},
		default: undefined,
		description: 'Filter users where username starts with this text (case-insensitive)',
	},

	// Parameter for primary ID
	{
		displayName: 'User ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: { resource: ['user'], operation: ['getUserById'] },
		},
		default: null,
		description: 'The ID of the user to retrieve (not used for list)',
	},
];
