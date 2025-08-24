import type { INodeProperties } from 'n8n-workflow';
import { makePaginationOptions } from './options';
import { storagePathExpressions } from './utils';

export const storagePathOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['storagePath'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'createStoragePath',
				action: 'Create a storage path',
				routing: {
					request: {
						method: 'POST',
						url: '/storage_paths/',
						body: storagePathExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Delete',
				value: 'deleteStoragePath',
				action: 'Delete a storage path',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/storage_paths/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get all storage paths',
				routing: {
					request: {
						method: 'GET',
						url: '/storage_paths/',
						qs: storagePathExpressions.query,
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getStoragePathById',
				action: 'Get storage path by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/storage_paths/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Update',
				value: 'updateStoragePath',
				action: 'Update a storage path replace all fields',
				routing: {
					request: {
						method: 'PUT',
						url: '=/storage_paths/{{$parameter.id}}/',
						body: storagePathExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Partial Update',
				value: 'partialUpdateStoragePath',
				action: 'Partially update a storage path update specific fields',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/storage_paths/{{$parameter.id}}/',
						body: storagePathExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...makePaginationOptions('storagePath'),

	// Parameters for Create Storage Path operation
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['createStoragePath', 'updateStoragePath'],
			},
		},
		default: '',
		description: 'The name of the storage path',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['partialUpdateStoragePath'],
			},
		},
		default: undefined,
		description: 'The name of the storage path (optional for partial update)',
	},
	{
		displayName: 'Path',
		name: 'path',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['createStoragePath', 'updateStoragePath'],
			},
		},
		default: '',
		description: 'The file system path for the storage path',
	},
	{
		displayName: 'Path',
		name: 'path',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['partialUpdateStoragePath'],
			},
		},
		default: undefined,
		description: 'The file system path for the storage path (optional for partial update)',
	},
	{
		displayName: 'Match',
		name: 'match',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['createStoragePath', 'updateStoragePath', 'partialUpdateStoragePath'],
			},
		},
		default: undefined,
		description:
			'A string that paperless will try to match against the content of documents to automatically assign this storage path',
	},
	{
		displayName: 'Matching Algorithm',
		name: 'matchingAlgorithm',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['createStoragePath', 'updateStoragePath', 'partialUpdateStoragePath'],
			},
		},
		options: [
			{
				name: 'None',
				value: 0,
				description: 'Do not match documents to this storage path automatically',
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
		description: 'The algorithm used to match documents to this storage path',
	},
	{
		displayName: 'Case Insensitive',
		name: 'isInsensitive',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['createStoragePath', 'updateStoragePath', 'partialUpdateStoragePath'],
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
				resource: ['storagePath'],
				operation: ['createStoragePath', 'updateStoragePath', 'partialUpdateStoragePath'],
			},
		},
		default: undefined,
		description: 'Numeric user ID to set as owner of this storage path',
	},
	{
		displayName: 'Set Permissions',
		name: 'setPermissions',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['createStoragePath', 'updateStoragePath', 'partialUpdateStoragePath'],
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
				resource: ['storagePath'],
				operation: ['createStoragePath', 'updateStoragePath', 'partialUpdateStoragePath'],
			},
		},
		default:
			'Use the Users and Groups endpoints to look up IDs to use for owner and set_permissions. No user/group create/update/delete provided by this node.',
	},

	// Parameter for primary ID
	{
		displayName: 'Storage Path ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: [
					'deleteStoragePath',
					'getStoragePathById',
					'updateStoragePath',
					'partialUpdateStoragePath',
					'get',
				],
			},
		},
		default: null,
		description: 'The ID of the storage path to delete, get, or update',
	},

	// Filtering Parameters for Get All Storage Paths operation
	{
		displayName: 'Full Permissions',
		name: 'fullPerms',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['storagePath'],
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
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths by multiple IDs (comma-separated)',
	},
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths where name contains this text (case-insensitive)',
	},
	{
		displayName: 'Name Ends With',
		name: 'nameEndsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths where name ends with this text (case-insensitive)',
	},
	{
		displayName: 'Name Exact Match',
		name: 'nameExact',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths where name exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Name Starts With',
		name: 'nameStartsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths where name starts with this text (case-insensitive)',
	},
	{
		displayName: 'Path Contains',
		name: 'pathContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths where path contains this text (case-insensitive)',
	},
	{
		displayName: 'Path Ends With',
		name: 'pathEndsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths where path ends with this text (case-insensitive)',
	},
	{
		displayName: 'Path Exact Match',
		name: 'pathExact',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths where path exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Path Starts With',
		name: 'pathStartsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['storagePath'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter storage paths where path starts with this text (case-insensitive)',
	},
];
