import type { INodeProperties } from 'n8n-workflow';
import { makePaginationOptions } from './options';
import { tagExpressions } from './utils';

export const tagOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['tag'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'createTag',
				action: 'Create a tag',
				routing: {
					request: {
						method: 'POST',
						url: '/tags/',
						body: tagExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Delete',
				value: 'deleteTag',
				action: 'Delete a tag',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/tags/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get all tags',
				routing: {
					request: {
						method: 'GET',
						url: '/tags/',
						qs: tagExpressions.query,
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getTagById',
				action: 'Get tag by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/tags/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Update',
				value: 'updateTag',
				action: 'Update a tag replace all fields',
				routing: {
					request: {
						method: 'PUT',
						url: '=/tags/{{$parameter.id}}/',
						body: tagExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Partial Update',
				value: 'partialUpdateTag',
				action: 'Partially update a tag update specific fields',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/tags/{{$parameter.id}}/',
						body: tagExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...makePaginationOptions('tag'),

	// Parameters for Create Tag operation
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['createTag', 'updateTag'],
			},
		},
		default: '',
		description: 'The name of the tag',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['partialUpdateTag'],
			},
		},
		default: undefined,
		description: 'The name of the tag (optional for partial update)',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['createTag', 'updateTag', 'partialUpdateTag'],
			},
		},
		default: undefined,
		description: 'The color of the tag (hex color code, e.g., #FF0000)',
	},
	{
		displayName: 'Match',
		name: 'match',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['createTag', 'updateTag', 'partialUpdateTag'],
			},
		},
		default: undefined,
		description:
			'A string that paperless will try to match against the content of documents to automatically assign this tag',
	},
	{
		displayName: 'Matching Algorithm',
		name: 'matchingAlgorithm',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['createTag', 'updateTag', 'partialUpdateTag'],
			},
		},
		options: [
			{
				name: 'None',
				value: 0,
				description: 'Do not match documents to this tag automatically',
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
		description: 'The algorithm used to match documents to this tag',
	},
	{
		displayName: 'Case Insensitive',
		name: 'isInsensitive',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['createTag', 'updateTag', 'partialUpdateTag'],
			},
		},
		default: false,
		description: 'Whether matching should be case insensitive',
	},
	{
		displayName: 'Is Inbox Tag',
		name: 'isInboxTag',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['createTag', 'updateTag', 'partialUpdateTag'],
			},
		},
		default: false,
		description: 'Whether this tag should be automatically assigned to new documents',
	},

	// Ownership and permissions
	{
		displayName: 'Owner User ID',
		name: 'owner',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['createTag', 'updateTag', 'partialUpdateTag'],
			},
		},
		default: undefined,
		description: 'Numeric user ID to set as owner of this tag',
	},
	{
		displayName: 'Set Permissions',
		name: 'setPermissions',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['createTag', 'updateTag', 'partialUpdateTag'],
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
				resource: ['tag'],
				operation: ['createTag', 'updateTag', 'partialUpdateTag'],
			},
		},
		default:
			'Use the Users and Groups endpoints to look up IDs to use for owner and set_permissions. No user/group create/update/delete provided by this node.',
	},

	// Parameter for primary ID
	{
		displayName: 'Tag ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['deleteTag', 'getTagById', 'updateTag', 'partialUpdateTag', 'get'],
			},
		},
		default: null,
		description: 'The ID of the tag to delete, get, or update',
	},

	// Filtering Parameters for Get All Tags operation
	{
		displayName: 'Full Permissions',
		name: 'fullPerms',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['tag'],
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
				resource: ['tag'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter tags by multiple IDs (comma-separated)',
	},
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter tags where name contains this text (case-insensitive)',
	},
	{
		displayName: 'Name Ends With',
		name: 'nameEndsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter tags where name ends with this text (case-insensitive)',
	},
	{
		displayName: 'Name Exact Match',
		name: 'nameExact',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter tags where name exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Name Starts With',
		name: 'nameStartsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['tag'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter tags where name starts with this text (case-insensitive)',
	},
];
