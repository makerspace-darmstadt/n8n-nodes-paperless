import type { INodeProperties } from 'n8n-workflow';
import { makePaginationOptions } from './options';
import { correspondentExpressions } from './utils';

export const correspondentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['correspondent'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'createCorrespondent',
				action: 'Create a correspondent',
				routing: {
					request: {
						method: 'POST',
						url: '/correspondents/',
						body: correspondentExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Delete',
				value: 'deleteCorrespondent',
				action: 'Delete a correspondent',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/correspondents/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get all correspondents',
				routing: {
					request: {
						method: 'GET',
						url: '/correspondents/',
						qs: correspondentExpressions.query,
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getCorrespondentById',
				action: 'Get correspondent by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/correspondents/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Update',
				value: 'updateCorrespondent',
				action: 'Update a correspondent replace all fields',
				routing: {
					request: {
						method: 'PUT',
						url: '=/correspondents/{{$parameter.id}}/',
						body: correspondentExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Partial Update',
				value: 'partialUpdateCorrespondent',
				action: 'Partially update a correspondent update specific fields',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/correspondents/{{$parameter.id}}/',
						body: correspondentExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...makePaginationOptions('correspondent'),

	// Parameters for Create Correspondent operation
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent'],
			},
		},
		default: '',
		description: 'The name of the correspondent',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['partialUpdateCorrespondent'],
			},
		},
		default: undefined,
		description: 'The name of the correspondent (optional for partial update)',
	},
	{
		displayName: 'Match',
		name: 'match',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		default: undefined,
		description:
			'A string that paperless will try to match against the content of documents to automatically assign this correspondent',
	},
	{
		displayName: 'Matching Algorithm',
		name: 'matchingAlgorithm',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		options: [
			{
				name: 'None',
				value: 0,
				description: 'Do not match documents to this correspondent automatically',
			},
			{
				name: 'Any',
				value: 1,
				description: 'Match any occurrence of any word provided in the match string',
			},
			{
				name: 'All',
				value: 2,
				description: 'Match all words provided in the match string',
			},
			{
				name: 'Literal',
				value: 3,
				description: 'Match the literal string provided in the match string',
			},
			{
				name: 'Regular Expression',
				value: 4,
				description: 'Match using regular expression',
			},
			{
				name: 'Fuzzy Match',
				value: 5,
				description: 'Match using fuzzy string matching',
			},
			{
				name: 'Auto',
				value: 6,
				description: 'Let paperless determine the best matching algorithm',
			},
		],
		default: 0,
		description: 'The algorithm used to match documents to this correspondent',
	},
	{
		displayName: 'Case Insensitive',
		name: 'isInsensitive',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		default: false,
		description: 'Whether matching should be case insensitive',
	},

	// Ownership and permissions
	{
		displayName: 'Owner User ID',
		name: 'owner',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		default: undefined,
		description: 'Numeric user ID to set as owner of this correspondent',
	},
	{
		displayName: 'Set Permissions',
		name: 'setPermissions',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		default: '{"view":{"users":[],"groups":[]},"change":{"users":[],"groups":[]}}',
		description:
			'Permissions object: {"view":{"users":[],"groups":[]},"change":{"users":[],"groups":[]}}',
	},
	{
		displayName: 'Note',
		name: 'permissionsNote',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		default:
			'Use the Users and Groups endpoints to look up IDs to use for owner and set_permissions. No user/group create/update/delete provided by this node.',
	},

	// Parameter for primary ID
	{
		displayName: 'Correspondent ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: [
					'deleteCorrespondent',
					'getCorrespondentById',
					'updateCorrespondent',
					'partialUpdateCorrespondent',
					'get',
				],
			},
		},
		default: null,
		description: 'The ID of the correspondent to delete, get, or update',
	},

	// Filtering Parameters for Get All Correspondents operation
	{
		displayName: 'Full Permissions',
		name: 'fullPerms',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: false,
		description: 'Whether to include full permission information',
	},
	{
		displayName: 'Filter by IDs',
		name: 'filterIdIn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents by multiple IDs (comma-separated)',
	},
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents where name contains this text (case-insensitive)',
	},
	{
		displayName: 'Name Ends With',
		name: 'nameEndsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents where name ends with this text (case-insensitive)',
	},
	{
		displayName: 'Name Exact Match',
		name: 'nameExact',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents where name exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Name Starts With',
		name: 'nameStartsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents where name starts with this text (case-insensitive)',
	},
];
